import { StyleSheet, View, TouchableOpacity, Text, ScrollView, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import ProfilePicture from "../../components/profile_picture";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/text";
import sqlApi from "../../redux/axios/sqlApi"
import Icon from "../../components/icon"
import Button from "../../components/button";

const ChangeProfileImg = ({ userAudios, userInfo, userId, storedUserInfo }) => {
    const [userName, setUserName] = useState("")
    const [linkName, setLinkName] = useState("")
    const [link, setLink] = useState("")
    const [userBio, setUserInfo] = useState("")

    return (

        <View style={styles.container}>
            <View style={{
                flexDirection: "row",
                //  backgroundColor: "blue",
                alignItems: "center",
                gap: 10

            }}>
                <View style={[styles.commentContainer, { flex: 1 }]}>
                    <CustomText style={styles.inputLabel}>
                        User Name
                    </CustomText>
                    <TextInput
                        style={styles.input}
                        placeholder="User Name..."
                        value={userName}
                        onChangeText={text => setUserName(text)} // Update the state on input change
                        placeholderTextColor="gray"
                        multiline
                        maxLength={16}
                    />
                    <CustomText style={styles.counter}>
                        {userName.length} / 16
                    </CustomText>
                </View>
                <Icon name="pencilEdit" style={{ fill: "transparent", width: 16 }} />

            </View>
            <View style={styles.link}>
                <View style={{
                    flexDirection: "row",
                    //  backgroundColor: "blue",
                    alignItems: "center",
                    gap: 10,
                    flex: 2.5

                }}>

                    <Icon name="linkIcon" style={{ color: "#ABABAB", width: 20, }} />
                    <View style={{ flexDirection: "row", flex: 1 }}>
                        <View style={[styles.commentContainer, {
                            borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 1, flex: 1
                        }]}>
                            <CustomText style={styles.inputLabel}>
                                Link
                            </CustomText>
                            <TextInput
                                style={styles.input}
                                placeholder="Title..."
                                value={linkName}
                                onChangeText={text => setLinkName(text)} // Update the state on input change
                                placeholderTextColor="gray"
                                multiline
                                maxLength={14}
                            />
                            <CustomText style={styles.counter}>
                                {linkName.length} / 14
                            </CustomText>
                        </View>

                        <View style={[styles.commentContainer, { flex: 1, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}>

                            <TextInput
                                style={styles.input}
                                placeholder="URL..."
                                value={link}
                                onChangeText={text => setLink(text)} // Update the state on input change
                                placeholderTextColor="gray"
                                multiline
                                maxLength={30}
                            />
                            <CustomText style={styles.counter}>
                                {link.length} / 30
                            </CustomText>
                        </View>
                    </View>
                    <Icon name="pencilEdit" style={{ fill: "transparent", width: 16 }} />
                </View>
            </View>
            <View style={{
                flexDirection: "row",
                //  backgroundColor: "blue",
                alignItems: "center",
                gap: 10

            }}>
                <Icon name="zapIcon" style={{ color: "#ABABAB", width: 20, }} />
                <View style={[styles.commentContainer, { height: 100, flex: 1 }]}>
                    <CustomText style={styles.inputLabel}>
                        Bio
                    </CustomText>
                    <TextInput
                        style={styles.input}
                        placeholder="Bio..."
                        value={userBio}
                        onChangeText={text => setUserInfo(text)} // Update the state on input change
                        placeholderTextColor="gray"
                        multiline
                        maxLength={240}
                    />
                    <CustomText style={styles.counter}>
                        {userBio.length} / 240
                    </CustomText>
                </View>
                <Icon name="pencilEdit" style={{ fill: "transparent", width: 16 }} />

            </View>

        </View >


    );
};

export default ChangeProfileImg;

const styles = StyleSheet.create({
    inputLabel: {
        position: "absolute",
        top: -20,
        fontSize: 12
    },
    link: {
        flexDirection: "row",
        //  marginTop: 10
        //  backgroundColor: "blue"
    },
    btnContainer: {
        //  backgroundColor: "blue",
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: "center"
    },
    counter: {
        color: "rgba(31, 32, 34, 1)",
        fontSize: 12,
        position: "absolute",
        bottom: -20,
        right: 0

    },
    input: {
        fontSize: 14,
        lineHeight: 22, color: "white",
        alignItems: "center",
        //   width: '100%',
        top: 2

    },
    commentContainer: {

        //  marginTop: 20,
        //  padding: 10,
        //  marginHorizontal: 20,
        backgroundColor: "rgba(31, 32, 34, 0.5)",
        height: 40,
        borderRadius: 5,
        //  justifyContent: "center",
        paddingHorizontal: 10,
        //  paddingBottom: 20
    },

    container: {
        gap: 30,
        paddingTop: 60,
        paddingHorizontal: 20,
        flexDirection: "column",
        marginLeft: 0,
        backgroundColor: "rgba(31, 32, 34, 0.4)",
        // paddingHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 20,
        paddingBottom: 40,

        marginBottom: 20,
    },

});
