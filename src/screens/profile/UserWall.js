import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import ProfilePicture from "../../components/profile_picture";
import UserPosts from "./UserPosts";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/text";
import sqlApi from "../../redux/axios/sqlApi"
import Icon from "../../components/icon"
import FollowUnfollowButton from "../../components/follow_unfollow_button";

const UserWall = ({ userAudios, userInfo, userId, storedUserInfo, btn }) => {
  const navigation = useNavigation();
  const handlePress = (listType) => {
    navigation.push("UserListScreen", {
      screenKey: userId,
      listType,
      userId,
    });
  };
  console.log(btn, "btn")

  const [audios, setAudios] = useState([])
  const fetchUserDetails = async () => {


    const { data } = await sqlApi.get(`/user/${userId}/audios`)
    setAudios(data)

  };

  useEffect(() => {
    fetchUserDetails()
  }, [])


  const handleLinkPress = async (url) => {
    // Check if the URL can be opened
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      // Open the URL if it's supported
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  };


  return (
    <ScrollView>
      <View style={styles.mainContainer}>

        <View style={styles.container}>

          <View style={styles.userNameContainer} >
            <CustomText style={{ fontSize: 30 }}>
              {userInfo.username}
            </CustomText>
          </View>


          <View style={styles.bio}>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 7
            }}>

              <Icon name="linkIcon" style={{ color: "#ABABAB", width: 20 }} />
              {userInfo.link ?
                <TouchableOpacity onPress={() => {
                  handleLinkPress(userInfo.link.link)
                }}>
                  <CustomText style={{ fontSize: 16, textDecorationLine: 'underline', }}>{userInfo.link.linkName}</CustomText>
                </TouchableOpacity>
                :
                <View style={{
                  flex: 0.5,
                  backgroundColor: "rgba(31, 32, 34, 0.8)",
                  height: 20,
                  borderRadius: 3
                }} />
              }

            </View>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              width: 250,
              paddingRight: 20,
            }}>

              <Icon name="zapIcon" style={{ color: "#ABABAB", width: 20 }} />
              {userInfo.bio ?
                <CustomText style={{ fontSize: 16 }}>{userInfo.bio}</CustomText>
                :
                <View style={{
                  width: "100%",
                  backgroundColor: "rgba(31, 32, 34, 0.8)",
                  height: 60,
                  borderRadius: 3
                }} />
              }
            </View>

            <View style={{
              position: "absolute", right: 20
            }}>
              {storedUserInfo === userInfo.id ?
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Settings");
                  }}
                >
                  <Icon name="cog" />
                </TouchableOpacity>
                :
                <>{btn()}</>
              }
            </View>

          </View>

          <ProfilePicture userId={userId} imageLink={userInfo.image_link?.large} width={250} />

          <View style={styles.itemsCenter}>

            <View style={styles.infoContainer}>

              {/* <TouchableOpacity onPress={() => handlePress("fetchFollowing")}>
              <View style={styles.lilBox}>
                <CustomText>Following:</CustomText>
                <CustomText>{userInfo.followingCount}</CustomText>
              </View>
            </TouchableOpacity> */}
              <View style={[styles.lilBox, { left: -10, }]}>
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
              <Icon name="bookmarkIcon" style={{ width: 24, stroke: "white", background: null }} />

            </View>
            <View style={styles.viewStyle}>

              <Icon name="viewStyleList" style={{ stroke: "white", background: "white" }} />

              <Icon name="viewStyleWindows" style={{ stroke: "white", background: null }} />


            </View>
          </View>
        </View>
        <View style={{ height: "100%", paddingBottom: 60 }}>


          {audios
            ? audios.map((audio) => (
              <UserPosts key={audio.id} audio={audio} userId={userId} setAudioList={setAudios} audioList={audios} />
            )) : null}
        </View>

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
    // backgroundColor: "blue",
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

    backgroundColor: "rgba(31, 32, 34, 1)",
    position: "absolute",
    paddingHorizontal: 20,

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
    // backgroundColor: "blue",


    position: "absolute",
    bottom: 25,
    left: 10,
    zIndex: 10,
    width: "100%",
    justifyContent: "center"
  },

  container: {
    flexDirection: "row",
    marginLeft: 0,
    backgroundColor: "rgba(31, 32, 34, 0.4)",
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 20,
    // backgroundColor: "blue",
    justifyContent: "center",
    paddingBottom: 120,

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
