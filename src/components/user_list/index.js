import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation, StackActions } from "@react-navigation/native";
import FollowUnfollowButton from "../follow_unfollow_button";
import Icon from "../icon";
import CustomText from "../text";

const UsersList = ({ results, setResults }) => {
  const navigation = useNavigation();
  const storedUserInfo = useSelector((state) => state.user.userInfo);
  console.log("UsersList", results)
  return (
    <>
      {results ? (
        <FlatList
          style={styles.list}
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                storedUserInfo.id !== item.id
                  ? navigation.push("UserProfileScreen", {
                    id: item.id,
                    item,
                  })
                  : navigation.dispatch(StackActions.popToTop());
              }}
            >

              <View style={styles.userElement}>
                <View style={styles.imageContainer}>
                  {item.image_link ? (
                    <Image
                      source={{ uri: item.image_link }}
                      style={{ width: 40, height: 40, borderRadius: 1000, }}
                    />
                  ) : <Icon name="profileIcon" style={{ width: 40, height: 40, color: "#808080" }} />}
                </View>
                <View style={styles.textContainer}>
                  <CustomText style={styles.itemText}>{item.username}</CustomText></View>
                {storedUserInfo.id !== item.id ? (
                  <View style={styles.followUnfollow}>
                    <FollowUnfollowButton
                      item={item}
                      results={results}
                      setResults={setResults}
                    />
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>Nothing to fetch</Text>
      )}
    </>
  );
};

export default UsersList;

const styles = StyleSheet.create({
  textContainer: {
    // width: 150,
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1

  },
  followUnfollow: {
    width: 80,
    // backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 5
  },
  itemText: {
    fontSize: 18,
    color: "white",
    alignItems: "center",

  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    // backgroundColor: "red"
  },
  list: {
    marginTop: 20,
    height: "100%",
  },
  userElement: {

    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    marginBottom: 15,
    // marginHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5
    // paddingTop: 5,

  },
});
