import React, { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, StyleSheet } from "react-native";
import userApi from "../../redux/axios/sqlApi";
import throttle from "lodash/throttle";
import UsersList from "../user_list";

const AsyncSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  console.log("resultsresults", results);

  const throttledSearch = useCallback(
    throttle(async (searchQuery) => {
      try {
        const loggedInUserId = await AsyncStorage.getItem("userId");
        // Update the URL to use query parameters
        let response = await userApi.get(`/search/profiles`, {
          params: {
            searchQuery: searchQuery,
            loggedInUserId: loggedInUserId
          }
        });
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
      let response = await userApi.get(
        `/search/fetchInitialProfiles?loggedInUserId=${loggedInUserId}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching initial profiles: ", error);
    }
  };

  const handleTextChange = (text) => {
    setQuery(text);
    throttledSearch(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={handleTextChange}
        placeholder="Search products..."
        onFocus={fetchInitialProfiles}
      />
      <UsersList results={results} setResults={setResults} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
    backgroundColor: "transparent",
  },
  input: {
    height: 40,
    color: "white",
    borderColor: "#ccc",
    borderWidth: 1,

    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
  },
  button: {
    marginBottom: 10,
  },
});

export default AsyncSearch;
