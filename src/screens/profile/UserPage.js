import { StyleSheet, Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, fetchUserAudios } from "../../redux";
import { useFocusEffect } from "@react-navigation/native";
import UserWall from "./UserWall";
import Icon from "../../components/icon";


const UserPage = () => {
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const storedUserInfo = useSelector((state) => state.user.userInfo);
  console.log("storedUserInfo", storedUserInfo)
  const audioList = useSelector((state) => state.audio.recordings);
  console.log("storedUserInfo._id", audioList);



  const fetchUserDetails = async () => {
    const userIdFromStorage = await AsyncStorage.getItem("userId");

    if (userIdFromStorage) {
      dispatch(fetchUserInfo({ userId: userIdFromStorage }));
      // dispatch(fetchUserAudios({ userId: userIdFromStorage }));
    }
  };

  useEffect(() => { fetchUserDetails() }, [])
  return (
    <View style={styles.container}>

      <UserWall
        userAudios={audioList}
        userInfo={storedUserInfo}
        userId={storedUserInfo.id}
        storedUserInfo={storedUserInfo.id}
      />


    </View>
  );
};

export default UserPage;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "green",
    flex: 1
  }
});
