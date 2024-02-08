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
import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import { deleteAudio } from "../../redux";
import PulsePlayer from "../../components/pulse_player/pulsePostPlayer";
import Icon from "../../components/icon";
import CustomText from "../../components/text";
import { useNavigation } from "@react-navigation/native";
import UpvoteDownvote from "../../components/unvote_downvote";
import sqlApi from "../../redux/axios/sqlApi"
import PostComment from "../../components/post_comment"




const UserPosts = ({ userId, audioList, setAudioList }) => {
  const [sound, setSound] = useState();
  const [playingStatus, setPlayingStatus] = useState({});
  const [playingNow, setPlayingNow] = useState(null);
  const [openComments, setOpenComments] = useState(false);
  const [isActive, setIsActive] = useState(null);

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

  return (
    <View style={{ height: "100%", paddingBottom: 60 }}>

      <ScrollView>
        {audioList
          ? audioList.map((audio) => (

            <View style={styles.outerPost}>
              <TouchableOpacity
                onPress={() => {
                  storedUserInfo.id !== audio.user_id
                    ? navigation.push("UserProfileScreen", {
                      id: audio.user_id,
                      item,
                    })
                    : navigation.dispatch(StackActions.popToTop());
                }}
              >
                <View style={styles.postHeader}>
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

              </View>
              < PostComment
                openComments={openComments}
                isActive={isActive}
                userId={storedUserInfo}
                audio={audio}
              />



            </View>

          ))
          : null}

      </ScrollView>
    </View>
  );
};


export default UserPosts;

const styles = StyleSheet.create({
  postHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  outerPost: {
    gap: 20,
    marginBottom: 70,
    borderTopColor: "rgba(255,255,255,0.1)",
    paddingTop: 20,
    borderWidth: 1,
    flexDirection: "column"
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
