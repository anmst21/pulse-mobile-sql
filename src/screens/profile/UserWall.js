import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import React, { useState, useEffect } from "react";
import ProfilePicture from "../../components/profile_picture";
import UserPosts from "./UserPosts";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/text";
import sqlApi from "../../redux/axios/sqlApi"

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
        <ProfilePicture userId={userId} imageLink={userInfo.image_link} />

        <View style={styles.itemsCenter}>
          <CustomText >
            <CustomText style={{ fontSize: 25 }}>
              {userInfo.username}</CustomText>, {userInfo.id}
          </CustomText>
          <View style={styles.infoContainer}>

            {/* <TouchableOpacity onPress={() => handlePress("fetchFollowing")}>
              <View style={styles.lilBox}>
                <CustomText>Following:</CustomText>
                <CustomText>{userInfo.followingCount}</CustomText>
              </View>
            </TouchableOpacity> */}
            <View style={styles.lilBox}>
              <CustomText style={{ fontSize: 14 }}>Posts:</CustomText>
              <CustomText style={{ fontSize: 18 }}>{userInfo.postsCount}</CustomText>
            </View>

            <TouchableOpacity onPress={() => handlePress("followers")}>
              <View style={styles.lilBox}>
                <CustomText style={{ fontSize: 14 }}>Followers:</CustomText>
                <CustomText style={{ fontSize: 18 }}>{userInfo.followersCount}</CustomText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("subscribers")}>
              <View style={styles.lilBox}>
                <CustomText style={{ fontSize: 14 }}>Subs:</CustomText>
                <CustomText style={{ fontSize: 18 }}>{userInfo.subscribersCount}</CustomText>
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
  mainContainer: {
    flexDirection: "column"
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
    backgroundColor: "#3B3B3B",
    height: 40,
    alignItems: "center",
    width: 70,
    borderRadius: 5,
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    marginLeft: 10,

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
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    borderWidth: 1,
    borderColor: "black",
    borderRightWidth: 0,
  },
});
