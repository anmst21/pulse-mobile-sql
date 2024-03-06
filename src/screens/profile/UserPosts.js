import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import { switchTab, togglePlayer } from "../../redux/slices/tabSlice";
import React, { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import { deleteAudio, setActiveCommentId, toggleBookmark } from "../../redux";
import PulsePlayer from "../../components/pulse_player/pulsePostPlayer";
import Icon from "../../components/icon";
import CustomText from "../../components/text";
import { useNavigation, StackActions } from "@react-navigation/native";
import UpvoteDownvote from "../../components/unvote_downvote";
import sqlApi from "../../redux/axios/sqlApi"
import PostComment from "../../components/post_comment"
import ProfilePicture from "../../components/profile_picture";
import { PanGestureHandler } from 'react-native-gesture-handler';
import FollowUnfollowButton from "../../components/follow_unfollow_button";
import PostTags from "../../components/post_tags"
import Theme from "../../styles/theme"
import { BlurView } from "expo-blur";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { center } from "@shopify/react-native-skia";


const humanReadableDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);


  yesterday.setDate(today.getDate() - 1);


  if (date.toDateString() === today.toDateString()) {
    return "today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "yesterday";
  } else {
    // Here, you can format the date as desired for dates other than today and yesterday
    // For simplicity, this example returns the date in the format 'DD/MM/YYYY'
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
};



