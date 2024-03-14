import {
  StyleSheet,
  View,
} from "react-native";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  deleteAudio,
  setActiveCommentId,
  toggleBookmark,

  setActiveShareId
} from "../../redux";
import sqlApi from "../../redux/axios/sqlApi"
import PostComment from "../../components/post_comment"
import { PanGestureHandler } from 'react-native-gesture-handler';
import PostTags from "../../components/post_tags"
import PostSeen from "../../components/post/PostSeen";
import PostHeader from "../../components/post/PostHeader";
import PostImg from "../../components/post/PostImg";
import RectBtn from "../../components/rect_btn";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  useAnimatedGestureHandler,
  withTiming,
  Easing
} from "react-native-reanimated";
import PostFooter from "../../components/post/PostFooter";
import PostPlayer from "../../components/pulse_player/PostPlayer";
import Modal from "../../components/modal";
import Icon from "../../components/icon";






const UserPosts = ({ activeReport, setActiveReportId, activeReportId, audio, userId, scrollViewRef, feedHeight: screenHeight, feedY, activeDrawer, setActiveDrawerId }) => {
  const dispatch = useDispatch();
  const storedUserInfo = useSelector((state) => state.user?.userInfo.id);

  const { activeCommentId, activeShareId } = useSelector(
    state => ({
      activeCommentId: state.feed.activeCommentId,
      activeShareId: state.feed.activeShareId,
    }),
    shallowEqual // This tells Redux to do a shallow equality check on objects/arrays
  );
  const [isOpenTags, setIsOpenTags] = useState(false)
  const [isOpenComments, setIsOpenComments] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(audio.bookmarked)
  const [isSeen, setIsSeen] = useState(audio.isSeen)
  const [isOpenShare, setIsOpenShare] = useState(false)
  const [seen, setSeen] = useState(audio.seen)


  const childRef = useRef();
  const [prevChildRef, setPrevChildRef] = useState(null)
  const timeoutRef = useRef(null);


  const calcWidth = 100
  const translateX = useSharedValue(0);

  const onEditorRightLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    console.log("compHeight", height)
  };



  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;

    },
    onActive: (event, ctx) => {
      runOnJS(setActiveDrawerId)(audio.id)
      let newX = ctx.startX + event.translationX;
      if (newX > 0) {
        newX = 0;
      }
      translateX.value = newX;
    },
    onEnd: () => {
      if (translateX.value < -100) {

        translateX.value = withTiming(-calcWidth, {
          duration: 300,
          easing: Easing.sin,
        });
      } else {
        translateX.value = withTiming(0, {
          duration: 300,
          easing: Easing.sin,
        });
        runOnJS(setActiveDrawerId)(null)
      }
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });


  const handleDrawerEffect = useCallback(() => {
    if (isOpenShare && !activeDrawer) {
      setIsOpenShare(false)
    }
    if (!activeDrawer) {
      translateX.value = withTiming(0, {
        duration: 300,
        easing: Easing.sin,
      });
    }

  }, [activeDrawer, translateX, activeShareId, audio.id, dispatch, setIsOpenShare]); // Include all dependencies used in the callback

  // Then, use this memoized function inside your useEffect
  useEffect(() => {
    handleDrawerEffect();
  }, [handleDrawerEffect]);

  useEffect(() => {
    if (audio.isSeen === true && !isSeen) {
      setIsSeen(true)
      setSeen(seen + 1)
    }
  }, [audio.isSeen])


  // useEffect(() => {
  //   !activeCommentId && setActiveCommentId(null)
  //   activeCommentId !== audio.id && setIsOpenComments(false)
  // }, [activeCommentId])

  // useEffect(() => {
  //   activeCommentId !== audio.id && setIsOpenComments(false)
  // }, [activeCommentId])


  useEffect(() => {
    const checkAndSetSeen = () => {
      if (childRef.current) {
        childRef.current.measure(async (x, y, width, height, pageX, pageY) => {
          const shouldSetSeen = ((screenHeight - height) > pageY + 80) && !isSeen;
          console.log("shouldSetSeen", shouldSetSeen);

          if (shouldSetSeen) {
            timeoutRef.current = setTimeout(async () => {
              try {

                const response = await sqlApi.post('/audios/seen', { audioId: audio.id });
                console.log();
                if (response.data.action === "seen") {
                  setIsSeen(true);
                  setSeen(seen + 1);
                }


              } catch (error) {
                console.log('Error posting seen action:', error);
              }
            }, 3000);
          } else {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
          }
        });
      }
    };

    checkAndSetSeen();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [feedY]);

  console.log("container", feedY)




  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteAudio(id));
    }
  };


  const toggleComments = useCallback(() => {
    setIsOpenComments(prevState => !prevState);
    translateX.value = withTiming(0, {
      duration: 300,
      easing: Easing.sin,
    });
    setActiveDrawerId(null)

  }, [translateX.value, setActiveDrawerId, setIsOpenComments, setPrevChildRef])

  const toggleBookmarkState = () => {
    if (audio.bookmarked) {
      setIsBookmarked(false)
    } else {
      setIsBookmarked(true)
    }
    dispatch(toggleBookmark({ postId: audio.id }))
  }

  const toggleTags = () => {
    translateX.value = withTiming(0, {
      duration: 300,
      easing: Easing.sin,
    }), setActiveDrawerId(null)
    setIsOpenTags(!isOpenTags)
  }

  const toggleDrawer = useCallback(() => {
    if (activeDrawer) {
      translateX.value = withTiming(0, {
        duration: 300,
        easing: Easing.sin,
      });
      setActiveDrawerId(null);
    } else {
      translateX.value = withTiming(-calcWidth, {
        duration: 300,
        easing: Easing.sin,
      });
      setActiveDrawerId(audio.id);
    }
  }, [activeDrawer, translateX.value, setActiveDrawerId]);

  const toggleReport = useCallback(() => {
    if (activeReport) {
      setActiveReportId(null);
      // setActiveDrawerId(null);
      // translateX.value = withTiming(0, {
      //   duration: 300,
      //   easing: Easing.sin,
      // });
    } else {
      setActiveReportId(audio.id);
      // setActiveDrawerId(null);
      // translateX.value = withTiming(-calcWidth, {
      //   duration: 300,
      //   easing: Easing.sin,
      // });
    }
  }, [setActiveReportId, activeReport]); // Dependencies array


  const toggleShare = () => {
    setIsOpenShare(prev => !prev)

  }

  const modalObject = [
    {
      key: 1,
      icon: <Icon name="linkIcon" style={{ color: "#ABABAB", width: 20 }} />,
      condition: true,
      text: "Copy Link",
      callback: () => console.log("Clicked!")
    },
    {
      key: 2,
      icon: <Icon name="warpCastLogo" style={{ color: "#ABABAB", width: 20 }} />,
      condition: true,
      text: "Copy Frame Link",
      callback: () => console.log("Clicked!")
    },
  ]



  // return (
  //   <Modal modalList={modalObject} type="profileImg" />
  // )
  return (
    <View ref={childRef} >
      <PanGestureHandler onGestureEvent={panGestureEvent} activeOffsetX={[-10, 10]}   >
        <Animated.View style={animatedStyles}>
          <View style={[styles.ctaBtn, {
            width: calcWidth, zIndex: 9999
          }]}>
            <RectBtn count={audio.comment_count} state={isOpenComments} name="comments" callback={toggleComments} />
            <RectBtn state={isBookmarked} name="bookmark" callback={toggleBookmarkState} />
            <RectBtn count={audio.tags.length} state={isOpenTags} name="tags" callback={toggleTags} />
            <View style={{
              zIndex: 9999
            }}>
              {isOpenShare &&
                <>

                  <Modal modalList={modalObject} />
                </>
              }
              <RectBtn state={isOpenShare} name="share" callback={toggleShare} />
            </View>
            <RectBtn state={activeReportId === audio.id} name="report" callback={toggleReport} />
            {audio.user_id === storedUserInfo && <RectBtn state={isOpenTags} name="trash" callback={() => handleDelete(audio.id)} />}

          </View>

          <View
            style={styles.mainContainer}
            onLayout={onEditorRightLayout}
          >
            <View style={styles.outerPost} >
              <PostImg isOpenComments={isOpenComments} audio={audio} />

              <PostSeen isSeen={isSeen} />

              <View style={styles.drawerBtn} >
                <RectBtn state={activeDrawer} name="chevronOpen" callback={toggleDrawer} />
              </View>

              {isOpenComments ?
                <PostComment
                  userId={storedUserInfo}
                  audio={audio}
                  close={toggleComments}
                /> :
                <>
                  <PostHeader
                    userId={userId}
                    audio={audio}
                  />
                  <View style={{ gap: 25 }}>
                    <PostPlayer audio={audio} />
                    <PostFooter seen={seen} audio={audio} />
                  </View>
                </>}

            </View>

            {isOpenTags && audio.tags && <PostTags tags={audio.tags} close={toggleTags} />}
            {/* close={closeTags} */}
          </View >
        </Animated.View >
      </PanGestureHandler >
    </View>
  );

};


