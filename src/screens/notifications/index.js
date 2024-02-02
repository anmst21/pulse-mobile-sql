import { View, Text, FlatList, Image, Button, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect } from "react";
import CustomText from "../../components/text";
import sqlApi from "../../redux/axios/sqlApi";
import { useSelector } from "react-redux";
import { PanGestureHandler } from 'react-native-gesture-handler';
import NotificationItem from "./NotificationItem";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  useAnimatedGestureHandler, runOnJS, runOnUI
} from "react-native-reanimated";

import Theme from "../../styles/theme";
import NotificationHeader from "../../components/header/notificationHeader";
import Icon from "../../components/icon";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const storedUserInfo = useSelector((state) => state.user.userInfo);
  console.log("storedUserInfo", storedUserInfo.id);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await sqlApi.get(
          `/notifications/fetch?userId=${storedUserInfo.id}`
        );
        console.log("fetchNotifications", response.data)
        setNotifications(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, []);

  const handleAccept = async (leaderId, followerId, notificationId) => {
    try {
      // Sending a post request to accept the subscription
      await sqlApi.post("/user/acceptSubscriptionRequest", {
        leaderId,
        followerId,
        notificationId,
      });

      // Updating the notifications state by filtering out the accepted notification
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== notificationId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecline = async (leaderId, followerId, notificationId) => {
    try {
      // Sending a post request to accept the subscription
      await sqlApi.post("/user/declineSubscriptionRequest", {
        leaderId,
        followerId,
        notificationId,
      });

      // Updating the notifications state by filtering out the accepted notification
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== notificationId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeen = async (notificationId) => {
    try {
      await sqlApi.post("/notifications/markSeen", {
        notificationId,
      });

      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.id !== notificationId
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const buttonSwitch = (item) => {
    switch (item.type) {
      case "follow":
        return (
          <Button
            title="Mark as seen"
            onPress={() => handleSeen(item.id)}
            color="green"
          />
        );
      case "subscription_request":
        return (
          <>
            <Button
              title="Accept"
              onPress={() =>
                handleAccept(storedUserInfo.id, item.from_user_id, item.id)
              }
              color="green"
            />
            <Button
              title="Decline"
              onPress={() =>
                handleDecline(storedUserInfo.id, item.from_user_id, item.id)
              }
              color="red"
            />
          </>
        );
    }
  };








  return (
    <View style={{ backgroundColor: "black", flex: 1, paddingTop: 130 }}>
      <View style={styles.header}>
        <NotificationHeader />
      </View>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem storedUserInfo={storedUserInfo} handleAccept={handleAccept} handleDecline={handleDecline} handleSeen={handleSeen} item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({

  ctaBtn: {
    position: "absolute",
    left: "100%",
    flexDirection: "row",
    paddingHorizontal: 10,
    gap: 50,
    // width: 255,
    //  backgroundColor: "red",
    justifyContent: "center",
    height: "100%",
    alignItems: "center"

  },
  slidingContainer: {
    // position: "absolute",
    // flex: 1,
    // transform: "translateX(-100 %)"
    //left: -250,

    justifyContent: "center",

  },
  textMessage: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    // backgroundColor: "blue",
    position: "absolute",
    top: 30,

  },
  textComponent: {
    position: "relative",
    flex: 1,
    marginLeft: 20
  },
  dateText: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 12,
  },
  userIconWithTextContainer: {
    alignItems: "center", // centers items horizontally
    justifyContent: "start", // centers items vertically
    flexDirection: "row",
  },
  userImage: { width: 40, height: 40, borderRadius: 1000 },
  textContainer: {
    alignItems: "flex-end"
  },
  notificationContainer: {
    position: "relative",
    //  backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: "rgba(250, 251, 254, 0.20)",
    borderWidth: 1,

  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 20,
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10,

  },
});
