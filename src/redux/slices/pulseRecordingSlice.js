import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Audio } from "expo-av";
import {
  loadAudio,
  togglePlayback,
  onSliderValueChange,
  fetchTags,
} from "../thunks/pulseRecordingThunk";

const initialState = {
  type: "",
  soundLevels: [],
  track: {},
  link: "",
  fileName: "",
  extension: "",
  isPlaying: false,
  isLooping: false,
  sound: null,
  duration: 0,
  playbackPosition: 0,
  bpm: null,
  size: null,
  uri: null,
  tags: [],
  tagsList: []
};

const pulseRecordingSlice = createSlice({
  name: "pulseRecording",
  initialState,

  reducers: {
    toggleTagsState: (state, action) => {
      const { id, name } = action.payload;
      const tagIndex = state.tagsList.findIndex(tag => tag.id === id);

      // If the tag exists in tagsList, toggle its active state
      if (tagIndex !== -1) {
        state.tagsList[tagIndex].active = !state.tagsList[tagIndex].active;

        // If the tag is active, ensure it's in the tags array
        if (state.tagsList[tagIndex].active) {
          if (!state.tags.includes(id)) {
            state.tags.push(id);
          }
        }
        // If the tag is not active, remove it from the tags array
        else {
          state.tags = state.tags.filter(tagId => tagId !== id);
        }
      }
      // If the tag doesn't exist, add it to the start of tagsList and to the tags array
      else {
        state.tagsList.unshift({ id, name, active: true });
        state.tags.push(id);
      }
    },
    setTag: (state, action) => {
      state.tags = state.tags.push(action.payload);
    },
    setBpm: (state, action) => {
      state.bpm = action.payload;
    },
    setExtencionFilename: (state, action) => {
      state.fileName = action.payload.fileName;
      state.extension = action.payload.extension;
      state.size = action.payload.size;
    },
    setSoundLevels: (state, action) => {
      state.soundLevels = action.payload;
    },
    addSoundLevel: (state, action) => {
      if (action.payload.id) {
        state.soundLevels.push(action.payload);
      }
    },
    setIsLooping: (state, action) => {
      state.isLooping = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setSound: (state, action) => {
      state.sound = action.payload;
    },
    setPlaybackPosition: (state, action) => {
      state.playbackPosition = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    resetPulseRecording: (state) => {
      // Reset each piece of the state individually
      Object.assign(state, initialState);
    },
    addPulseRecording: (state, action) => {
      state.duration = action.payload.duration;
      state.type = action.payload.type;
      state.soundLevels = action.payload.soundLevels;
      state.link = action.payload.link;
      state.fileName = action.payload.fileName;
      state.extension = action.payload.extension;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(togglePostTags.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   console.log("action.payloadaction.payload", action.payload)
      //   if (action.payload.action === 'deleted') {
      //     const index = state.tagsList.findIndex(genre => genre.id === action.payload.record.id);
      //     if (index !== -1) {
      //       state.tagsList[index].active = false;
      //       state.tags = [...state.tags, action.payload.record.id]
      //     }
      //   }
      //   else if (action.payload.action === 'inserted') {
      //     const index = state.tagsList.findIndex(genre => genre.id === action.payload.record.id);
      //     if (index !== -1) {
      //       state.tagsList[index].active = true;
      //       state.tags = state.tags.filter(tag => tag !== action.payload.record.id)
      //     } else {
      //       const newGenre = {
      //         ...action.payload.record,
      //         active: true
      //       };
      //       state.tagsList.unshift(newGenre);
      //     }
      //   }
      // })
      .addCase(loadAudio.pending, (state) => {
        // Handle the loading state if necessary, e.g., setting a flag
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tagsList = action.payload
      })
      .addCase(loadAudio.fulfilled, (state, action) => {
        // Update the state with the loaded sound and its status
        state.sound = action.payload.sound;
        state.duration = action.payload.status.durationMillis;
        state.type = action.payload.type;
        state.track = action.payload.track;
        state.uri = action.payload.uri;

        // Set other state properties based on the fulfilled action
        state.link = action.payload.link; // If the URI is needed
        // ... set other state properties from the action.payload.status as needed
      })
      .addCase(loadAudio.rejected, (state, action) => {
        // Handle the error state, e.g., resetting the state or setting an error message
      })
      .addCase(togglePlayback.fulfilled, (state, action) => {
        state.isPlaying = action.payload.isPlaying;
      })
      .addCase(onSliderValueChange.fulfilled, (state, action) => {
        state.playbackPosition = action.payload;
      });
  },
});

export const {
  setSoundLevels,
  addSoundLevel,
  addPulseRecording,
  resetPulseRecording,
  setIsPlaying,
  setPlaybackPosition,
  setSound,
  setDuration,
  setIsLooping,
  setExtencionFilename,
  setBpm,
  setTag,
  toggleTagsState
} = pulseRecordingSlice.actions;

export const pulseRecordingReducer = pulseRecordingSlice.reducer;
