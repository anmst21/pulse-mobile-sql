import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from "react-native";
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
    <ScrollView>
      <View style={styles.mainContainer}>

        <View style={styles.container}>

          <View style={styles.userNameContainer} >
            <CustomText >
              <CustomText style={{ fontSize: 30 }}>
                {userInfo.username}</CustomText>, {userInfo.id}
            </CustomText>
          </View>


          <View style={styles.bio}>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 7
            }}>

              <Icon name="linkIcon" style={{ color: "#ABABAB", width: 20 }} />
              <CustomText style={{ fontSize: 16 }}>Spotify</CustomText>
            </View>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              width: 250,
              paddingRight: 20,
            }}>
              <Icon name="zapIcon" style={{ color: "#ABABAB", width: 20 }} />
              <CustomText style={{ fontSize: 16 }}>Data Scientist, Python & Finance Buff</CustomText>
            </View>
            <View style={{
              position: "absolute", right: -80
            }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Settings");
                }}
              >
                <Icon name="cog" />
              </TouchableOpacity>
            </View>
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
              <View style={[styles.lilBox, { left: -10 }]}>
                <Icon name="waveFormProfile" style={styles.actionIcon} />
                <CustomText style={[styles.number, { right: -5, }]}>{userInfo.postsCount}</CustomText>
              </View>

              <TouchableOpacity onPress={() => handlePress("followers")}>
                <View style={styles.lilBox}>

                  <Icon name="followIcon" style={styles.actionIcon} />
                  <CustomText style={[styles.number, { right: -5, }]}>{userInfo.followersCount}</CustomText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress("subscribers")}>
                <View style={[styles.lilBox, { left: -20 }]}>
                  <Icon name="subscribeIcon" style={styles.actionIcon} />
                  <CustomText style={[styles.number, { right: -2, }]}>{userInfo.subscribersCount}</CustomText>
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
        <View style={styles.sortBar}>
          <View style={styles.sort}>
            <CustomText style={{ fontSize: 16 }}>New</CustomText>
            <View style={{ top: 2 }}>
              <Icon name="downvoteIcon" style={{ color: "white" }} />
            </View>
          </View>
          <View style={styles.sortRight}>
            <View>
              <Icon name="bookmarkIcon" style={{ stroke: "white", background: null }} />

            </View>
            <View style={styles.viewStyle}>

              <Icon name="viewStyleList" style={{ stroke: "white", background: "white" }} />

              <Icon name="viewStyleWindows" style={{ stroke: "white", background: null }} />


            </View>
          </View>
        </View>
        <UserPosts
          setAudioList={setAudios} audioList={audios}
          userId={userId}
        />
      </View>
    </ScrollView>
  );
};

export default UserWall;

const styles = StyleSheet.create({
  viewStyle: {

    flexDirection: "row",
    gap: 5,
    backgroundColor: "rgba(31, 32, 34, 0.7)",
    paddingHorizontal: 5,
    borderRadius: 5,
    paddingVertical: 5,
    height: 35,
    alignItems: "center"
  },
  sortRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15
  },
  sort: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  sortBar: {
    backgroundColor: "blue",
    height: 50,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "rgba(31, 32, 34, 0.4)",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20

  },
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
    right: -10,
    top: 0,
    color: "#fff"

  },
  mainContainer: {
    paddingTop: 50,
    paddingBottom: 30,
    // top: -25,
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
    // backgroundColor: "rgba(31, 32, 34, 1)",
    height: 60,
    alignItems: "center",
    width: 60,
    borderRadius: 100,
    justifyContent: "center",
  },
  bio: {
    padding: 5,
    gap: 7,
    height: 75,


    position: "absolute",
    bottom: 10,
    left: 10,
    zIndex: 10,
    width: 250,
    justifyContent: "center"
  },

  container: {

    flexDirection: "row",
    marginLeft: 0,
    backgroundColor: "rgba(31, 32, 34, 0.4)",
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 20,
    paddingBottom: 100,

    marginBottom: 20,
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
    gap: 15,

    borderRightWidth: 0,
  },
});
