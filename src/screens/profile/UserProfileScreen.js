import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";
import UserWall from "./UserWall";
import { useSelector } from "react-redux";
import sqlApi from "../../redux/axios/sqlApi";
import FollowUnfollowButton from "../../components/follow_unfollow_button";
import CustomText from "../../components/text";


const UserProfileScreen = ({ route }) => {
  const { id, item } = route.params;
  const [userInfo, setUserInfo] = useState({});
  const [userAudios, setUserAudios] = useState();
  const storedUserInfo = useSelector((state) => state.user.userInfo);
  const [userButton, setUserButton] = useState([]);
  console.log("111111111", userInfo)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true)
      try {
        const response = await sqlApi.get(`/user/${id}`);
        const responseAudios = await sqlApi.get(
          `/user/${id}/audios`
        );
        // console.log("111111111", response.data)
        setUserButton([{ follows: response.data.follows, subscribed: response.data.subscribed }])
        setUserAudios(responseAudios.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error("An error occurred while fetching the user info:", error);
      } finally {
        setIsLoading(false)
      }
    };

    fetchUserInfo();
  }, [id, setIsLoading]);

  const Btn = () => {
    return userButton.length !== 0 &&
      <FollowUnfollowButton
        item={userButton[0]}
        results={userButton}
        setResults={setUserButton}
      />
  }

  return (

    <View style={styles.container}>
      {/* <View style={styles.header}>


        {storedUserInfo.id === id && (
          <Button
            title="Add Friends"
            onPress={() => {
              navigate("AddFriendsScreen");
            }}
          />
        )}
      </View> */}
      {/* <View style={styles.btnInteraction}>

      </View> */}

      <UserWall
        storedUserInfo={storedUserInfo}
        userAudios={userAudios}
        userInfo={userInfo}
        userId={id}
        btn={() => Btn()}
        isLoading={isLoading}
      />

    </View>

  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  btnInteraction: {
    zIndex: 9999,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    position: 'absolute', // Position the button absolutely
    bottom: 100, // Place it at the bottom

  },
  container: {
    backgroundColor: "black",
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: 10,
    marginTop: 80,
  },
  h1: {
    marginLeft: 20,
    fontSize: 28,
    color: "white"
  },
});
