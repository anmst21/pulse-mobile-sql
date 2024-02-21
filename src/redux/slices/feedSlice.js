import { createSlice } from "@reduxjs/toolkit";
import { fetchFeed } from "../thunks/feedThunk";
import { deleteAudio, uploadAudio } from "../thunks/audioThunk";

const initialState = {
  time: "1",
  posts: [],
  comments: [],
  activeCommentId: null,
  isLoading: false,
  error: ""
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    updateTimeStamp: (state, action) => {
      state.time = action.payload;
    },
    setActiveCommentId: (state, action) => {
      state.activeCommentId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAudio.pending, (state) => {

      })
      .addCase(deleteAudio.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post.id !== action.payload
        );
      })
      .addCase(deleteAudio.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(uploadAudio.pending, (state) => {

      })
      .addCase(uploadAudio.fulfilled, (state, action) => {
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(uploadAudio.rejected, (state, action) => {
        state.error = action.error.message;
      })

  },
});

export const {
  updateTimeStamp,
  setActiveCommentId
} = feedSlice.actions;

export const feedReducer = feedSlice.reducer;
