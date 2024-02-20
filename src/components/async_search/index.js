import React, { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, StyleSheet, } from "react-native";
import userApi from "../../redux/axios/sqlApi";
import throttle from "lodash/throttle";
import UsersList from "../user_list";
import Icon from "../icon";
import GenresList from "../genres_list"
import { fetchGenres } from "../../redux";
import { useDispatch, useSelector } from "react-redux";


const AsyncSearch = ({ search, setUserChoice }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [list, setList] = useState([])
  const { genreList } = useSelector(state => state.settings)
  console.log("genreListgenreListgenreList", genreList);
  const dispatch = useDispatch()

  const throttledSearch = useCallback(
    throttle(async (searchQuery) => {
      try {
        const loggedInUserId = await AsyncStorage.getItem("userId");

        ///search/genres
        let response

        if (search) {
          response = await userApi.get(`/search/profiles`, {
            params: {
              searchQuery,
              loggedInUserId
            }
          });
        } else {
          response = await userApi.get(`/search/genres`, {
            params: {
              searchQuery,
            }
          });
        }
        setResults(response.data);
      } catch (error) {
        console.error("Error searching: ", error);
      }
    }, 500),
    []
  );

  const fetchInitialProfiles = async () => {
    try {
      const loggedInUserId = await AsyncStorage.getItem("userId");
      let response
      if (search) {
        response = await userApi.get(
          `/search/fetchInitialProfiles?loggedInUserId=${loggedInUserId}`
        );
        setResults(response.data);
      } else {
        dispatch(fetchGenres())
      }

    } catch (error) {
      console.error("Error fetching initial profiles: ", error);
    }
  };

  const handleTextChange = (text) => {
    setQuery(text);
    throttledSearch(text);
  };

  useEffect(() => {
    fetchInitialProfiles()
  }, [])
  // <TextInput
  //   style={styles.input}
  //   placeholder="Enter a comment..."
  //   value={editValue}
  //   onChangeText={text => setEditValue(text)} // Update the state on input change
  //   placeholderTextColor="gray"
  //   multiline
  //   maxLength={240}
  // />

  return (
    <View style={styles.container}>
      <View style={{
        justifyContent: "center",
        position: "relative", // Ensures absolute positioning is relative to this container
        // borderColor: "rgba(137, 137, 137, 1)",
        // borderWidth: 1,
        borderRadius: 10,
        //  backgroundColor: "red"
      }}>
        <View style={{
          position: "absolute",
          right: 0, // 7 pixels from the right
          top: 0,
          bottom: 0,
          justifyContent: 'center', // Center the icon vertically
          //   backgroundColor: "blue",
          padding: 10, // Add some padding if necessary
          borderRadius: 10,

        }}>
          <Icon
            name="searchBar"
            style={{ strokeWidth: "1", width: 20 }}
          />
        </View>

        <TextInput
          style={
            styles.input
          }
          value={query}
          onChangeText={handleTextChange}
          placeholder={"Enter a " + (search ? "Username" : "Genre")}
          placeholderTextColor="rgba(137, 137, 137, 0.5)"
        //onFocus={fetchInitialProfiles}
        />
      </View>
      {search && <UsersList results={results} setResults={setResults} />}
      {!search && <GenresList setUserChoice={setUserChoice} results={query.length !== 0 ? results : genreList} setResults={setResults} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    flex: 1,
    flexDirection: "column",
    padding: 20,
    paddingBottom: 0,
    // backgroundColor: "blue",
  },
  input: {
    borderRadius: 5,

    height: 45,
    color: "white",


    // marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "rgba(31, 32, 34, 0.5)",
  },

});

export default AsyncSearch;
