import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Image, } from "expo-image";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { deleteImage, uploadImage } from "../../redux";
import Icon from "../icon";
import Animated, { Easing, useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

const ProfilePicture = ({ imageLink, userId, width }) => {
  const dispatch = useDispatch();
  const storedUserInfo = useSelector((state) => state.user.userInfo);
  const { status } = useSelector((state) => state.image);
  const [isLoading, setIsLoading] = useState(false);
  console.log("isLoading", status);


  const rotation = useSharedValue(0);

  // Define the animated style for the loader icon
  const spinningAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  // Start the spinning animation
  const startSpinning = () => {
    rotation.value = withRepeat(withTiming(360, { duration: 1000, easing: Easing.linear }), -1, false);
  };

  // Start the spinning animation when isLoading is true
  useEffect(() => {
    if (isLoading) {
      startSpinning();
    } else {
      rotation.value = 0;
    }
  }, [isLoading]);




  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const response = await fetch(result.assets[0].uri);
      const fileContent = await response.arrayBuffer();

      function removeBaseUrl(link) {
        if (imageLink) {
          const baseUrl =
            "https://my-photo-bucket-111.s3.us-east-2.amazonaws.com/";
          return link.replace(baseUrl, "");
        }
      }
      if (imageLink) {
        dispatch(deleteImage(removeBaseUrl(imageLink)));
      }
      //   setImage(result.assets[0].uri);
      dispatch(
        uploadImage({
          blob: fileContent,
        })
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={storedUserInfo.id === userId ? pickImage : null}
      activeOpacity={storedUserInfo.id === userId ? 0.2 : 1}
    >
      <View style={[styles.container, { width: width, height: width }]}>
        {isLoading && <Animated.View style={[styles.loader, spinningAnimation]}>
          <Icon name="loaderIcon" />
        </Animated.View>}
        {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
        {imageLink ? (
          <Image
            source={{ uri: imageLink }}
            style={{ width: width, height: width, borderRadius: 1000 }}
            //  onLoadStart={() => setIsLoading(true)} // Handle load start
            onLoadStart={() => { setIsLoading(true) }} // Handle load end
            onLoad={() => { setIsLoading(false); console.log("ended") }}
          />
        ) : (
          <Icon name="profileIcon" style={{ width: 120, height: 120, color: "#3B3B3B" }} />
        )}

      </View>
    </TouchableOpacity>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    zIndex: 1000
  },

  container: {
    width: 250,
    height: 250,
    borderRadius: 1000,

    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});
