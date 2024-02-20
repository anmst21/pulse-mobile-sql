import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../axios/userApi";
import sqlApi from "../axios/sqlApi";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";



const uploadImage = createAsyncThunk(
  "image/upload",
  async ({ blob, callback }, thunkAPI) => {
    try {
      const user = await AsyncStorage.getItem("userId");
      // Get the preassigned S3 URL for image
      const imageSmall = await sqlApi.post(`/user/createImage`, { userId: user, size: "small" });
      const dataSmall = imageSmall.data
      const imageMedium = await sqlApi.post(`/user/createImage`, { userId: user, size: "medium" });
      const dataMedium = imageMedium.data
      const imageLarge = await sqlApi.post(`/user/createImage`, { userId: user, size: "large" });
      const dataLarge = imageLarge.data
      callback("10%")


      await axios.put(dataSmall.url, blob.small, {
        headers: {
          "Content-Type": "image/jpeg",
        },
      });
      callback("30%")
      await axios.put(dataMedium.url, blob.medium, {
        headers: {
          "Content-Type": "image/jpeg",
        },
      });
      callback("70%")

      await axios.put(dataLarge.url, blob.large, {
        headers: {
          "Content-Type": "image/jpeg",
        },
      });
      callback("100%")


      const finalUrl = (key) => {
        return "https://my-photo-bucket-111.s3.us-east-2.amazonaws.com/" + key;
      }

      await sqlApi.post("/user/saveImageLink", {
        imageLink: {
          small: finalUrl(dataSmall.key),
          medium: finalUrl(dataMedium.key),
          large: finalUrl(dataLarge.key)
        },
        userId: user,
      });
      callback("0%")

      console.log("finalUrl", finalUrl);
      return {
        small: finalUrl(dataSmall.key),
        medium: finalUrl(dataMedium.key),
        large: finalUrl(dataLarge.key)
      };
    } catch (error) {
      console.log("Error in uploadImage action:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const fetchUserImage = createAsyncThunk("image/fetch", async (_, thunkAPI) => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    const response = await sqlApi.get(`/api/userImages?userId=${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const deleteImage = createAsyncThunk("image/delete", async ({ keys }, thunkAPI) => {
  try {
    await sqlApi.post("/user/deleteImage", { keys });
    return keys;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export { uploadImage, fetchUserImage, deleteImage };
