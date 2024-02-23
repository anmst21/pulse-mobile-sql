import React, { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, StyleSheet, } from "react-native";
import sqlApi from "../../redux/axios/sqlApi";
import UsersList from "../user_list";
import { debounce } from 'lodash';

import Icon from "../icon";
import GenresList from "../genres_list"
import { fetchGenres, fetchTags } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import RenderSkeleton from "../render_skeleton";
import CustomText from "../text";


const AsyncSearch = ({ search, tags, setUserChoice }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [list, setList] = useState([])
  const { genreList } = useSelector(state => state.settings.genreList)
  const { tags: activeIds, tagsList } = useSelector(state => state.pulseRecording)
  console.log("genreListgenreListgenreList", genreList);
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [showInitial, setShowInitial] = useState(true)

  useEffect(() => {
    if (query.length === 0) {
      setShowInitial(true)
    } else {
      setShowInitial(false)
    }
  }, [query])




  const throttledSearch = useCallback(
    debounce(async (searchQuery) => {
      setIsLoading(true);
      try {
        const loggedInUserId = await AsyncStorage.getItem("userId");

        let response;
        if (search) {
          response = await sqlApi.get(`/search/profiles`, {
            params: {
              searchQuery,
              loggedInUserId
            }
          });
        } else if (tags) {
          console.log("1111111", activeIds)

          response = await sqlApi.post(`/search/post/genres`, {

            searchQuery,
            activeIds: activeIds,
          });
        } else {
          response = await sqlApi.get(`/search/genres`, {
            params: {
              searchQuery,
              loggedInUserId
            }
          });
        }
        setResults(response.data);
        console.log("ssssssssss", response.data)
      } catch (error) {
        console.error("Error searching: ", error);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    [setResults, setIsLoading]
  );
  const fetchInitialProfiles = async () => {
    setIsLoading(true);

    try {
      const loggedInUserId = await AsyncStorage.getItem("userId");
      let response
      if (search) {
        response = await sqlApi.get(
          `/search/fetchInitialProfiles?loggedInUserId=${loggedInUserId}`
        );
        setResults(response.data);

      } else if (tags) {
        dispatch(fetchTags({ activeIds }))
      } else {
        dispatch(fetchGenres())
      }
      setIsLoading(false);

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
          onSubmitEditing={() => throttledSearch(query)}
        />
        {results.length === 0 && query.length !== 0 && !isLoading && <View style={{
          // backgroundColor: "blue",
          alignItems: "center",
          justifyContent: "center",
          height: 40,
          position: "absolute",
          width: "100%",
          bottom: -70
        }}><CustomText>No Results</CustomText></View>}
      </View>
      {search && <UsersList results={results} setResults={setResults} />}
      {!search && isLoading &&
        // <GenresList setUserChoice={setUserChoice} results={query.length !== 0 ? results : genreList} setResults={setResults} />
        <RenderSkeleton name="genreList" />
      }
      {!search && !isLoading && showInitial && !tags &&
        <GenresList setUserChoice={setUserChoice} results={genreList} setResults={setResults} />
      }
      {!search && !isLoading && !showInitial && !tags &&
        <GenresList setUserChoice={setUserChoice} results={results} setResults={setResults} />
      }
      {tags && !isLoading && showInitial &&
        <GenresList tags setUserChoice={setUserChoice} results={tagsList} setResults={setResults} />
      }
      {tags && !isLoading && !showInitial &&
        <GenresList tags setUserChoice={setUserChoice} results={results} setResults={setResults} />
      }


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
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
