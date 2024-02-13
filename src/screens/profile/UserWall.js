import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import React, { useState, useEffect } from "react";
import ProfilePicture from "../../components/profile_picture";
import UserPosts from "./UserPosts";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/text";
import sqlApi from "../../redux/axios/sqlApi"
import Icon from "../../components/icon"

const UserWall = ({ userAudios, userInfo, userId, storedUserInfo }) => {
  console.log("userWall", userInfo)
  const navigation = useNavigation();
  const handlePress = (listType) => {
    navigation.push("UserListScreen", {
      screenKey: userId,
      listType,
      userId,
    });
  };
  console.log("userInfo", userInfo);

  const [audios, setAudios] = useState([])
  console.log("audiosaudiosaudios", audios)
  const fetchUserDetails = async () => {


    const { data } = await sqlApi.get(`/user/${userId}/audios`)
    setAudios(data)

  };

  useEffect(() => {
    fetchUserDetails()
  }, [])


  return (
    <View style={styles.mainContainer}>

      <View style={styles.container}>
        <View style={styles.userNameContainer} >
          <CustomText >
            <CustomText style={{ fontSize: 30 }}>
              {userInfo.username}</CustomText>, {userInfo.id}
          </CustomText>
        </View>
        <ProfilePicture userId={userId} imageLink={userInfo.image_link} />

        <View style={styles.itemsCenter}>

          <View style={styles.infoContainer}>

            {/* <TouchableOpacity onPress={() => handlePress("fetchFollowing")}>
              <View style={styles.lilBox}>
                <CustomText>Following:</CustomText>
                <CustomText>{userInfo.followingCount}</CustomText>
              </View>
            </TouchableOpacity> */}
            <View style={[styles.lilBox, { left: -20 }]}>
              <Icon name="waveFormProfile" style={styles.actionIcon} />
              <CustomText style={styles.number}>{userInfo.postsCount}</CustomText>
            </View>

            <TouchableOpacity onPress={() => handlePress("followers")}>
              <View style={styles.lilBox}>

                <Icon name="followIcon" style={styles.actionIcon} />
                <CustomText style={styles.number}>{userInfo.followersCount}</CustomText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("subscribers")}>
              <View style={[styles.lilBox, { left: -20 }]}>
                <Icon name="subscribeIcon" style={styles.actionIcon} />
                <CustomText style={styles.number}>{userInfo.subscribersCount}</CustomText>
              </View>
            </TouchableOpacity>

          </View>
          {/* <View style={styles.infoContainer}>
            <TouchableOpacity onPress={() => handlePress("fetchSubscribing")}>
              <View style={styles.lilBox}>
                <CustomText>Subscribing:</CustomText>
                <CustomText>{userInfo.subscriptionsCount}</CustomText>
              </View>
            </TouchableOpacity>

          </View> */}
        </View>

      </View>

      <UserPosts
        setAudioList={setAudios} audioList={audios}
        userId={userId}
      />
    </View>
  );
};

export default UserWall;

const styles = StyleSheet.create({
  userNameContainer: {

    backgroundColor: "rgba(31, 32, 34, 0.8)",
    position: "absolute",
    paddingHorizontal: 25,

    justifyContent: "center",
    paddingBottom: 5,
    paddingTop: 3,
    borderRadius: 100,
    top: 20,
    left: 10,
    zIndex: 9999,


  },
  actionIcon: {

    height: 40,
    width: 40,
    color: "#FFFFFF",

  },
  number: {
    fontSize: 18,
    position: "absolute",
    right: 0,
    top: -10,
    color: "#fff"

  },
  mainContainer: {
    top: -25,
    flexDirection: "column",
    marginHorizontal: 10
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  bigBox: {
    alignItems: "center",
  },
  lilBox: {
    // backgroundColor: "#3B3B3B",
    height: 40,
    alignItems: "center",
    width: 70,
    borderRadius: 5,
    justifyContent: "center",
  },
  container: {

    flexDirection: "row",
    marginLeft: 0,
    backgroundColor: "rgba(31, 32, 34, 0.4)",
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 20,

    marginBottom: 25,
  },
  itemsCenter: {
    alignSelf: "center",
    marginLeft: 20
  },
  header: {
    flexDirection: "row",
  },
  h1: {
    marginLeft: 20,
    fontSize: 28,
  },
  infoContainer: {
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 30,
    borderWidth: 1,
    borderColor: "black",
    borderRightWidth: 0,
  },
});
