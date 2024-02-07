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
  // const [comments, setComments] = useState([]);
  const [isActive, setIsActive] = useState(null);
  // const [inputValue, setInputValue] = useState('');

  // const postVote = async (user_id, post_id, vote_type) => {
  //   try {
  //     const response = await sqlApi.post(`/vote`, { user_id, post_id, vote_type });
  //     const responseVoteType = response.data.vote_type;
  //     const action = response.data.action

  //     setAudioList((prevAudioList) => {
  //       return prevAudioList.map((audio) => {
  //         // Find the audio record by post_id


  //         if (audio.id === post_id) {
  //           let updatedAudio = { ...audio };

  //           if (responseVoteType === true && action === "add") {
  //             // If vote_type was true, increment upvotes
  //             updatedAudio.upvotes = (updatedAudio.upvotes || 0) + 1;
  //           } else if (responseVoteType === true && action === "update") {
  //             // If vote_type was true, increment upvotes
  //             updatedAudio.upvotes = (updatedAudio.upvotes || 0) + 1;
  //             updatedAudio.downvotes = Math.max(0, (updatedAudio.downvotes || 0) - 1);
  //           } else if (responseVoteType === false && action === "add") {
  //             // If vote_type was false, increment downvotes
  //             updatedAudio.downvotes = (updatedAudio.downvotes || 0) + 1;
  //           } else if (responseVoteType === false && action === "update") {
  //             // If vote_type was false, increment downvotes
  //             updatedAudio.downvotes = (updatedAudio.downvotes || 0) + 1;
  //             updatedAudio.upvotes = Math.max(0, (updatedAudio.upvotes || 0) - 1);
  //           } else if (responseVoteType === null) {
  //             // If vote was removed, decrement the previously voted type
  //             if (vote_type === true) {
  //               // If original vote was an upvote, decrement upvotes
  //               updatedAudio.upvotes = Math.max(0, (updatedAudio.upvotes || 0) - 1);
  //             } else if (vote_type === false) {
  //               // If original vote was a downvote, decrement downvotes
  //               updatedAudio.downvotes = Math.max(0, (updatedAudio.downvotes || 0) - 1);
  //             }
  //           }
  //           return updatedAudio;
  //         }
  //         return audio;
  //       });
  //     });
  //   } catch (error) {
  //     console.error("Error posting vote:", error);
  //     // Handle error appropriately
  //   }
  // };





  // console.log("openComments", comments);
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

  // const onPlaybackStatusUpdate = (status, id) => {
  //   // No need for the isMounted check here as we'll handle the effect cleanup below
  //   if (status.isLoaded) {
  //     if (status.isPlaying) {
  //       setPlaybackPositions((prevPositions) => ({
  //         ...prevPositions,
  //         [id]: status.positionMillis,
  //       }));
  //     }
  //     if (status.didJustFinish) {
  //       setPlaybackPositions((prevPositions) => ({
  //         ...prevPositions,
  //         [id]: 0,
  //       }));
  //       setPlayingStatus((prevState) => ({
  //         ...prevState,
  //         [id]: false,
  //       }));
  //       sound.unloadAsync(); // Unload the sound when finished playing
  //     }
  //   }
  // };

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
    // Update the playback position for the specific audio file
    setPlaybackPosition(position);

    // If the audio file being interacted with is the one that's loaded in the sound object
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
  // const handleSubmit = (contents, user_id, post_id) => {
  //   postComment(contents, user_id, post_id);
  //   setInputValue(''); // Clear the input after submission
  // };

  // const fetchComments = async (post_id, user_id) => {
  //   const response = await sqlApi.get(`/comments/${post_id}/${user_id}`);
  //   console.log("fetchComments", response.data.comments)

  //   setComments(response.data.comments)
  // }


  // const postComment = async (contents, user_id, post_id) => {
  //   const response = await sqlApi.post(`/comments`, { contents, user_id, post_id });
  //   console.log("fetchComments", response.data)

  //   setComments(prev => [response.data, ...prev])
  // }

  // const deleteComment = async (comment_id) => {
  //   try {
  //     // Sending a DELETE request to the server to delete a comment
  //     await sqlApi.delete(`/comments/${comment_id}`);

  //     // Update the comments state to remove the deleted comment
  //     setComments(prevComments => prevComments.filter(comment => comment.id !== comment_id));
  //   } catch (error) {
  //     console.error("Error deleting the comment:", error);
  //     // Handle the error appropriately, e.g., show an error message to the user
  //   }
  // };


  // const likeComment = async (user_id, comment_id) => {
  //   try {
  //     // Sending a POST request to the server to like/unlike a comment
  //     const response = await sqlApi.post(`/comments/like`, { user_id, comment_id });
  //     const { action } = response.data;

  //     // Update the comments state based on the response
  //     setComments(prevComments => prevComments.map(comment => {
  //       if (comment.id === comment_id) {
  //         if (action === 'like') {
  //           return { ...comment, liked: true, likes_count: comment.likes_count + 1 };
  //         } else if (action === 'unlike') {
  //           return { ...comment, liked: false, likes_count: Math.max(comment.likes_count - 1, 0) }; // Avoid negative counts
  //         }
  //       }
  //       return comment;
  //     }));
  //   } catch (error) {
  //     console.error("Error liking/unliking the comment:", error);
  //     // Handle the error appropriately
  //   }
  // };

  // useEffect(() => { fetchComments(isActive, userId) }, [isActive])

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
                  userId={userId}
                />

              </View>
              < PostComment
                openComments={openComments}
                isActive={isActive}
                userId={userId}
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
  // likeText: { fontSize: 16 },
  // like: { position: "absolute", right: 10, top: 3, alignItems: "center", flexDirection: "row", gap: 7 },
  // commentContainer: {
  //   marginBottom: 10,
  //   padding: 10,
  //   borderWidth: 1,
  //   borderColor: '#ddd',
  //   borderRadius: 5,
  // },
  // input: {
  //   height: 40,
  //   margin: 12,
  //   borderWidth: 1,
  //   padding: 10,
  //   width: '80%',
  //   borderColor: 'gray', 
  //   color: "white"
  // },
  // comments: {
  //   height: 400,
  //   // backgroundColor: "blue",
  //   bottom: -40
  // },

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
  // commentsTrashIcon: {
  //   zIndex: 9999,
  //   right: 70,
  //   top: 13,
  //   borderRadius: 10,

  //   alignItems: "center",
  //   justifyContent: "center",
  //   position: "absolute"
  // },
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
