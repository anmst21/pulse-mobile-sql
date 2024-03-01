import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import CustomText from "../../components/text";

import { PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS,
    useAnimatedGestureHandler,
} from "react-native-reanimated";

import Icon from "../../components/icon";






const NotificationItem = ({ setActiveItem, isActive, item, handleAccept, handleDecline, handleSeen, storedUserInfo }) => {
    const calcWidth = item.type === "subscription_request" ? 255 : 150
    const translateX = useSharedValue(0);


    useEffect(() => {
        if (!isActive) { translateX.value = withSpring(0) }

    }, [isActive])

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = translateX.value;
            runOnJS(setActiveItem)(item.id)
            // activeItemId.value = item.id
            // console.log(activeItemId.value)
        },
        onActive: (event, ctx) => {

            let newX = ctx.startX + event.translationX;
            if (newX > 0) {
                newX = 0; // Prevent moving to the right from the initial position
            }
            translateX.value = newX;
        },
        onEnd: () => {

            // You can modify this logic as needed
            if (translateX.value < -100) { // Threshold for snapping
                translateX.value = withSpring(-calcWidth); // Snap to -255
            } else {
                translateX.value = withSpring(0); // Return to original position
            }
        },
    });
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
            //width: item.type === "subscription_request" ? 255 : 150
        };
    });



    const textSwitch = (item) => {
        switch (item.type) {
            case "follow":
                return (<View style={styles.textComponent}>
                    <CustomText>{item.username}</CustomText>
                    <CustomText style={styles.textMessage}>Now following you</CustomText>
                </View>
                );
            case "subscription_request":
                return (
                    <View style={styles.textComponent}>
                        <CustomText>{item.username}</CustomText>
                        <CustomText style={styles.textMessage}>
                            Sent you a subscription request

                        </CustomText>
                    </View>
                );
        }
    };

    const humanReadableDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);

        yesterday.setDate(today.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return "today";
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "yesterday";
        } else {
            // Here, you can format the date as desired for dates other than today and yesterday
            // For simplicity, this example returns the date in the format 'DD/MM/YYYY'
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        }
    };



    return <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.slidingContainer, animatedStyles]}>
            <View style={[styles.ctaBtn, { width: calcWidth }]}>
                {item.type === "subscription_request" &&
                    <TouchableOpacity onPress={() => { handleDecline(storedUserInfo.id, item.from_user_id, item.id) }}>
                        <Icon name="declineSubIcon" style={styles.ctaItem} />
                    </TouchableOpacity>}
                <TouchableOpacity onPress={() => { handleSeen(item.id) }}>
                    <Icon name="markSeenIcon" />
                </TouchableOpacity>
                {item.type === "subscription_request" &&
                    <TouchableOpacity onPress={() => { handleAccept(storedUserInfo.id, item.from_user_id, item.id) }}>
                        <Icon name="acceptSubIcon" />
                    </TouchableOpacity>}


            </View>
            <View style={styles.notificationContainer}>
                <View style={styles.userIconWithTextContainer}>
                    {item.image_link ? <Image source={{ uri: item.image_link?.medium }} style={styles.userImage} /> : <Icon name="profileIcon" style={{ width: 40, height: 40, color: "#808080" }} />}


                    {textSwitch(item)}
                </View>
                {/* <View style={styles.buttonContainer}>{buttonSwitch(item)}</View> */}
                <View style={styles.textContainer}>
                    <CustomText style={styles.dateText}>
                        {humanReadableDate(item.date)}
                    </CustomText>
                </View>
            </View>
        </Animated.View>
    </PanGestureHandler>

};
export default NotificationItem


const styles = StyleSheet.create({

    ctaBtn: {
        position: "absolute",
        left: "100%",
        flexDirection: "row",
        paddingHorizontal: 10,
        gap: 50,
        // width: 255,
        //  backgroundColor: "red",
        justifyContent: "center",
        height: "100%",
        alignItems: "center"

    },
    slidingContainer: {
        // position: "absolute",
        // flex: 1,
        // transform: "translateX(-100 %)"
        //left: -250,

        justifyContent: "center",

    },
    textMessage: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 14,
        // backgroundColor: "blue",
        position: "absolute",
        top: 30,

    },
    textComponent: {
        position: "relative",
        flex: 1,
        marginLeft: 20
    },
    dateText: {
        color: "rgba(255, 255, 255, 0.4)",
        fontSize: 12,
    },
    userIconWithTextContainer: {
        alignItems: "center", // centers items horizontally
        justifyContent: "start", // centers items vertically
        flexDirection: "row",
    },
    userImage: { width: 40, height: 40, borderRadius: 1000 },
    textContainer: {
        alignItems: "flex-end"
    },
    notificationContainer: {
        position: "relative",
        //  backgroundColor: "blue",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomColor: "rgba(250, 251, 254, 0.20)",
        borderWidth: 1,

    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 60,
        paddingHorizontal: 20,
        position: "absolute",
        top: 50,
        left: 0,
        right: 0,
        zIndex: 10,

    },
});