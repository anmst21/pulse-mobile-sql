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
import RectBtn from "../rect_btn";

const FollowUnfollowButton = ({ item, results, setResults, post }) => {
  const dispatch = useDispatch();

  // console.log("status", results[0].status)

  const handleUnfollow = (userId) => {
    if (!post) {
      dispatch(unfollowUser({ userId, post }));
      const updatedResults = results.map((result) =>
        result.id === userId ? { ...result, status: "false", } : result
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
        result.id === userId ? { ...result, status: "follows" } : result
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
        result.id === userId ? { ...result, status: "pending" } : result
      );
      setResults(updatedResults);
    } else {
      dispatch(subscribeUser({ userId, post }));
    };
  }

  const handleUnban = (userId) => {
    if (!post) {
      const updatedResults = results.map((result) =>
        result.id === userId ? { ...result, status: "false" } : result
      );
      setResults(updatedResults);
    }
  }

  const renderComponent = () => {
    switch (item.status) {
      case "false":
        return <Icon name="followIcon" style={{ width: 30, heigth: 30, color: "#8136DC" }} />


      case "follows":
        return <>
          <Icon name="followIcon" style={{ width: 30, heigth: 30, color: "#14AD4D" }} />
          <Icon name="subscribeIcon" style={{ width: 30, heigth: 30, color: "#8136DC" }} />
        </>
      case "pending":
        return <>
          <Icon name="followIcon" style={{ width: 30, heigth: 30, color: "#14AD4D" }} />
          <Icon name="subscribeIcon" style={{ width: 30, heigth: 30, color: "#FFAB1F" }} />
        </>


      case "accepted":
        return <>
          <Icon name="followIcon" style={{ width: 30, heigth: 30, color: "#14AD4D" }} />
          <Icon name="subscribeIcon" style={{ width: 30, heigth: 30, color: "#14AD4D" }} />
        </>
      case "banned":
        return <RectBtn state={true} name="eye" callback={() => {

        }} />
    }
  }

  return (
    <View style={{
      flexDirection: "row",
      width: 70,
      // backgroundColor: "blue",
      justifyContent: "flex-end",
      gap: 10
    }}>
      {renderComponent()}
      {/* {item.subscribed === "true" ? (
      
        <TouchableOpacity onPress={() => handleUnfollow(item.id)}>
          <View style={{
            flexDirection: "row", width: 70,
            justifyContent: "space-between",

          }}>
            <Icon name="followIcon" style={{ width: 30, heigth: 30, color: "#14AD4D" }} />
            <Icon name="subscribeIcon" style={{ width: 30, heigth: 30, color: "#14AD4D" }} />
          </View>
        </TouchableOpacity>
      ) : item.follows === "true" ? (
        <>
          <TouchableOpacity onPress={() => handleUnfollow(item.id)}>
            <Icon name="followIcon" style={{ width: 30, heigth: 30, color: "#14AD4D" }} />
          </TouchableOpacity>

          {item.subscribed === "pending" ? (
            <Icon name="subscribeIcon" style={{ width: 30, heigth: 30, color: "#FFAB1F" }} />
          ) : item.subscribed === "declined" ? (
            <Icon name="subscribeIcon" style={{ width: 30, heigth: 30, color: "#F53535" }} />
          ) : (
       
            <TouchableOpacity onPress={() => handleSubscribe(item.id)}>
              <Icon name="subscribeIcon" style={{ width: 30, heigth: 30, color: "#8136DC" }} />
            </TouchableOpacity>

          )}
        </>
      ) : (
        <TouchableOpacity onPress={() => handleFollow(item.id)} >
          <Icon name="followIcon" style={{ width: 30, heigth: 30, color: "#8136DC" }} />
        </TouchableOpacity>

      )} */}
    </View>
  );
};

export default FollowUnfollowButton;

const styles = StyleSheet.create({});


// #8136DC #F53535 #FFAB1F #14AD4D