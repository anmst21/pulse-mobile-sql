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
    console.log(email, password, userName);
    try {
      const response = await sqlApi.post("/user/signup", {
        email: email.toString(),
        password: password.toString(),
        userName: userName.toString(),
      });
      console.log("signup response", response.data);

      // Set the token in AsyncStorage
      await AsyncStorage.setItem("token", response.data.token);

      // Set the user's ID in AsyncStorage
      await AsyncStorage.setItem("userId", response.data.userId);
      navigation.goBack();
      console.log("response.data.token", response.data.token);
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
      console.log("email, password", email, password)
      // Set the token in AsyncStorage
      await AsyncStorage.setItem("token", response.data.token);

      // Set the user's ID in AsyncStorage
      await AsyncStorage.setItem("userId", response.data.userId);
      console.log("response.data", response.data)
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

    const response = await userApi.get(`/user/${userId}`);
    console.log("fetchUserInfo", response.data)
    return response.data;
  }
);
export { signin, signout, signup, tryLocalSignIn, fetchUserInfo };
