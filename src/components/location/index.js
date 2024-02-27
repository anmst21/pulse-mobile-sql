import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../config";
import axios from "axios";
import * as Location from 'expo-location';

import CustomText from "../text";

import Icon from "../icon";
import Theme from "../../styles/theme";

const RecordingEditor = () => {
  const player = useSelector((state) => state.player);
  const [value, setValue] = useState("East Village, New York City")
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  console.log("locloc", location)
  const findLocationAddress = async (lng, lat) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${config.mapBoxToken}`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      console.log("lnglat", data)

      if (data.features && data.features.length > 0) {
        const placeName = data.features[0].place_name;
        setValue(placeName);
      } else {
        setValue('Address not found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setValue('Failed to find address');
    }
  };
  const handleTextChange = (text) => {
    setValue(text);
    //   throttledSearch(text);
  };

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    findLocationAddress(currentLocation.coords.longitude, currentLocation.coords.latitude)
    setLocation(currentLocation);
  };
  return (
    <View style={styles.locationContainer}>
      <TouchableOpacity onPress={getLocationAsync} style={{
        width: 40,
        height: 40,
        // backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Icon name="map" style={{ stroke: Theme.purple }} />
      </TouchableOpacity>
      {/* <CustomText style={{ paddingLeft: 10, fontSize: 13 }}>
        {value}
      </CustomText> */}
      <TextInput
        style={
          styles.input
        }
        value={value}
        onChangeText={handleTextChange}
        placeholder={"Enter Adress"}
        placeholderTextColor="rgba(137, 137, 137, 0.5)"
        onFocus={() => setValue("")}
      />
      <View style={{
        backgroundColor: "blue",

      }}>
        {/* {location && <><CustomText >{location.coords.longitude}</CustomText>
          <CustomText >{location.coords.latitude}</CustomText></>} */}

      </View>
    </View>
  );
};

export default RecordingEditor;

const styles = StyleSheet.create({
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(255, 255, 255, 0.05)",
    position: "relative",
    flexDirection: "row",
  },
  input: {

    flex: 1,

    color: "white",
    //xbackgroundColor: "blue",

    // marginBottom: 10,
    paddingRight: 10,
    paddingLeft: 5
  },
});

//edit