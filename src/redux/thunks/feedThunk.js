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


const toggleUpvote = createAsyncThunk(
  "toggle/upvote",
  async ({ postId, voteType }, { rejectWithValue }) => {
    try {
      const response = await sqlApi.post(`/vote`, { post_id: postId, vote_type: voteType });
      let data = response.data
      data.post_id = postId
      console.log("toggledata", data)
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { fetchFeed, toggleUpvote };


