import { View, Text, FlatList, Image, Button, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import CustomText from "../../components/text";
import sqlApi from "../../redux/axios/sqlApi";
import { useSelector } from "react-redux";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";

import Theme from "../../styles/theme";
import NotificationHeader from "../../components/header/notificationHeader";
import Icon from "../../components/icon";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const storedUserInfo = useSelector((state) => state.user.userInfo);
  console.log("storedUserInfo", storedUserInfo._id);

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

  const handleAccept = async (userId, targetUserId, postId) => {
    try {
      // Sending a post request to accept the subscription
      await sqlApi.post("/acceptSubscription", {
        userId,
        targetUserId,
        postId,
      });

      // Updating the notifications state by filtering out the accepted notification
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== postId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecline = async (userId, targetUserId, postId) => {
    try {
      // Sending a post request to accept the subscription
      await sqlApi.post("/declineSubscription", {
        userId,
        targetUserId,
        postId,
      });

      // Updating the notifications state by filtering out the accepted notification
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== postId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeen = async (notificationId) => {
    try {
      await sqlApi.post("/markNotificationSeen", {
        notificationId,
      });

      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification._id !== notificationId
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
                handleAccept(storedUserInfo.id, item.from.id, item.id)
              }
              color="green"
            />
            <Button
              title="Decline"
              onPress={() =>
                handleDecline(storedUserInfo.id, item.from.id, item.id)
              }
              color="red"
            />
          </>
        );
    }
  };

  const textSwitch = (item) => {
    switch (item.type) {
      case "follow":
        return (<View style={styles.textComponent}>
          <CustomText>{item.username}</CustomText>
          <CustomText style={styles.textMessage}>Now following you</CustomText>
        </View>
        );
      case "subscription_request":
        return (
          <View style={styles.textComponent}>
            <CustomText>{item.username}</CustomText>
            <CustomText style={styles.textMessage}>
              Sent you a subscription request
            </CustomText>
          </View>
        );
    }
  };

  const humanReadableDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "yesterday";
    } else {
      // Here, you can format the date as desired for dates other than today and yesterday
      // For simplicity, this example returns the date in the format 'DD/MM/YYYY'
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
  };

  const NotificationItem = ({ item }) => (
    <View style={styles.notificationContainer}>
      <View style={styles.userIconWithTextContainer}>
        {item.image_link ? <Image source={{ uri: item.image_link }} style={styles.userImage} /> : <Icon name="profileIcon" style={{ width: 40, height: 40, color: "#808080" }} />}


        {textSwitch(item)}
      </View>
      {/* <View style={styles.buttonContainer}>{buttonSwitch(item)}</View> */}
      <View style={styles.textContainer}>
        <CustomText style={styles.dateText}>
          {humanReadableDate(item.date)}
        </CustomText>
      </View>
    </View>
  );

  return (
    <View style={{ backgroundColor: "black", flex: 1, paddingTop: 130 }}>
      <View style={styles.header}>
        <NotificationHeader />
      </View>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
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
    paddingHorizontal: 20,
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomColor: "rgba(250, 251, 254, 0.20)",
    borderWidth: 1
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
