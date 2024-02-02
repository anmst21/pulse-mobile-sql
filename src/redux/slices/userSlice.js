import { createSlice } from "@reduxjs/toolkit";
import {
  signup,
  signin,
  signout,
  tryLocalSignIn,
  fetchUserInfo,
} from "../thunks/userThunk";

import { uploadImage, deleteImage } from "../thunks/imageThunk";
import { deleteAudio } from "../thunks/audioThunk";
// {
//   "email": "1",
//     "followersCount": 0,
//       "followingCount": 0,
//         "id": 12,
//           "image_link":
//   "https://my-photo-bucket-111.s3.us-east-2.amazonaws.com/12/f8948ebd-2eab-4f2b-a640-7edfedf6d0f0.png",
//     "postsCount": 0,
//       "subscribersCount": 0,
//         "subscriptionsCount": 0,
//           "username": "1"
// }

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      id: null,
      email: "",
      username: "",
      image_link: null,
      dateCreated: "",
      postsCount: 0,
      followersCount: 0,
      followingCount: 0,
      subscribersCount: 0,
      subscriptionsCount: 0,
      notificationsCount: 0,
    },
    token: null,
    isLoading: false,
    errorMessage: "",
  },
  reducers: {
    clearErrorMessage: (state) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(uploadAudio.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.userInfo.postsCount += 1;
      // })
      // .addCase(followUser.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.userInfo.followersCount += 1;
      // })
      .addCase(deleteAudio.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo.postsCount -= 1;
      })
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.userInfo.image_link = action.payload; // Set the image link
        state.isLoading = false;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(deleteImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.isLoading = false;

        if (state.userInfo.image_link === action.payload) {
          state.userInfo.image_link = null; // Clear the image or set to any default value
        }
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.userInfo = action.payload.userInfo;

      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })

      // Signin cases
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.userInfo = action.payload.userInfo;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })

      // Signout cases
      .addCase(signout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signout.fulfilled, (state) => {
        state.isLoading = false;
        state.token = null;
      })
      .addCase(signout.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })

      // tryLocalSignIn cases
      .addCase(tryLocalSignIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(tryLocalSignIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(tryLocalSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { clearErrorMessage } = userSlice.actions;
export const userReducer = userSlice.reducer;
