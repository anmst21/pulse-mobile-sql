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
import Switch from "../../components/switch";




const TagsSettings = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const { tags } = useSelector((state) => state.settings)



    return (


        <View style={styles.container}>
            <View style={styles.left}>
                <CustomText style={{ fontSize: 20 }}>
                    Tags
                </CustomText>
                <View style={styles.viewSpoty}>
                    <Icon name="tagsIcon" style={{ color: tags ? "#fff" : "transparent" }} />
                </View>

            </View>
            <Switch />
        </View>


    );
};

export default TagsSettings;

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
