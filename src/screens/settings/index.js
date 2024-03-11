import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView, TouchableWithoutFeedback, FlatList } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import customMapStyle from "../../components/map/mapStyle";
import AsyncSearch from "../../components/async_search";
import CustomText from "../../components/text";
import SettingsHeader from "../../components/header/settingsHeader";
import PlayerComponent from "../player/PlayerComponent";
import InAppBrowser from "react-native-inappbrowser-reborn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import ChangeProfileImg from "./ChangeProfileImg"
import SignOut from "./SignOut"
import GenrePreferences from "./GenrePreferences";
import TagsSettings from "./TagsSetting";
import NotificationsSettings from "./NotificationSettings";
import ReportBug from "./ReportBug";
import SignInWithService from "./SignInWithService";
import ShadowList from "./ShadowList"
import { setImageMenuOpen, closeNotifications, closeGenre, closeShadowList, closeReport } from "../../redux";








const Settings = ({ route }) => {
  const dispatch = useDispatch()

  const setSpotifyStorage = async ({ access, refresh, expires_in }) => {
    if (access) {
      await AsyncStorage.setItem("accessToken", access);
    }
    if (expires_in) {
      await AsyncStorage.setItem("expiresIn", expires_in);
    }
    if (refresh) {
      await AsyncStorage.setItem("refreshToken", refresh);
    }
  };

  useEffect(() => {
    setSpotifyStorage({
      access: route.params?.access_token,
      refresh: route.params?.refresh_token,
      expires_in: route.params?.expires_in,
    });
  }, [route.params]);

  if (route.params?.access_token && route.params?.refresh_token) {
    InAppBrowser.close();
  }

  const { imageMenuOpen, shadowListOpen, reportOpen, notificationsOpen, genreOpen } = useSelector((state) => state.settings);

  const handlePress = () => {
    if (imageMenuOpen) {
      dispatch(setImageMenuOpen(false))
    }
    if (shadowListOpen) {
      dispatch(closeShadowList())
    }
    if (reportOpen) {
      dispatch(closeReport())
    }
    if (notificationsOpen) {
      dispatch(closeNotifications())
    }
    if (genreOpen) {
      dispatch(closeGenre())
    }
  }
  // closeNotifications, closeGenre, closeShadowList, closeReport

  // shadowListOpen: false,
  //   reportOpen: false,
  //     notificationsOpen: false,
  //       genreOpen: false,

  return (
    <TouchableWithoutFeedback onPress={handlePress} disabled={
      !imageMenuOpen &&
      !shadowListOpen &&
      !reportOpen &&
      !notificationsOpen &&
      !genreOpen
    }>

      <View style={{ backgroundColor: "black", flex: 1, }}>
        <View style={styles.header}>
          <SettingsHeader />
        </View>
        <ScrollView>
          <View style={styles.mainContainer}>
            <TouchableWithoutFeedback>
              <ChangeProfileImg />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <TagsSettings />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <GenrePreferences />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <NotificationsSettings />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <ShadowList />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <ReportBug />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <SignInWithService />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <SignOut />
            </TouchableWithoutFeedback >
          </View >
        </ScrollView >
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 120,
    paddingBottom: 120,
    // top: -25,
    flexDirection: "column",
    marginHorizontal: 10
  },

  userIconWithTextContainer: {
    alignItems: "center", // centers items horizontally
    justifyContent: "start", // centers items vertically
    flexDirection: "row",
  },
  userImage: { width: 30, height: 30, borderRadius: 1000 },
  textContainer: {
    paddingLeft: 10,
  },
  notificationContainer: {
    marginHorizontal: 20,
    marginBottom: 40,
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

export default Settings;
