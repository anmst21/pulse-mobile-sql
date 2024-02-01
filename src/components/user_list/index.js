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
          keyExtractor={(item) => item._id}
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
                      style={{ width: 30, height: 30, borderRadius: 1000 }}
                    />
                  ) : null}
                  <Text style={styles.itemText}>{item.username}</Text>
                </View>
                {storedUserInfo.id !== item.id ? (
                  <FollowUnfollowButton
                    item={item}
                    results={results}
                    setResults={setResults}
                  />
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
  itemText: {
    fontSize: 18,
    marginBottom: 10,
    color: "black",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  list: {
    marginTop: 20,
    height: "100%",
  },
  userElement: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
});
