import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Image, } from "expo-image";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteImage, uploadImage, setImageLoader, setImageStatus, setImageMenuOpen } from "../../redux";
import Icon from "../icon";
import { manipulateAsync } from 'expo-image-manipulator';
import * as ImagePicker from "expo-image-picker";

import CustomText from "../text";

import Animated, { Easing, useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

const ProfilePicture = ({ imageLink, userId, width }) => {
  const dispatch = useDispatch();
  const storedUserInfo = useSelector((state) => state.user.userInfo);
  const isLoading = useSelector((state) => state.user.isLoadingImage);
  const { imageMenuOpen } = useSelector((state) => state.settings);


  const rotation = useSharedValue(0);

  const spinningAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const startSpinning = () => {
    rotation.value = withRepeat(withTiming(360, { duration: 1000, easing: Easing.linear }), -1, false);
  };

  useEffect(() => {
    if (isLoading) {
      startSpinning();
    } else {
      rotation.value = 0;
    }
  }, [isLoading]);




  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     const sizes = [
  //       { width: 500, height: 500, key: 'large' },
  //       { width: 120, height: 120, key: 'medium' },
  //       { width: 50, height: 50, key: 'small' },
  //     ];

  //     // Initialize the uploadObject with keys for each size, starting with null values
  //     let uploadObject = {
  //       small: null,
  //       medium: null,
  //       large: null,
  //     };

  //     // Resize and process images
  //     for (const size of sizes) {
  //       const resizedImage = await manipulateAsync(
  //         result.assets[0].uri,
  //         [{ resize: { width: size.width, height: size.height } }],
  //         { compress: 1, format: 'jpeg' }
  //       );
  //       const response = await fetch(resizedImage.uri);
  //       const fileContent = await response.arrayBuffer();

  //       // Assign the file content directly to the corresponding key in uploadObject
  //       uploadObject[size.key] = fileContent;
  //     }
  //     function removeBaseUrl(link) {
  //       if (imageLink) {
  //         const baseUrl =
  //           "https://my-photo-bucket-111.s3.us-east-2.amazonaws.com/";
  //         return link.replace(baseUrl, "");
  //       }
  //     }
  //     if (imageLink) {
  //       dispatch(deleteImage({
  //         keys: {
  //           small: removeBaseUrl(storedUserInfo.image_link.small),
  //           medium: removeBaseUrl(storedUserInfo.image_link.medium),
  //           large: removeBaseUrl(storedUserInfo.image_link.large),
  //         }
  //       }));
  //     }
  //     //   setImage(result.assets[0].uri);
  //     dispatch(
  //       uploadImage({
  //         blob: uploadObject,
  //         callback: (value) => dispatch(setImageStatus(value))
  //       })
  //     );
  //   }
  // };

  return (
    <TouchableOpacity
      // onPress={storedUserInfo.id === userId && width !== 250 ? pickImage : null}
      onPress={() => {

        imageMenuOpen && dispatch(setImageMenuOpen(false))
        !imageMenuOpen && dispatch(setImageMenuOpen(true))
      }}
      activeOpacity={storedUserInfo.id === userId && width !== 250 ? 0.2 : 1}
    >
      <View style={[styles.container, { width: width, height: width }]}>
        {width === 70 && <View style={styles.imageText}>
          <CustomText style={{
            fontSize: 8,
          }}>Edit</CustomText>
        </View>}
        {/* {imageMenuOpen && <View style={{
          backgroundColor: "blue",
          height: 100,
          width: 100,
          position: "absolute",
          bottom: -100,
          zIndex: 9999,

        }}>

        </View>} */}

        {isLoading && <Animated.View style={[styles.loader, spinningAnimation]}>
          <Icon name="loaderIcon" />
        </Animated.View>}
        {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
        {imageLink ? (
          <View style={{
            width: width, height: width, backgroundColor: "rgba(31, 32, 34, 0.6)",

          }}>
            {!isLoading && <Image
              source={{ uri: imageLink }}
              style={{ width: width, height: width, borderRadius: 1000 }}
              //  onLoadStart={() => setIsLoading(true)} // Handle load start
              onLoadStart={() => { setImageLoader(true) }} // Handle load end
              onLoad={() => { setImageLoader(false); console.log("ended") }}
            />}
          </View>
        ) : (

          !isLoading && <Icon name="profileIcon" style={{ width: width, height: width, color: "#3B3B3B" }} />

        )}

      </View>
    </TouchableOpacity>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  imageText: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 9999,
    backgroundColor: "rgba(31, 32, 34, 0.9)",
    alignItems: "center",
    paddingVertical: 3
  },
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
