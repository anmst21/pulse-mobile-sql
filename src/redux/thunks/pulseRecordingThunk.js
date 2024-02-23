import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Audio } from "expo-av";
import sqlApi from "../axios/sqlApi"

const loadAudio = createAsyncThunk(
  "player/loadAudio",
  async ({ uri, link, type, track }, { dispatch }) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    const status = await sound.getStatusAsync();
    return { sound, status, link, type, track, uri };
  }
);

const togglePlayback = createAsyncThunk(
  "player/togglePlayback",
  async ({ sound, isPlaying, playbackPosition }, { dispatch }) => {
    console.log(playbackPosition);
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.setPositionAsync(playbackPosition);
      await sound.playAsync();
    }
    return { isPlaying: !isPlaying }; // Toggle the isPlaying state
  }
);

const onSliderValueChange = createAsyncThunk(
  "player/toggleSlider",
  async ({ sound, position }, { dispatch }) => {
    if (sound) {
      await sound.setPositionAsync(position);
    }
    return position;
  }
);
const fetchTags = createAsyncThunk(
  "player/setTagsList",
  async ({ activeIds }, { dispatch }) => {
    try {
      const response = await sqlApi.post("/fetch/post/genres", {
        activeIds
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// const updateTagsList = createAsyncThunk(
//   "player/updateTagsList",
//   async ({ searchQuery, activeIds }, { dispatch }) => {
//     try {
//       const response = await sqlApi.post("/search/post/genres", {
//         activeIds, searchQuery
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );


// const togglePostTags = createAsyncThunk(
//   "player/togglePostTags",
//   async ({ genreId, activeIds }, { rejectWithValue }) => {
//     try {
//       const userId = await AsyncStorage.getItem("userId");

//       const response = await sqlApi.post(
//         `/toggle/tags`, {
//         genreId,
//         activeIds
//       }
//       );
//       console.log("response.dataTOGGLE!", response.data)
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export { loadAudio, togglePlayback, onSliderValueChange, fetchTags };
