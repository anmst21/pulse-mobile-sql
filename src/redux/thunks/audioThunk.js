import { createAsyncThunk } from "@reduxjs/toolkit";
import sqlApi from "../axios/sqlApi";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
//blob, duration,
const uploadAudio = createAsyncThunk(
  "audio/upload",
  async ({ pulseRecording, callback }, thunkAPI) => {
    const {
      sound,
      bpm,
      duration,
      extension,
      fileName,
      size,
      soundLevels,
      type,
      track,
      uri,
    } = pulseRecording;
    if (sound === null) {
      // The error message can be customized as needed
      return thunkAPI.rejectWithValue("No sound to upload");
    }

    const blob = track.blob;
    const dataType = track.dataType;

    console.log("pulseRecasdasdasdasdasdording,", pulseRecording);

    try {
      const user = await AsyncStorage.getItem("userId");
      if (type === "spotify") {
        const spotifyObject = await sqlApi.post("/audio/save", {
          audioLink: uri,
          duration,
          user,
          bpm,
          track,
          type,
        });
        return spotifyObject.data;
      } else {
        const response = await sqlApi.get(
          `/audio/upload?userId=${user}&dataType=${dataType}&extension=${extension}`
        );
        const { url, key } = response.data;

        await axios.put(url, blob, {
          headers: {
            "Content-Type": dataType,
          },
        });
        const finalUrl =
          "https://my-audio-bucket-111.s3.us-east-2.amazonaws.com/" + key;
        const audioObject = await sqlApi.post("/audio/save", {
          audioLink: finalUrl,
          duration,
          user,
          bpm,
          size,
          soundLevels,
          type,
          fileName,
          extension,
        });

        if (audioObject && audioObject.data && callback) {
          callback(audioObject.data);
        }
        return audioObject.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const fetchUserAudios = createAsyncThunk(
  "audio/fetch",
  async ({ userId }, thunkAPI) => {
    try {
      // const userId = await AsyncStorage.getItem("userId");
      const response = await sqlApi.get(`/user/audios`);
      console.log("fetchUserAudios", response.data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const deleteAudio = createAsyncThunk("audio/delete", async (id, thunkAPI) => {
  try {
    const user = await AsyncStorage.getItem("userId");
    await sqlApi.post("/audio/delete", { id, user });

    return id; // return the key of deleted audio to handle it in the reducer
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const loadPostAudio = createAsyncThunk(
  "player/loadPostAudio",
  async ({ uri }, { dispatch }) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    const status = await sound.getStatusAsync();
    return { sound, status };
  }
);

const togglePostPlayback = createAsyncThunk(
  "player/togglePostPlayback",
  async ({ sound, isPlaying, playbackPosition, callback }, { dispatch }) => {
    if (!sound) {
      callback();
    }
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

const onPostSliderValueChange = createAsyncThunk(
  "player/toggleSlider",
  async ({ sound, position }, { dispatch }) => {
    if (sound) {
      await sound.setPositionAsync(position);
    }
    return position;
  }
);

export {
  uploadAudio,
  fetchUserAudios,
  deleteAudio,
  loadPostAudio,
  togglePostPlayback,
  onPostSliderValueChange,
};
