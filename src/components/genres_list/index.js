import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation, StackActions } from "@react-navigation/native";
import FollowUnfollowButton from "../follow_unfollow_button";
import Icon from "../icon";
import CustomText from "../text";
import GenreItem from "./GenreItem";

const GenresList = ({ results, setResults, setUserChoice }) => {
    const storedUserInfo = useSelector((state) => state.user.userInfo);

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.itemsContainer}>
                {results.map((item) => (
                    <GenreItem key={item.id} item={item} setUserChoice={setUserChoice} />
                ))}
            </View>
        </ScrollView>
    );
};

export default GenresList;

const styles = StyleSheet.create({
    scrollViewContainer: {
        paddingBottom: 20,
        // Adjust padding as needed
        //   paddingHorizontal: 10,
        alignItems: 'flex-start', // Align items at the start of the container
    },
    itemsContainer: {
        flexDirection: 'row', // Lay out items in a row
        flexWrap: 'wrap', // Allow items to wrap
    },
    userElement: {
        // Remove fixed width to allow automatic adjustment
        // Padding or margin can help manage spacing
        //  margin: 5,
        marginRight: 15,
        marginTop: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 20,
        flexShrink: 1, // Allow the item to shrink if necessary
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    itemText: {

        fontSize: 16,
        color: "white",
        // Padding can affect the size
        //  paddingHorizontal: 20,
        // paddingVertical: 5,
    },
});
