import { StyleSheet, Button, TouchableOpacity } from "react-native";
import {
  followUser,
  unfollowUser,
  subscribeUser,
  unsubscribeUser,
} from "../../redux";
import { useDispatch } from "react-redux";
import React from "react";
import Icon from "../icon";

const FollowUnfollowButton = ({ item, results, setResults }) => {
  const dispatch = useDispatch();


  console.log("item", item);

  const handleUnfollow = async (userId) => {
    dispatch(unfollowUser(userId));
    const updatedResults = results.map((result) =>
      result.id === userId ? { ...result, follows: "false" } : result
    );
    await setResults(updatedResults);
  };

  const handleFollow = async (userId) => {
    dispatch(followUser(userId));
    const updatedResults = results.map((result) =>
      result.id === userId ? { ...result, follows: "true" } : result
    );
    console.log("updatedResults", updatedResults)
    await setResults(updatedResults);
  };

  const handleSubscribe = async (userId) => {
    try {
      dispatch(subscribeUser(userId));
      const updatedResults = results.map((result) =>
        result.id === userId ? { ...result, subscribed: "pending" } : result
      );
      await setResults(updatedResults);
    } catch (error) {
      // Handle the error, e.g., show a message to the user
      console.error("Error subscribing to user:", error);
    }
  };

  // const handleUnsubscribeUnfollow = async (userId) => {
  //   try {
  //      dispatch(unfollowUser(userId));
  //      dispatch(unsubscribeUser(userId));
  //     const updatedResults = results.map((result) =>
  //       result._id === userId
  //         ? { ...result, isFollowing: false, isSubscribed: null }
  //         : result
  //     );
  //     await setResults(updatedResults);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // {
  //   item.isSubscribed === "accepted" ? (
  //     <Button
  //       title="Unsubscribe and Unfollow"
  //       onPress={() => handleUnsubscribeUnfollow(item._id)}
  //     />
  //   ) : item.isFollowing ? (
  //     <>
  //       <Button title="Unfollow" onPress={() => handleUnfollow(item._id)} />
  //       {item.isSubscribed === "pending" ? (
  //         <Button title="Pending" />
  //       ) : item.isSubscribed === "declined" ? (
  //         <Button title="Declined" />
  //       ) : (
  //         <Button
  //           title="Subscribe"
  //           onPress={() => handleSubscribe(item._id)}
  //         />
  //       )}
  //     </>
  //   ) : (
  //     <Button title="Follow" onPress={() => handleFollow(item._id)} />
  //   )
  // }

  return (
    <>
      {item.subscribed === "true" ? (
        // <Button
        //   title="Unsubscribe and Unfollow"
        //   onPress={() => handleUnfollow(item.id)}
        // />
        <TouchableOpacity onPress={() => handleUnfollow(item.id)}>
          <Icon name="followIcon" style={{ width: 30, heigth: 30, color: "#14AD4D" }} />
          <Icon name="subscribeIcon" style={{ width: 30, heigth: 30, color: "#14AD4D" }} />
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
    </>
  );
};

export default FollowUnfollowButton;

const styles = StyleSheet.create({});


// #8136DC #F53535 #FFAB1F #14AD4D