import { createSlice } from "@reduxjs/toolkit";
import { uploadAudio } from "../thunks/audioThunk";

const initialState = {
  drawerOpen: false,
  drawerType: null,
  drawerData: null,
  draweDraggable: false,
  drawerHeight: null,
  notificationActive: false,
  notificationMessage: null,
  notificationIntent: null,
  notificationDuration: null,
  postLoader: "0%",
  isPostLoading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setPostLoader: (state, action) => {
      state.postLoader = action.payload
    },
    toggleDrawer: (state, action) => {
      state.drawerOpen = action.payload.drawerOpen;
      state.drawerType = action.payload.drawerType;
      state.drawerData = action.payload.drawerData;
      state.drawerDraggable = action.payload.drawerDraggable;
      state.drawerHeight = action.payload.drawerHeight;
    },
    toggleNotification: (state, action) => {
      state.notificationActive = action.payload.notificationActive;
      state.notificationMessage = action.payload.notificationMessage;
      state.notificationIntent = action.payload.notificationIntent;
      state.notificationDuration = action.payload.notificationDuration;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadAudio.pending, (state) => {
        state.isPostLoading = true
      })
      .addCase(uploadAudio.fulfilled, (state, action) => {
        state.isPostLoading = false
      })
      .addCase(uploadAudio.rejected, (state, action) => {
        state.isPostLoading = false
      })
  }
});

export const { toggleDrawer, toggleNotification, setPostLoader } = appSlice.actions;

export const appReducer = appSlice.reducer;
