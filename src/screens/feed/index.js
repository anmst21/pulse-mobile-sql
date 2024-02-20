import {
  StyleSheet,
  View,
  ScrollView
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import { fetchUserAudios } from "../../redux";

const FeedScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [initialAnimation, setInitialAnimation] = useState(true);
  const activeTab = useSelector((state) => state.tab);
  const isMenuVisible = useSharedValue(true);
  const opacity = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const feedOpacity = useSharedValue(0);
  const storedUserInfo = useSelector((state) => state.user?.userInfo.id);

  const [audios, setAudios] = useState([])
  console.log("audiosaudiosaudios", audios)
  const fetchUserDetails = async () => {


    const { data } = await sqlApi.get(`/audios`)
    setAudios(data)

  };

  useEffect(() => {
    fetchUserDetails()
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

  const renderContent = () => {
    if (activeTab.map) {
      return (<MapContainer />)
    } else {
      return (
        <View style={styles.userPostContainer}>
          <ScrollView>
            <View style={{ paddingTop: 170 }}>
              <UserPosts userId={storedUserInfo} setAudioList={setAudios} audioList={audios} />
            </View>
          </ScrollView>

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
