import { StyleSheet, Button } from "react-native";
import {
  followUser,
  unfollowUser,
  subscribeUser,
  unsubscribeUser,
} from "../../redux";
import { useDispatch } from "react-redux";
import React from "react";

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
        <Button
          title="Unsubscribe and Unfollow"
          onPress={() => handleUnfollow(item.id)}
        />
      ) : item.follows === "true" ? (
        <>
          <Button title="Unfollow" onPress={() => handleUnfollow(item.id)} />
          {item.subscribed === "pending" ? (
            <Button title="Pending" />
          ) : item.subscribed === "declined" ? (
            <Button title="Declined" />
          ) : (
            <Button
              title="Subscribe"
              onPress={() => handleSubscribe(item.id)}
            />
          )}
        </>
      ) : (
        <Button title="Follow" onPress={() => handleFollow(item.id)} />
      )}
    </>
  );
};

export default FollowUnfollowButton;

const styles = StyleSheet.create({});
