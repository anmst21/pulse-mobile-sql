import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import config from "../../../config"

const instance = axios.create({
    baseURL: config.apiURL,
});
instance.interceptors.request.use(
    async (config) => {
        config.headers['Content-Type'] = 'application/json';

        const token = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem("userId");
        console.log("Axios Interceptor - UserID:", userId); // Debugging line

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (userId) {
            config.headers['userId'] = userId; // Ensure this matches the backend expectation
        }

        console.log("Config Headers:", config.headers); // Debugging line
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;