const UserPosts = ({ audio, userId, isLoading, scrollViewRef, feedHeight: screenHeight, feedY, activeDrawer, setActiveDrawerId }) => {
  const dispatch = useDispatch();

  const [sound, setSound] = useState();
  const [playingStatus, setPlayingStatus] = useState({});
  const [playingNow, setPlayingNow] = useState(null);
  const navigation = useNavigation();
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const storedUserInfo = useSelector((state) => state.user?.userInfo.id);

  const { activeCommentId } = useSelector((state) => state.feed);
  const [isOpenTags, setIsOpenTags] = useState(false)
  const [isOpenComments, setIsOpenComments] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(audio.bookmarked)
  const [isSeen, setIsSeen] = useState(audio.isSeen)
  const [seen, setSeen] = useState(audio.seen)


  const childRef = useRef();
  const [prevChildRef, setPrevChildRef] = useState(null)
  const timeoutRef = useRef(null);
  console.log("auauauau", activeDrawer)


  const calcWidth = 100
  const translateX = useSharedValue(0);


  useEffect(() => {
    if (!activeDrawer) { translateX.value = withSpring(0); }

  }, [activeDrawer])

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;

      // activeItemId.value = item.id
      // console.log(activeItemId.value)
    },
    onActive: (event, ctx) => {
      runOnJS(setActiveDrawerId)(audio.id)
      let newX = ctx.startX + event.translationX;
      if (newX > 0) {
        newX = 0; // Prevent moving to the right from the initial position
      }
      translateX.value = newX;
    },
    onEnd: () => {

      // You can modify this logic as needed
      if (translateX.value < -100) { // Threshold for snapping
        translateX.value = withSpring(-calcWidth); // Snap to -255
      } else {
        translateX.value = withSpring(0); // Return to original position
        runOnJS(setActiveDrawerId)(null)
      }
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      //width: item.type === "subscription_request" ? 255 : 150
    };
  });






















  useEffect(() => {
    if (audio.isSeen === true && !isSeen) {
      setIsSeen(true)
      setSeen(seen + 1)
    }
  }, [audio.isSeen])


  useEffect(() => {
    !activeCommentId && setActiveCommentId(null)

  }, [activeCommentId])

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

    // Call the function to check condition and possibly set timeout
    checkAndSetSeen();

    // Cleanup function to clear timeout on unmount or when feedY changes
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [feedY]);


  const onEditorRightLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    console.log("compHeight", height)
    //240
  };

  const scrollToChild = () => {
    childRef.current.measure((x, y, width, height, pageX, pageY) => {

      if (prevChildRef <= y && prevChildRef) {

        scrollViewRef.current.scrollTo({ y: y + 10 - 280, animated: true });
      } else if (prevChildRef >= y && prevChildRef) {

        scrollViewRef.current.scrollTo({ y: y + 10, animated: true });
      } else if (!prevChildRef && !isOpenComments) {
        scrollViewRef.current.scrollTo({ y: y + 10, animated: true });
      }


      setPrevChildRef(y)

    });
  };





  useEffect(() => {
    activeCommentId !== audio.id && setIsOpenComments(false)
  }, [activeCommentId])


  const setPlayer = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });
  };

  useEffect(() => {
    setPlayer();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    const onPlaybackStatusUpdate = async (status) => {
      if (status.didJustFinish) {
        setPlaybackPosition(0);
        await sound.setPositionAsync(0);
        // setPlayingStatus(false);
      } else {
        setPlaybackPosition(status.positionMillis);
      }
    };

    if (sound) {
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }
  }, [sound]);


  async function toggleSound(id, url) {
    const isCurrentlyPlaying = playingStatus[id] || false;
    if (isCurrentlyPlaying) {
      await stopSound();
    } else {
      if (sound) {
        await stopSound();
      }
      await playSound(id, url);
    }
    setPlayingStatus((prevState) => ({
      ...prevState,
      [id]: !isCurrentlyPlaying,
    }));
  }

  const onPostSliderValueChange = async (id, position) => {
    setPlaybackPosition(position);
    if (sound) {
      await sound.setPositionAsync(position);
    }
  };

  async function playSound(id, url) {
    setPlaybackPosition(0);
    if (sound) {
      await sound.unloadAsync(); // Make sure to unload any previously loaded sound
    }
    const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
    setSound(newSound);
    setPlayingStatus((prevState) => ({
      ...prevState,
      [id]: true,
    }));

    await newSound.playAsync();
  }

  async function stopSound() {
    await sound.stopAsync();
    setSound(null);
    setPlayingStatus((prevState) => {
      const newState = { ...prevState };
      Object.keys(newState).forEach((key) => (newState[key] = false));
      return newState;
    });
  }




  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteAudio(id));
    }
  };


  const trash = (id) => (
    <TouchableOpacity onPress={() => handleDelete(id)}>
      <View style={styles.trashIcon}>
        <Icon
          name="trashIcon"
          style={{
            color: "#F25219",
            width: 24
          }}
        />
      </View>
    </TouchableOpacity>
  );

















  return (
    <PanGestureHandler onGestureEvent={panGestureEvent} activeOffsetX={[-10, 10]}   >
      <Animated.View style={[animatedStyles, {}]}>
        <View style={[styles.ctaBtn, { width: calcWidth, }]}>

          <View style={styles.message} >
            <View style={styles.commentsCount}>
              <CustomText style={{ fontSize: 12, color: "black" }}>{audio.comment_count}</CustomText>
            </View>
            <TouchableOpacity onPress={() => {
              activeCommentId === audio.id && setPrevChildRef(null),
                activeCommentId !== audio.id ?
                  (setIsOpenComments(true), dispatch(setActiveCommentId(audio.id)), translateX.value = withSpring(0), setActiveDrawerId(null)) :
                  (setIsOpenComments(false), dispatch(setActiveCommentId(null)), translateX.value = withSpring(0), setActiveDrawerId(null))

            }}>
              <Icon name="messageIcon" style={{ fill: isOpenComments }} />
            </TouchableOpacity>
            {/* // setActiveCommentId */}
          </View>

          <View style={styles.message} >
            <TouchableOpacity onPress={() => {
              if (audio.bookmarked) {
                setIsBookmarked(false)
              } else {
                setIsBookmarked(true)
              }
              dispatch(toggleBookmark({ postId: audio.id }))
            }}>
              <Icon name="bookmarkIcon" style={{ width: 24, stroke: "white", background: isBookmarked ? "white" : null }} />
            </TouchableOpacity>
          </View>


          {audio.tags && audio.tags.length !== 0 &&
            <View style={styles.message} >
              <View style={styles.commentsCount}>
                <CustomText style={{ fontSize: 12, color: "black" }}>{audio.tags.length}</CustomText>
              </View>

              <TouchableOpacity onPress={() => {
                translateX.value = withSpring(0), setActiveDrawerId(null)
                setIsOpenTags(!isOpenTags)

              }}>
                <Icon name="tagsIcon" style={{ color: isOpenTags ? "#fff" : "transparent" }} />
              </TouchableOpacity>
            </View>
          }

          {audio.user_id === storedUserInfo && trash(audio.id)}
        </View>

        <View ref={childRef}
          style={{
            marginBottom: 20,
            borderRadius: 10,
            backgroundColor: "rgba(31, 32, 34, 0.5)",
            overflow: "hidden"
          }}
          onLayout={onEditorRightLayout}
        >
          {audio.img && <>

            <Image
              source={{ uri: audio.img?.small }}
              style={styles.imageBg}
            />
            <BlurView style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }} intensity={isOpenComments ? 20 : 0} tint="systemThickMaterialLight" />
          </>

          }
          <View style={styles.outerPost} >
            {/* //seen */}
            <View style={{
              width: 5,
              height: 5,
              backgroundColor: !isSeen ? Theme.green : "transparent",
              borderRadius: 10,
              position: "absolute",
              right: 15,
              top: 15
            }} />


            <TouchableOpacity style={{
              position: "absolute",
              right: 15,
              top: "50%", zIndex: 9999
            }} onPress={() => {
              console.log("activeDrawer", activeDrawer)
              if (activeDrawer) {
                translateX.value = withSpring(0), setActiveDrawerId(null)
              } else {

                setActiveDrawerId(audio.id)
                translateX.value = withSpring(-calcWidth)
              }


            }}>
              <View style={[styles.chevron, {
                transform: [{ rotate: activeDrawer ? '-90deg' : "90deg" }]
              }]}><Icon name="chevronDown" style={{ width: 25 }} />
              </View>
            </TouchableOpacity>
            {isOpenComments ?
              <PostComment

                userId={storedUserInfo}
                audio={audio}

              /> :

              <>
                <View style={styles.postHeader}>
                  {audio?.user_id !== userId && <View style={styles.dotMenu}>
                    <FollowUnfollowButton item={audio} post />
                  </View>}

                  <ProfilePicture userId={userId} imageLink={audio.image_link?.medium} width={30} />
                  <View style={{
                    position: "absolute",
                    left: 0,
                    top: 45,
                    width: 150,

                  }}>
                    <View style={{
                      overflow: "hidden",
                      borderRadius: 10
                    }}>
                      <BlurView intensity={40} style={{
                        padding: 10,
                        paddingBottom: 0
                      }} >
                        {audio.bpm &&
                          <CustomText style={styles.bpmText}>Bpm: {audio.bpm}</CustomText>
                        }
                        {audio.location &&
                          <CustomText style={[styles.bpmText, { color: Theme.purple }]}>{audio.location}</CustomText>
                        }
                      </BlurView>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        userId !== audio.user_id
                          ? navigation.push("UserProfileScreen", {
                            id: audio.user_id,

                          })
                          : dispatch(
                            switchTab({
                              name: "profile"
                            })
                          );
                        // resetRoutes();
                      }}
                    >
                      <CustomText style={{ marginLeft: 10, fontSize: 18 }}>{audio.username}</CustomText>
                    </TouchableOpacity>



                  </View>
                </View>
                <View style={{ gap: 25 }}>
                  <View key={audio.id} style={styles.postComponent}>

                    <PulsePlayer
                      data={audio}
                      toggleSound={toggleSound}
                      playbackPosition={playbackPosition}
                      onPostSliderValueChange={onPostSliderValueChange}
                      sound={sound}
                      // isPlaying={isPlaying}
                      isPlaying={playingStatus[audio.id]}
                      playingNow={playingNow}
                      id={audio.id}
                    />


                  </View>

                  <View style={styles.upvoteDownvote}>
                    <UpvoteDownvote

                      id={audio.id}
                      audio={audio}
                      upvotes={audio.upvotes}
                      downvotes={audio.downvotes}

                    />



                    <View style={[styles.message, { backgroundColor: "transparent" }]} >
                      <View style={[styles.commentsCount, {
                        backgroundColor: "transparent", top: -1,
                        right: -2,
                      }]}>
                        <CustomText style={{ fontSize: 10, color: "rgba(225,255,255, 0.3)" }}>{seen}</CustomText>
                      </View>


                      <Icon name="seenIcon" style={{ width: 24, color: "rgba(225,255,255, 0.3)" }} />

                    </View>

                    <View style={styles.dateContainer}>
                      <CustomText style={styles.date}>{humanReadableDate(audio.date_created)}</CustomText>

                    </View>

                  </View>
                </View>
              </>}



          </View>
          {isOpenTags && audio.tags && <PostTags tags={audio.tags} />}
        </View >
      </Animated.View >
    </PanGestureHandler >
  );
};


