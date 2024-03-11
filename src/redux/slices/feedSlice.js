import { createSlice } from "@reduxjs/toolkit";
import { fetchFeed, toggleUpvote, toggleBookmark } from "../thunks/feedThunk";
import { deleteAudio, uploadAudio } from "../thunks/audioThunk";
import { followUser, unfollowUser, subscribeUser } from "../thunks/followSubscribeThunk";

const initialState = {
  time: "1",
  activeCommentId: null,
  activeDrawerId: null,
  activeReportId: null,
  activeShareId: null,
  posts: [],
  comments: [],

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
    setActiveShareId: (state, action) => {
      state.activeShareId = action.payload;
    },
    setActiveReportId: (state, action) => {
      state.activeReportId = action.payload;
    },
    setActiveCommentId: (state, action) => {
      state.activeCommentId = action.payload;
    },
    setActiveDrawerId: (state, action) => {
      state.activeDrawerId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(toggleBookmark.fulfilled, (state, action) => {
        const { postId, action: bool } = action.payload;

        // Clone the posts array to ensure immutability
        const posts = [...state.posts];

        // Find the index of the post directly
        const index = posts.findIndex(post => post.id === postId);

        // Only proceed if a post with the matching postId is found
        if (index !== -1) {
          // Directly update the cloned array at the found index
          // This is a shallow clone of the post object with the 'bookmarked' property updated
          posts[index] = { ...posts[index], bookmarked: bool === "added" ? true : false };

          // Update the state with the modified posts array
          state.posts = posts;
        }
      })
      .addCase(followUser.fulfilled, (state, action) => {
        if (action.payload.isPost) {
          const targetUserId = action.payload.targetUserId;

          state.posts = state.posts.map(post => {
            if (post.user_id === targetUserId) {
              return { ...post, follows: "true" };
            }
            return post;
          });
        }
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {

        const targetUserId = action.payload.targetUserId;

        state.posts = state.posts.map(post => {
          if (post.user_id === targetUserId) {
            return { ...post, follows: "false", subscribed: "pending" };
          }
          return post;
        });

      })
      .addCase(subscribeUser.fulfilled, (state, action) => {
        if (action.payload.isPost) {

          const targetUserId = action.payload.targetUserId;

          state.posts = state.posts.map(post => {
            if (post.user_id === targetUserId) {
              return { ...post, subscribed: "pending" };
            }
            return post;
          });
        }
      })
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

        // Find the index of the post
        const index = state.posts.findIndex(post => post.id === post_id);

        // Proceed only if a valid post is found
        if (index !== -1) {
          // Make a shallow copy of the post to be updated
          let updatedPost = { ...state.posts[index] };

          // Apply the updates to the copied post
          if (vote_type === true) {
            if (actionType === "add" || actionType === "update") {
              updatedPost.vote_type = true;
              updatedPost.upvotes = (updatedPost.upvotes || 0) + 1;
              if (actionType === "update") {
                updatedPost.downvotes = Math.max(0, (updatedPost.downvotes || 0) - 1);
              }
            }
          } else if (vote_type === false) {
            if (actionType === "add" || actionType === "update") {
              updatedPost.vote_type = false;
              updatedPost.downvotes = (updatedPost.downvotes || 0) + 1;
              if (actionType === "update") {
                updatedPost.upvotes = Math.max(0, (updatedPost.upvotes || 0) - 1);
              }
            }
          }

          if (actionType === "delete") {
            if (updatedPost.vote_type === true) {
              updatedPost.upvotes = Math.max(0, (updatedPost.upvotes || 0) - 1);
            } else if (updatedPost.vote_type === false) {
              updatedPost.downvotes = Math.max(0, (updatedPost.downvotes || 0) - 1);
            }
            updatedPost.vote_type = null;
          }

          // Replace the old post with the updated one in a new array to maintain immutability
          state.posts = [
            ...state.posts.slice(0, index),
            updatedPost,
            ...state.posts.slice(index + 1)
          ];
        }
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
  setActiveCommentId,
  setActiveDrawerId,
  setActiveReportId,
  setActiveShareId
} = feedSlice.actions;

export const feedReducer = feedSlice.reducer;
