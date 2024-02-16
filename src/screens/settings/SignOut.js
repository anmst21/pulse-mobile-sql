import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import CustomText from "../../components/text";
import Icon from "../../components/icon";
import InAppBrowser from "react-native-inappbrowser-reborn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../../config";
import Button from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../redux";




const SignOut = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()




    return (


        <View style={styles.container}>
            <View style={styles.left}>
                <Icon name="logOutIcon" style={{ width: 24, height: 24, lineWidth: 2, }} />

                <CustomText style={{ fontSize: 20 }}>
                    Log Out
                </CustomText>


            </View>
            <Button
                label={"Disconnect"}
                grey
                onPressIn={() => {
                    dispatch(signout());
                    navigation.goBack();
                }}
            />
        </View>


    );
};

export default SignOut;

const styles = StyleSheet.create({
    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    },

    container: {
        flexDirection: "row",
        marginLeft: 0,
        backgroundColor: "rgba(31, 32, 34, 0.6)",
        paddingHorizontal: 15,
        borderRadius: 10,
        paddingVertical: 5,

        justifyContent: "space-between",
        marginBottom: 20,
    },
});
