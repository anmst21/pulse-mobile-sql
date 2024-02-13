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

import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import { deleteAudio } from "../../redux";
import PulsePlayer from "../../components/pulse_player/pulsePostPlayer";
import Icon from "../../components/icon";
import CustomText from "../../components/text";
import { useNavigation, StackActions } from "@react-navigation/native";
import UpvoteDownvote from "../../components/unvote_downvote";
import sqlApi from "../../redux/axios/sqlApi"
import PostComment from "../../components/post_comment"

import { PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  useAnimatedGestureHandler,
} from "react-native-reanimated";


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



const UserPosts = ({ userId, audioList, setAudioList }) => {
  const [sound, setSound] = useState();
  const [playingStatus, setPlayingStatus] = useState({});
  const [playingNow, setPlayingNow] = useState(null);
  const [openComments, setOpenComments] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);


  useEffect(() => {
    if (!isOpenMenu) { setOpenComments(false) }
  }, [isOpenMenu]);

  const navigation = useNavigation();
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const dispatch = useDispatch();
  const storedUserInfo = useSelector((state) => state.user?.userInfo.id);

  const setPlayer = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });
  };

  useEffect(() => {
    setPlayer();
    return () => {
      // This cleanup function will be called when the component unmounts
      if (sound) {
        sound.unloadAsync(); // Unload the sound
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

  // function getDurationFormatted(millis) {
  //   const minutes = millis / 1000 / 60;
  //   const minutesDisplay = Math.floor(minutes);
  //   const seconds = (minutes - minutesDisplay) * 60;
  //   const secondsDisplay =
  //     seconds < 10 ? `0${Math.round(seconds)}` : Math.round(seconds);
  //   return `${minutesDisplay}:${secondsDisplay}`;
  // }
  const toggleIsActive = (id) => {
    setIsActive(id);
  };
  const toggleComments = () => {
    setOpenComments(!openComments);
  };


  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteAudio(id));
    }
  };

  const resetRoutes = () => {
    if (
      navigation.getState() &&
      navigation.getState().routes.length > 1
    ) {
      navigation.dispatch(StackActions.popToTop());
    }
  }
  const trash = (id) => (
    <TouchableOpacity onPress={() => handleDelete(id)}>
      <View style={styles.trashIcon}>
        <Icon
          name="trashIcon"
          style={{
            color: "#F25219",
          }}
        />
      </View>
    </TouchableOpacity>
  );
  // { "created_at": "2024-02-03T01:37:29.090Z", "email": "3", "follows": "true", "id": 3, "image_link": "https://my-photo-bucket-111.s3.us-east-2.amazonaws.com/3/dfb97ebd-0010-47ee-8ef6-6bc62a5853b9.png", "subscribed": "pending", "username": "3" }
  return (
    <View style={{ height: "100%", paddingBottom: 60 }}>


      {audioList
        ? audioList.map((audio) => (

          <View style={styles.outerPost}>

            <TouchableOpacity
              onPress={() => {
                userId !== audio.user_id
                  ? navigation.push("UserProfileScreen", {
                    id: audio.user_id,
                    item: {
                      created_at: audio.created_at,
                      email: audio.email,
                      follows: audio.follows,
                      id: audio.id,
                      image_link: audio.image_link,
                      subscribed: audio.subscribed,
                      username: audio.username
                    },
                  })
                  : dispatch(
                    switchTab({
                      name: "profile"
                    })
                  );
                // resetRoutes();
              }}
            >
              <View style={styles.postHeader}>

                <View style={styles.dotMenu}>
                  <TouchableOpacity onPress={() => setIsOpenMenu(!isOpenMenu)}>
                    <Icon name="dotMenu" />

                  </TouchableOpacity>
                </View>
                <Image
                  source={{ uri: audio.image_link }}
                  style={{ width: 25, height: 25, borderRadius: 1000, }}
                />
                <CustomText style={{ marginLeft: 15, fontSize: 20 }}>{audio.username}</CustomText>
              </View>
            </TouchableOpacity>
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

              {audio.user_id === storedUserInfo && trash(audio.id)}

            </View>
            <View style={styles.upvoteDownvote}>
              <UpvoteDownvote

                setAudioList={setAudioList}
                upvotes={audio.upvotes}
                downvotes={audio.downvotes}
                id={audio.id}
                dateCreated={audio.date_created}
                setOpenComments={toggleComments}
                toggleIsActive={toggleIsActive}
                userId={storedUserInfo}
                audio={audio}
              />
              <View style={styles.message} >

                <TouchableOpacity onPress={() => { toggleIsActive(audio.id); setOpenComments(prev => !prev) }}>
                  <Icon name="messageIcon" />
                </TouchableOpacity>

              </View>
              <View style={styles.dateContainer}>
                <CustomText style={styles.date}>{humanReadableDate(audio.date_created)}</CustomText>

              </View>

            </View>
            <PostComment
              openComments={openComments}
              isActive={isActive}
              userId={storedUserInfo}
              audio={audio}

            />



          </View>

        ))
        : null}

    </View>
  );
};


export default UserPosts;

const styles = StyleSheet.create({
  message: {
    width: 40,
    height: 40,

    alignItems: "center",
    justifyContent: "center",
    borderColor: "#2D2B32",
    borderWidth: 2,
    borderRadius: 100,
  },
  upvoteDownvote: {
    alignItems: "center",
    flexDirection: "row",
    gap: 15
  },
  date: {
    fontSize: 14,
    color: "rgba(225,255,255, 0.3)"
  },
  dateContainer: {

    position: "absolute",
    right: 10,

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

    alignItems: "center",
    justifyContent: "center",
    borderColor: "#2D2B32",

    borderRadius: 100,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  outerPost: {
    gap: 20,
    paddingVertical: 20,

    paddingHorizontal: 10,
    flexDirection: "column",
    backgroundColor: "rgba(31, 32, 34, 0.4)",
    marginBottom: 30,
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
