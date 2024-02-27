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



const UserPosts = ({ audio, userId }) => {
  const [sound, setSound] = useState();
  const [playingStatus, setPlayingStatus] = useState({});
  const [playingNow, setPlayingNow] = useState(null);


  console.log("1488", audio)



  const navigation = useNavigation();
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const dispatch = useDispatch();
  const storedUserInfo = useSelector((state) => state.user?.userInfo.id);
  const { activeCommentId } = useSelector((state) => state.feed);
  const [isOpenTags, setIsOpenTags] = useState(false)

  // useEffect(() => {
  //   if (activeCommentId !== audio.id) { setOpenComments(false) }
  // }, [activeCommentId]);

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
  // { "created_at": "2024-02-03T01:37:29.090Z", "email": "3", "follows": "true", "id": 3, "image_link": "https://my-photo-bucket-111.s3.us-east-2.amazonaws.com/3/dfb97ebd-0010-47ee-8ef6-6bc62a5853b9.png", "subscribed": "pending", "username": "3" }
  return (

    <View style={{
      marginBottom: 20, borderRadius: 10, backgroundColor: "rgba(31, 32, 34, 0.4)",

    }}>
      <View style={styles.outerPost} >

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
            {audio?.user_id !== userId && <View style={styles.dotMenu}>
              <FollowUnfollowButton item={audio} post />
            </View>}

            <ProfilePicture userId={userId} imageLink={audio.image_link?.medium} width={40} />
            <View>

              <View style={{
                position: "absolute",
                left: 15,
                top: 35,
                width: 150,

              }}>
                {audio.bpm &&
                  <CustomText style={styles.bpmText}>Bpm: {audio.bpm}</CustomText>
                }
                {audio.location &&
                  <CustomText style={[styles.bpmText, { color: Theme.purple }]}>{audio.location}</CustomText>
                }
              </View>

              <CustomText style={{ marginLeft: 15, fontSize: 20 }}>{audio.username}</CustomText>
            </View>
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

            id={audio.id}
            audio={audio}
            upvotes={audio.upvotes}
            downvotes={audio.downvotes}

          />
          <View style={styles.message} >
            <View style={styles.commentsCount}>
              <CustomText style={{ fontSize: 12, color: "black" }}>{audio.comment_count}</CustomText>
            </View>
            <TouchableOpacity onPress={() => {
              activeCommentId !== audio.id ?
                dispatch(setActiveCommentId(audio.id)) :
                dispatch(setActiveCommentId(null))

            }}>
              <Icon name="messageIcon" />
            </TouchableOpacity>
            {/* // setActiveCommentId */}
          </View>
          <View style={styles.message} >
            <TouchableOpacity onPress={() => {
              dispatch(toggleBookmark({ postId: audio.id }))
            }}>
              <Icon name="bookmarkIcon" style={{ width: 24, stroke: "white", background: audio.bookmarked ? "white" : null }} />
            </TouchableOpacity>
          </View>
          {audio.tags && audio.tags.length !== 0 &&
            <View style={styles.message} >
              <View style={styles.commentsCount}>
                <CustomText style={{ fontSize: 12, color: "black" }}>{audio.tags.length}</CustomText>
              </View>

              <TouchableOpacity onPress={() => {
                setIsOpenTags(!isOpenTags)
              }}>
                <Icon name="tagsIcon" style={{ color: isOpenTags ? "#fff" : "transparent" }} />
              </TouchableOpacity>
            </View>
          }
          <View style={styles.dateContainer}>
            <CustomText style={styles.date}>{humanReadableDate(audio.date_created)}</CustomText>

          </View>

        </View>
        {activeCommentId === audio.id &&
          <PostComment

            userId={storedUserInfo}
            audio={audio}

          />
        }


      </View>
      {isOpenTags && audio.tags && <PostTags tags={audio.tags} />}
    </View>
  );
};


export default UserPosts;

const styles = StyleSheet.create({
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
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#2D2B32",

    borderRadius: 100,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30
  },
  outerPost: {
    gap: 20,
    paddingVertical: 20,
    backgroundColor: "rgba(31, 32, 34, 0.4)",

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
