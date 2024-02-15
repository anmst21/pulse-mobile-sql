import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import CustomText from "../../components/text";
import Icon from "../../components/icon";
import InAppBrowser from "react-native-inappbrowser-reborn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../../config";
import Button from "../../components/button";

const SignInWithService = () => {
  const [spotifyState, setSpotifyState] = useState(false);
  const openUrl = (url) => {
    InAppBrowser.isAvailable().then((isAvailable) => {
      if (isAvailable) {
        const browser = InAppBrowser.open(url, "_blank");

        // Add the event listener for the 'loadstart' event
        // browser.addEventListener("loadstart", (event) => {
        //   if (event.url.startsWith("pulse://callback")) {
        //     // Close the InAppBrowser if the URL starts with the custom scheme 'pulse://'
        //     browser.close();
        //   }
        // });
      } else {
        Linking.openURL(url);
      }
    });
  };


  // <TouchableOpacity
  //   onPress={() => {
  //     openUrl(
  //       config.apiURL + "spotify/login"
  //     );
  //     // openUrl("https://google.com");
  //   }}
  // >

  const checkSpotifyLogin = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      setSpotifyState(true);
    }
  };
  const logOutSpotify = async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");

    setSpotifyState(false);

  };
  useEffect(() => {
    checkSpotifyLogin();
  }, []);

  return (
    <View>
      {/* <View style={styles.container}>
        <CustomText style={{ fontSize: 24 }}>Sign In With Apple</CustomText>
        <TouchableOpacity>
          <View style={styles.viewApple}>
            <Icon name="appleIcon" style={{ width: 50, height: 50 }} />
          </View>
        </TouchableOpacity>
      </View> */}

      <View style={styles.container}>
        <View style={styles.left}>
          <CustomText style={{ fontSize: 20 }}>
            Spotify
          </CustomText>

          <View style={styles.viewSpoty}>
            <Icon name="spotifyIcon" style={{ width: 24, height: 24 }} />
          </View>
        </View>
        <Button
          label={spotifyState ? "Disconnect" : "Connect"}
          // iconRight="arrow_right"

          grey
          // status={player.edited}
          // loading={saving}
          onPressIn={() => {
            spotifyState ? logOutSpotify() :
              openUrl(
                config.apiURL + "spotify/login"
              );
            setSpotifyState(true)
            // openUrl("https://google.com");
          }}
        />
      </View>

    </View>
  );
};

export default SignInWithService;

const styles = StyleSheet.create({
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15
  },
  viewApple: {
    borderRadius: 20,
    width: 70,
    height: 70,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
  },
  container: {
    flexDirection: "row",
    marginLeft: 0,
    backgroundColor: "rgba(31, 32, 34, 0.4)",
    paddingHorizontal: 15,
    borderRadius: 10,
    paddingVertical: 5,

    justifyContent: "space-between",
    marginBottom: 20,
  },
});
