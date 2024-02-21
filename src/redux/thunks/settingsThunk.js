import { createAsyncThunk } from "@reduxjs/toolkit";
import sqlApi from "../axios/sqlApi";
import AsyncStorage from "@react-native-async-storage/async-storage";


// Creating a pulse
const fetchGenres = createAsyncThunk(
    "genre/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const userId = await AsyncStorage.getItem("userId");

            const response = await sqlApi.get(
                `/fetch/genres?userId=${userId}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const toggleGenre = createAsyncThunk(
    "genre/add",
    async ({ genreId }, { rejectWithValue }) => {
        try {
            const userId = await AsyncStorage.getItem("userId");

            const response = await sqlApi.post(
                `/add/genre`, {
                user_id: userId,
                genre_id: genreId
            }
            );
            console.log("response.dataTOGGLE!", response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);




export { fetchGenres, toggleGenre };

