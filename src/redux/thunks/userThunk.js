import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../axios/userApi";
import sqlApi from "../axios/sqlApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const tryLocalSignIn = createAsyncThunk("user/tryLocalSignIn", async () => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    return token;
  } else {
    throw new Error("No token found.");
  }
});

const signup = createAsyncThunk(
  "user/signup",
  async ({ email, password, userName, navigation }, { rejectWithValue }) => {
    try {
      const response = await sqlApi.post("/user/signup", {
        email: email.toString(),
        password: password.toString(),
        userName: userName.toString(),
      });

      // Set the token in AsyncStorage
      await AsyncStorage.setItem("token", response.data.token);

      // Set the user's ID in AsyncStorage
      await AsyncStorage.setItem("userId", response.data.userId);
      navigation.goBack();
      // Return the token for further processing or usage in reducers
      return response.data;
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong with sign up");
    }
  }
);

const signin = createAsyncThunk(
  "user/signin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await sqlApi.post("/user/signin", { email: email.toString(), password: password.toString() });
      // Set the token in AsyncStorage
      await AsyncStorage.setItem("token", response.data.token);

      // Set the user's ID in AsyncStorage
      await AsyncStorage.setItem("userId", response.data.userId);
      // Return the token for further processing or usage in reducers
      return response.data;
    } catch (err) {
      throw new Error("Something went wrong with sign in");
    }
  }
);

const signout = createAsyncThunk(
  "user/signout",
  async (_, { rejectWithValue }) => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    return null;
  }
);

const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async ({ userId }) => {
    // const userId = await AsyncStorage.getItem("userId");

    const response = await sqlApi.get(`/user/${userId}`);
    return response.data;
  }
);


const updateBio = createAsyncThunk(
  "user/updateBio",
  async ({ bio }, { rejectWithValue }) => {
    try {

      const response = await sqlApi.put('/users/bio', { bio });

      return response.data; // Assuming the updated bio is returned by your API
    } catch (error) {
      console.error("Error updating bio", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
const updateUsername = createAsyncThunk(
  "user/updateUsername",
  async ({ username }, { rejectWithValue }) => {
    try {

      const response = await sqlApi.put('/users/username', { username });

      return response.data; // Assuming the updated bio is returned by your API
    } catch (error) {
      console.error("Error updating bio", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
const updateLink = createAsyncThunk(
  "user/updateLink",
  async ({ link }, { rejectWithValue }) => {
    try {

      const response = await sqlApi.put('/users/link', { link });

      return response.data; // Assuming the updated bio is returned by your API
    } catch (error) {
      console.error("Error updating bio", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);


export {
  signin,
  signout,
  signup,
  tryLocalSignIn,
  fetchUserInfo,
  updateBio,
  updateUsername,
  updateLink
};
