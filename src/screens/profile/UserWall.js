import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import React from "react";
import ProfilePicture from "../../components/profile_picture";
import UserPosts from "./UserPosts";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/text";

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

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <ProfilePicture userId={userId} imageLink={userInfo.image_link} />

        <View style={styles.itemsCenter}>
          <CustomText >
            {userInfo.username}, {userInfo.id}
          </CustomText>
          <View style={styles.infoContainer}>

            {/* <TouchableOpacity onPress={() => handlePress("fetchFollowing")}>
              <View style={styles.lilBox}>
                <CustomText>Following:</CustomText>
                <CustomText>{userInfo.followingCount}</CustomText>
              </View>
            </TouchableOpacity> */}
            <View style={styles.lilBox}>
              <CustomText>Posts:</CustomText>
              <CustomText>{userInfo.postsCount}</CustomText>
            </View>

            <TouchableOpacity onPress={() => handlePress("followers")}>
              <View style={styles.lilBox}>
                <CustomText>Followers:</CustomText>
                <CustomText>{userInfo.followersCount}</CustomText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("subscribers")}>
              <View style={styles.lilBox}>
                <CustomText>Subscribers:</CustomText>
                <CustomText>{userInfo.subscribersCount}</CustomText>
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
        storedUserInfo={storedUserInfo}
        audioList={userAudios}
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
    borderRightWidth: 1,
    borderColor: "black",
    alignItems: "center",

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
