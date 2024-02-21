import { createAsyncThunk } from "@reduxjs/toolkit";
import sqlApi from "../axios/sqlApi";

const fetchFeed = createAsyncThunk(
  "feed/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await sqlApi.get(`/audios`);
      console.log("feedAudios", response.data)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { fetchFeed };