export default React.memo(UserPosts);

const styles = StyleSheet.create({
  drawerBtn: {
    position: "absolute",
    right: 15,
    top: "50%",
    zIndex: 1
  },

  outerPost: {
    justifyContent: "space-between",
    height: 500,
    backgroundColor: "rgba(31, 32, 34, 0.2)",
    paddingHorizontal: 10,
    flexDirection: "column",
    borderRadius: 10,
    zIndex: 1,
    overflow: "hidden"

  },

  mainContainer: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "rgba(31, 32, 34, 0.5)",
    overflow: "hidden",
    zIndex: 1
  },
  ctaBtn: {
    position: "absolute",
    left: "100%",
    flexDirection: "column",
    paddingHorizontal: 10,
    gap: 20,
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
    paddingBottom: 20,
  },
});


// const scrollToChild = () => {
//   childRef.current.measure((x, y, width, height, pageX, pageY) => {
//     scrollViewRef.current.measure((xX, yY, widthW, heightH, pageXX, pageYY) => {
//       console.log("popopo", prevChildRef, y, height, pageY)
//       console.log("true?", null < 1040)
//       // down popopo 233.33333333333348 3120 520 144.33333333333348
//       if (prevChildRef < y && prevChildRef !== null) {
//         scrollViewRef.current.scrollTo({ y: feedY + y, animated: true });
//         console.log("action under")
//       } else if (prevChildRef > y && prevChildRef !== null) {
//         scrollViewRef.current.scrollTo({ y: y + 10 - height, animated: true });
//         console.log("action onTop")
//       } else {
//         scrollViewRef.current.scrollTo({ y: y + 10, animated: true });
//         console.log("action null")

//       }
//       // if (prevChildRef <= y && prevChildRef) {

//       //   scrollViewRef.current.scrollTo({ y: y + 10 + 500, animated: true });
//       // } else if (prevChildRef >= y && prevChildRef) {

//       //   scrollViewRef.current.scrollTo({ y: y + 10, animated: true });
//       // } else if (!prevChildRef && !isOpenComments) {
//       //   scrollViewRef.current.scrollTo({ y: y + 10, animated: true });
//       // }

//       scrollViewRef.current.scrollTo({ y: pageY + 10 + height, animated: true });

//       setPrevChildRef(pageY)

//     });
//   })
// };