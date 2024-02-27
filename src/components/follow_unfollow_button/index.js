import { StyleSheet, Button, TouchableOpacity, View } from "react-native";
import {
  followUser,
  unfollowUser,
  subscribeUser,
  unsubscribeUser,
} from "../../redux";
import { useDispatch } from "react-redux";
import React from "react";
import Icon from "../icon";

const FollowUnfollowButton = ({ item, results, setResults, post }) => {
  const dispatch = useDispatch();



  const handleUnfollow = (userId) => {
    if (!post) {
      dispatch(unfollowUser({ userId, post }));
      const updatedResults = results.map((result) =>
        result.id === userId ? { ...result, follows: "false", subscribed: "pending" } : result
      );
      setResults(updatedResults);
    } else {
      dispatch(unfollowUser({ userId, post }));
    }

  };

  const handleFollow = (userId) => {
    if (!post) {
      dispatch(followUser({ userId, post }));
      const updatedResults = results.map((result) =>
        result.id === userId ? { ...result, follows: "true" } : result
      );
      setResults(updatedResults);
    } else {
      dispatch(followUser({ userId: item.user_id, post }));

    }
  };

  const handleSubscribe = (userId) => {
    if (!post) {
      dispatch(subscribeUser({ userId, post }));
      const updatedResults = results.map((result) =>
        result.id === userId ? { ...result, subscribed: "pending" } : result
      );
      setResults(updatedResults);
    } else {
      dispatch(subscribeUser({ userId, post }));
    };
  }

  return (
    <View style={{
      flexDirection: "row",
      width: 70,
      // backgroundColor: "blue",
      justifyContent: "space-between"
    }}>
      {item.subscribed === "true" ? (
        // <Button
        //   title="Unsubscribe and Unfollow"
        //   onPress={() => handleUnfollow(item.id)}
        // />
        <TouchableOpacity onPress={() => handleUnfollow(item.id)}>
          <View style={{
            flexDirection: "row", width: 70,
            //  backgroundColor: "blue",
            justifyContent: "space-between",

          }}>
            <Icon name="followIcon" style={{ width: 30, heigth: 30, color: "#14AD4D" }} />
            <Icon name="subscribeIcon" style={{ width: 30, heigth: 30, color: "#14AD4D" }} />
          </View>
        </TouchableOpacity>
      ) : item.follows === "true" ? (
        <>
          {/* <Button title="Unfollow" onPress={() => handleUnfollow(item.id)} /> */}
          <TouchableOpacity onPress={() => handleUnfollow(item.id)}>
            <Icon name="followIcon" style={{ width: 30, heigth: 30, color: "#14AD4D" }} />
          </TouchableOpacity>

          {item.subscribed === "pending" ? (
            <Icon name="subscribeIcon" style={{ width: 30, heigth: 30, color: "#FFAB1F" }} />
          ) : item.subscribed === "declined" ? (
            <Icon name="subscribeIcon" style={{ width: 30, heigth: 30, color: "#F53535" }} />
          ) : (
            // <Button
            //   title="Subscribe"
            //   onPress={() => handleSubscribe(item.id)}
            // />
            <TouchableOpacity onPress={() => handleSubscribe(item.id)}>
              <Icon name="subscribeIcon" style={{ width: 30, heigth: 30, color: "#8136DC" }} />
            </TouchableOpacity>

          )}
        </>
      ) : (
        // <Button title="Follow" onPress={() => handleFollow(item.id)} />
        <TouchableOpacity onPress={() => handleFollow(item.id)} >
          <Icon name="followIcon" style={{ width: 30, heigth: 30, color: "#8136DC" }} />
        </TouchableOpacity>

      )}
    </View>
  );
};

export default FollowUnfollowButton;

const styles = StyleSheet.create({});


// #8136DC #F53535 #FFAB1F #14AD4D