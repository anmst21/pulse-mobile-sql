import { createSlice } from "@reduxjs/toolkit";
import { fetchFeed, toggleUpvote } from "../thunks/feedThunk";
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
      .addCase(toggleUpvote.pending, (state) => {

      })
      .addCase(toggleUpvote.fulfilled, (state, action) => {
        const { post_id, vote_type, action: actionType } = action.payload;
        state.posts = state.posts.map((post) => {
          if (post.id === post_id) {
            let updatedPost = { ...post };
            if (vote_type === true) {
              if (actionType === "add") {
                updatedPost.vote_type = true
                updatedPost.upvotes = (updatedPost.upvotes || 0) + 1;
              } else if (actionType === "update") {
                updatedPost.vote_type = true
                updatedPost.upvotes = (updatedPost.upvotes || 0) + 1;
                updatedPost.downvotes = Math.max(0, (updatedPost.downvotes || 0) - 1);
              }
            } else if (vote_type === false) {
              if (actionType === "add") {
                updatedPost.vote_type = false
                updatedPost.downvotes = (updatedPost.downvotes || 0) + 1;
              } else if (actionType === "update") {
                updatedPost.vote_type = false
                updatedPost.downvotes = (updatedPost.downvotes || 0) + 1;
                updatedPost.upvotes = Math.max(0, (updatedPost.upvotes || 0) - 1);
              }
            } else if (vote_type === null) {
              // Handle vote removal
              updatedPost.vote_type = null
              updatedPost.upvotes = actionType === true ? Math.max(0, (updatedPost.upvotes || 0) - 1) : updatedPost.upvotes;
              updatedPost.downvotes = actionType === false ? Math.max(0, (updatedPost.downvotes || 0) - 1) : updatedPost.downvotes;
            }
            return updatedPost;
          }
          return post;
        });
      })
      .addCase(toggleUpvote.rejected, (state, action) => {
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
