import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import UsersList from "../../components/user_list";
import userApi from "../../redux/axios/userApi";
import { useSelector } from "react-redux";
import CustomText from "../../components/text";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedScrollHandler,
  withDelay,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Tab from "../../components/tab";


const UserListScreen = ({ route }) => {
  const [results, setResults] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { listType, userId } = route.params;
  const [page, setPage] = useState(listType)
  const opacity = useSharedValue(0);
  const scrollY = useSharedValue(0);
  console.log("pagepagepage", page)

  // const LoaderSkeleton = (<View style={styles.userElementLoader}></View>)

  const renderLoaderSkeletons = (count) => {
    return <View style={{ marginTop: 20 }}>{Array.from({ length: count }, (_, index) => (
      <View key={index} style={styles.userElementLoader} />

    ))}
    </View>
  }
  const noResults = <View style={styles.noResults}><CustomText>No Records Found</CustomText></View>

  const { id: loggedInUserId } = useSelector((state) => state.user.userInfo);

  const fetchData = async (id) => {
    setIsLoading(true); // Set isLoading to true before starting the request
    try {
      const response = await userApi.get(`/user/${userId}/${page}`, {
        params: { userId: id, loggedInUserId },
      });
      console.log("fetchData", response.data);
      setResults(response.data);
    } catch (e) {
      console.log(e);
      setResults(null)

    } finally {
      setIsLoading(false); // Set isLoading to false after the request is finished
    }
  };



  useEffect(() => {
    fetchData(userId);

  }, [userId, page]);


  const getAnimatedTabStyle = () => {
    return useAnimatedStyle(() => {
      return {
        opacity: opacity.value - scrollY.value / 100,
      };
    });
  };



  const tabs = [
    {
      title: listType === "followers" ? "Followers" : "Subscribers",
    },
    {
      title: listType === "followers" ? "Following" : "Subscribing",
    },

  ];

  const tabSwitch = (position, type) => {
    if (position === 1 && type === "followers") {
      setResults()
      setPage("followers")

    } else if (position === 2 && type === "followers") {
      setResults()
      setPage("following")
    } else if (position === 1 && type === "subscribers") {
      setResults()
      setPage("subscribers")
    } else if (position === 2 && type === "subscribers") {
      setResults()
      setPage("subscribing")
    }
  }



  return (
    <View style={styles.container}>
      {/* <CustomText style={styles.header}>{page}</CustomText> */}
      <View style={styles.list}>

        <View style={styles.tabContainer}>
          <Tab tabs={tabs} onTabChange={(position) => { tabSwitch(position, listType); console.log(position, listType) }} />
        </View>



        {/* {listType === "subscribers" && <View style={styles.pageSwitch}>
          <Button
            title="Subscribers"
            onPress={() => { setPage("subscribers"); setResults() }}
            style={{ color: "black" }}
          />
          <Button
            title="Subscribing"
            onPress={() => { setPage("subscribing"); setResults() }}
          />
        </View>} */}
      </View>
      {/* {renderLoaderSkeletons(5)}
      {<UsersList results={results} setResults={setResults} />} */}
      {!results && !isLoading || results?.length === 0 && noResults}
      <View style={styles.userListContainer}>
        {isLoading && renderLoaderSkeletons(5)}
        {!isLoading && results && <UsersList results={results} setResults={setResults} />}
      </View>


    </View >
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  userListContainer: {
    marginTop: 70
  },
  tabContainer: {
    position: "absolute",
    top: 40,
    flex: 1,
    left: -8,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9000,
    // backgroundColor: "blue"
  },
  pageSwitch: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center"
  },
  container: {
    flex: 1, // This makes the background fill the entire screen
    backgroundColor: 'black',
    position: "relative"
  },
  list: {
    marginTop: 40,
    marginHorizontal: 20


  },
  header: {
    color: "black"
  },
  userElementLoader: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 15,
    // marginHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5
    // paddingTop: 5,

  },
  noResults: {
    position: "absolute",
    top: "50%",
    bottom: "50%",
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
