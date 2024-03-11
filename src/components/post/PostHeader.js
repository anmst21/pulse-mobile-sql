import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import ProfilePicture from '../profile_picture'
import FollowUnfollowButton from '../follow_unfollow_button'
import { BlurView } from 'expo-blur'
import CustomText from '../text'
import { useNavigation, StackActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { switchTab } from "../../redux/slices/tabSlice";

import Theme from "../../styles/theme"


const PostHeader = ({ audio, userId }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();



    const handleUserNamePress = () => {
        userId !== audio.user_id
            ? navigation.push("UserProfileScreen", {
                id: audio.user_id,

            })
            : dispatch(
                switchTab({
                    name: "profile"
                })
            );
    }


    return (
        <View style={styles.postHeader}>
            {/* {audio?.user_id !== userId &&
                <View style={styles.dotMenu}>
                    <FollowUnfollowButton item={audio} post />
                </View>
            } */}
            <ProfilePicture userId={userId} imageLink={audio.image_link?.medium} width={30} />

            {(audio.bpm || audio.location) &&
                <View style={styles.geoBpm}>
                    <View style={{
                        overflow: "hidden",
                        borderRadius: 10
                    }}>
                        <BlurView intensity={40} style={{
                            padding: 10,
                            paddingBottom: 0
                        }} >
                            {audio.bpm &&
                                <CustomText style={styles.bpmText}>Bpm: {audio.bpm}</CustomText>
                            }
                            {audio.location &&
                                <CustomText style={[styles.bpmText, { color: Theme.purple }]}>{audio.location}</CustomText>
                            }
                        </BlurView>
                    </View>
                </View>}
            <View>
                <TouchableOpacity
                    onPress={handleUserNamePress}
                >
                    <CustomText
                        style={{
                            marginLeft: 10,
                            fontSize: 18
                        }}>
                        {audio.username}
                    </CustomText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PostHeader

const styles = StyleSheet.create({
    bpmText: {
        fontSize: 12,
        fontFamily: "london",
        color: Theme.green,
        marginBottom: 10
    },
    dotMenu: {
        right: 10,
        width: 40,
        height: 40,
        position: "absolute",
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#2D2B32",

        borderRadius: 100,
    },
    geoBpm: {
        position: "absolute",
        left: 0,
        top: 45,
        width: 150,
    },
    postHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
        marginTop: 30
    },
})