export default UserPosts;

const styles = StyleSheet.create({
  imageBg: {

    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'

  },
  ctaBtn: {
    position: "absolute",
    left: "100%",
    flexDirection: "column",
    paddingHorizontal: 10,
    gap: 30,
    // width: 255,
    //   backgroundColor: "red",
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
    paddingBottom: 20,

  },
  bpmText: {
    fontSize: 12,
    fontFamily: "london",
    color: Theme.green,
    marginBottom: 10


  },
  commentsCount: {
    backgroundColor: "white",
    position: "absolute",
    paddingLeft: 0,
    top: -5,
    right: -4,
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,

  },
  message: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(31, 32, 34, 0.8)",

    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  upvoteDownvote: {
    marginBottom: 30,
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
    justifyContent: "space-between",
    paddingRight: 5
  },
  date: {
    fontSize: 12,
    color: "rgba(225,255,255, 0.3)"
  },
  dateContainer: {

    position: "absolute",
    right: 10,
    top: 35,

    alignItems: "center",
    justifyContent: "center",
    borderColor: "#2D2B32",

    borderRadius: 100,
  },
  dotMenu: {
    right: 10,
    width: 40,
    height: 40,
    position: "absolute",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#2D2B32",

    borderRadius: 100,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 30
  },
  outerPost: {
    justifyContent: "space-between",
    height: 500,
    // gap: 20,
    // paddingTop: 30,
    //  paddingBottom: 10,
    backgroundColor: "rgba(31, 32, 34, 0.2)",

    paddingHorizontal: 10,
    flexDirection: "column",

    borderRadius: 10
  },

  trashIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postComponent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
