import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import ProfilePicture from "../../components/profile_picture";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/text";
import sqlApi from "../../redux/axios/sqlApi"
import Icon from "../../components/icon"

const ChangeProfileImg = ({ userAudios, userInfo, userId, storedUserInfo }) => {


    return (

        <View style={styles.container}>


        </View>


    );
};

export default ChangeProfileImg;

const styles = StyleSheet.create({



    container: {

        flexDirection: "row",
        marginLeft: 0,
        backgroundColor: "rgba(31, 32, 34, 0.4)",
        paddingHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 20,
        paddingBottom: 120,

        marginBottom: 20,
    },

});
