import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollV, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../config";
import axios from "axios";
import * as Location from 'expo-location';
import { debounce } from 'lodash';
import { setLocData } from "../../redux";


import CustomText from "../text";

import Icon from "../icon";
import Theme from "../../styles/theme";


const RecordingEditor = () => {
  const { name, district: dist, lat, lng } = useSelector((state) => state.pulseRecording);
  const [value, setValue] = useState(name)
  const [district, setDistrict] = useState(dist)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])

  const dispatch = useDispatch()

  useEffect(() => { value.length === 0 && setDistrict("") }, [value])


  const throttledSearch = useCallback(
    debounce(async (searchQuery) => {
      try {
        setIsLoading(true);

        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json`, {
          params: {
            access_token: config.mapBoxToken,
            autocomplete: true,
            limit: 10,
            proximity: location && location.coords.longitude + ',' + location.coords.latitude
          },
        });

        setResults(response.data.features);

        setIsLoading(false);
      } catch (error) {
        console.error("Error searching: ", error);
      }
    }, 500),
    [setResults, setIsLoading]
  );


  const setName = (address) => {
    const lastCommaIndex = address.lastIndexOf(',');
    const beforeLastComma = address.substring(0, lastCommaIndex).trim();
    const afterLastComma = address.substring(lastCommaIndex + 1).trim();
    return [beforeLastComma, afterLastComma]
  }
  // const setCity = (city) => {
  //   const parts = city.split(',');
  //   if (parts.length > 2) {
  //     let result = parts.slice(2, 3).join(',');
  //     result.split(" ");
  //     result.slice(0, -1)
  //     return result[0a]
  //   }
  // }

  const findLocationAddress = async (lng, lat) => {


    try {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json`, {
        params: {
          access_token: config.mapBoxToken,
          autocomplete: true,
          //limit: 10,
          proximity: lng + ',' + lat
        },
      });
      const data = response.data;
      console.log("lnglat", data.features[1].place_name)

      if (data.features && data.features.length > 0) {
        let placeName = data.features[0].place_name; // Get the most relevant address
        let district = data.features[1].place_name
        // Cut everything after the second comma

        placeName = setName(placeName)[0]
        const districtParts = district.split(',');
        setValue(placeName);
        setDistrict(districtParts[0])

        dispatch(setLocData({
          district: districtParts[0],
          lng,
          lat,
          name: placeName
        }))
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
    throttledSearch(text);
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


  // state.location = {
  //   place: action.place,
  //   coords: {
  //     lng: action.lng,
  //     lat: action.lat
  //   }
  // }
  return (
    <View style={styles.locationContainer}>
      <View style={{ flexDirection: "row" }}>
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
          onFocus={() => {
            setValue("");
            setDistrict("");
            //  setLocation("");
            setErrorMsg("")
          }}
        />
        <View style={{
          position: "absolute",
          left: 45,
          top: 30
        }}>
          {/* {location && <><CustomText >{location.coords.longitude}</CustomText>*/}
          <CustomText style={{
            fontSize: 16,
            color: "grey"
          }}>{district}</CustomText>

        </View>
      </View>
      <ScrollView style={{
        width: "100%",
        padding: 45,
        paddingTop: 20,
        height: 300,

      }}>
        <View style={{
          gap: 20,
          //  backgroundColor: "blue",
          paddingBottom: 100,
          right: 35
        }}>
          {results && results.map(result =>
            <TouchableOpacity key={result.id} onPress={() => {
              setValue(result.place_name)
              setDistrict(result.text)
              setResults([])
              dispatch(setLocData({
                district: result.text,
                lng: result.geometry.coordinates[0],
                lat: result.geometry.coordinates[1],
                name: result.place_name
              }))

            }}>
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 15
              }}>
                <Icon name="locPoint" style={{ width: 20 }} />
                <View >
                  <CustomText style={{ fontSize: 14 }}>{result.place_name}</CustomText>
                  <CustomText style={{ fontSize: 12, color: "grey" }}>{result.text}</CustomText>
                </View>

              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
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
    flexDirection: "column",
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

// {
//   "bbox": [32.234193, 39.618292, 33.167364, 40.22514],
//     "center": [32.854048, 39.920789],
//       "context": [
//         {
//           "id": "region.672996",
//           "mapbox_id": "dXJuOm1ieHBsYzpDa1Rr",
//           "short_code": "TR-06",
//           "text": "Ankara",
//           "wikidata": "Q2297724"
//         }, {
//           "id": "country.8932",
//           "mapbox_id": "dXJuOm1ieHBsYzpJdVE",
//           "short_code": "tr",
//           "text":
//             "Türkiye",
//           "wikidata": "Q43"
//         }
//], "geometry": {
//     "coordinates": [32.854048, 39.920789],
//       "type": "Point"
//   },
//   "id": "place.9898212",
//     "place_name": "Ankara, Ankara, Türkiye",
//       "place_type": ["place"],
//         "properties": {
//     "mapbox_id": "dXJuOm1ieHBsYzpsd2pr",
//       "wikidata": "Q3640"
//   },
//   "relevance": 1,
//     "text": "Ankara",
//       "type": "Feature"
// }