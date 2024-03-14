import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import ReportInput from "../../components/report_input";
import RectBtn from "../../components/rect_btn";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedScrollHandler,
  withDelay,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";
import List from "../../components/list"
import sqlApi from "../../redux/axios/sqlApi"

import Tab from "../../components/tab";
import Map from "../map";
import CustomText from "../../components/text";
import MapContainer from "../map";
import UserPosts from "../profile/UserPosts";
import { fetchFeed, } from "../../redux";
import RenderSkeleton from "../../components/render_skeleton";
import { BlurView } from "expo-blur";

const FeedScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [initialAnimation, setInitialAnimation] = useState(true);
  const activeTab = useSelector((state) => state.tab);
  const isMenuVisible = useSharedValue(true);
  const opacity = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const feedOpacity = useSharedValue(0);
  const storedUserInfo = useSelector((state) => state.user?.userInfo.id);
  const { posts, isLoading, } = useSelector((state) => state?.feed);

  const [activeReportId, setActiveReportId] = useState(null)


  const [feedHeight, setFeedHeight] = useState(null)
  const [feedY, setFeedY] = useState(0);


  const [topInputValue, setTopInputValue] = useState("")
  const [botInputValue, setBotInputValue] = useState("")


  console.log("imgpost", posts[0])

  const [activeDrawerId, setActiveDrawerId] = useState(null)



  console.log("setFeedY", feedY)

  useEffect(() => {
    // fetchAudioList()
    dispatch(fetchFeed())
    showInitialAnimation();
    setInitialAnimation(false);
  }, []);

  useEffect(() => {
    if (activeTab.player) {
      opacity.value = 0;
      feedOpacity.value = 0;
      setInitialAnimation(true);
    } else {
      showInitialAnimation();
    }
  }, [activeTab]);

  const showInitialAnimation = () => {
    opacity.value = withDelay(
      100,
      withTiming(1, {
        duration: 1000,
        easing: Easing.bezier(0.18, 0.26, 0.04, 1.06),
      })
    );

    feedOpacity.value = withDelay(
      100,
      withTiming(1, {
        duration: 1000,
        easing: Easing.bezier(0.18, 0.26, 0.04, 1.06),
      })
    );
  };

  const getAnimatedTabStyle = () => {
    return useAnimatedStyle(() => {
      return {
        opacity: opacity.value - scrollY.value / 100,
      };
    });
  };

  const getAnimatedFeedStyle = () => {
    return useAnimatedStyle(() => {
      return {
        opacity: feedOpacity.value,
        position: "relative"
      };
    });
  };

  const tabs = [
    {
      title: "For you",
    },
    {
      title: "Featured",
    },
    {
      title: "Abyss",
    },
  ];

  const renderTab = () => {
    if (isMenuVisible.value) {
      return (
        <Animated.View style={[styles.tabContainer, getAnimatedTabStyle()]}>
          <Tab tabs={tabs} onTabChange={(position) => console.log(position)} />
        </Animated.View>
      );
    }
  };



  const scrollViewRef = useRef(null);

  const onEditorRightLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setFeedHeight(height)
  };


  const onSubmitReport = async () => {
    try {
      setActiveReportId(null)

      const object = posts.find(item => item.id === activeReportId);

      const response = sqlApi.post("/report/post", {
        audioId: object.id,
        ownerUserId: object.user_id,
        reportReason: topInputValue,
        reportDetails: botInputValue
      })
      setBotInputValue("")
      setTopInputValue("")
      console.log("Success!", response.data)
    } catch (err) {
      console.log("Error uploading post report", err)
    }
  }


  const renderContent = () => {
    if (activeTab.map) {
      return (<MapContainer />)
    } else {
      return (
        <View style={styles.userPostContainer} onLayout={onEditorRightLayout}>

          <ScrollView
            scrollEventThrottle={16}
            ref={scrollViewRef}
            onScroll={event => {
              const y = event.nativeEvent.contentOffset.y;
              setFeedY(y);
            }}>
            <View style={{ paddingTop: 170 }}>
              <View style={{ height: "100%", paddingBottom: 60 }}>

                {isLoading &&
                  <RenderSkeleton name="postList" count={10} />
                }

                {posts
                  && posts.map((audio) => (
                    <UserPosts
                      activeDrawer={activeDrawerId === audio.id}
                      setActiveDrawerId={setActiveDrawerId}
                      setActiveReportId={setActiveReportId}
                      activeReport={activeReportId === audio.id}
                      key={audio.id}
                      feedY={feedY}
                      activeReportId={activeReportId}
                      audio={audio}
                      isLoading={isLoading}
                      userId={storedUserInfo}
                      audioList={posts}
                      scrollViewRef={scrollViewRef}
                      feedHeight={feedHeight}
                    />
                  ))}
              </View>
            </View>
          </ScrollView>
          {activeReportId && <View style={styles.blurBackground}>
            <BlurView intensity={80} style={StyleSheet.absoluteFill} />


            <View style={styles.blurModal}>

              <View style={styles.modalHeader}>
                <CustomText style={{ fontSize: 25 }}>Report a post</CustomText>
                {/* <RectBtn /> */}
                <RectBtn name="minus" callback={() => setActiveReportId(null)
                } />
              </View>
              <ReportInput
                topInputValue={topInputValue}
                setTopInputValue={setTopInputValue}
                botInputValue={botInputValue}
                setBotInputValue={setBotInputValue}
                onSubmit={onSubmitReport}
              />
            </View>


          </View>}

        </View>
      )
    }
  }
  // <List
  //   url="/feed/fetchFeed"
  //   limit={2}
  //   listItem="post"
  //   paddingTop={185}
  //   paddingBottom={270}
  //   onScrollEvent={(value) => {
  //     if (!activeTab.player) {
  //       scrollY.value = value;
  //       if (opacity.value <= 0) {
  //         isMenuVisible.value = false;
  //       } else {
  //         isMenuVisible.value = true;
  //       }
  //     }
  //   }}
  // />



  return (
    <View style={{ backgroundColor: "black", position: "relative" }}>
      {renderTab()}

      <Animated.View style={[getAnimatedFeedStyle()]}>
        {renderContent()}
      </Animated.View>



    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  blurModal: {
    borderRadius: 10,
    width: "100%",
    backgroundColor: "rgba(31, 32, 34, 0.7)",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 20,
    marginTop: 20,
    marginRight: 10,
  },
  blurBackground: {
    justifyContent: 'center', // Centers children vertically in the container
    alignItems: 'center',
    // backgroundColor: "yellow",
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    paddingHorizontal: 20
  },
  userPostContainer: {

    paddingHorizontal: 10
  },
  tabContainer: {
    position: "absolute",
    top: 120,
    flex: 1,
    left: -8,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  }
});
