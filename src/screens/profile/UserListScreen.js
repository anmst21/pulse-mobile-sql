import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import UsersList from "../../components/user_list";
import userApi from "../../redux/axios/userApi";
import { useSelector } from "react-redux";
import CustomText from "../../components/text";

const UserListScreen = ({ route }) => {
  const [results, setResults] = useState();
  const { listType, userId } = route.params;
  const [page, setPage] = useState(listType)
  console.log("pagepage", page)





  const { id: loggedInUserId } = useSelector((state) => state.user.userInfo);

  const fetchData = async (id) => {
    try {
      const response = await userApi.get(`/user/${userId.toString()}/${page}`, {
        params: { userId: id, loggedInUserId },
      });
      console.log("fetchData", response.data)
      setResults(response.data);
    } catch (e) {
      console.error(e);
    }
  };



  useEffect(() => {
    fetchData(userId);

  }, [userId, page]);

  const btn1 = () => {
    if (listType === "subscribers") {
      return "subscribers"
    } if (listType === "followers") { return "followers" }
  }
  const btn2 = () => {
    if (listType === "subscribing") {
      return "subscribing"
    } if (listType === "following") { return "following" }
  }

  return (
    <View style={styles.container}>
      {/* <CustomText style={styles.header}>{page}</CustomText> */}
      {listType === "followers" && <View style={styles.pageSwitch}>
        <Button
          title="Followers"
          onPress={() => { setPage("followers"); setResults() }}
          style={{ color: "black" }}
        />
        <Button
          title="Following"
          onPress={() => { setPage("following"); setResults() }}
        />
      </View>}

      {listType === "subscribers" && <View style={styles.pageSwitch}>
        <Button
          title="Subscribers"
          onPress={() => { setPage("suscribers"); setResults() }}
          style={{ color: "black" }}
        />
        <Button
          title="Subscribing"
          onPress={() => { setPage("subscribing"); setResults() }}
        />
      </View>}
      <UsersList results={results} setResults={setResults} />
    </View>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  pageSwitch: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center"
  },
  container: {
    marginTop: 40,
    marginHorizontal: 20
  },
  header: {
    color: "black"
  }
});
