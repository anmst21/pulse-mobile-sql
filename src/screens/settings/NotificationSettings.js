import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Button from '../../components/button'
import CustomText from '../../components/text'
import Icon from '../../components/icon'
import AsyncSearch from '../../components/async_search'
import { useDispatch, useSelector } from "react-redux";
import {
    openNotifications, closeNotifications, togglePosts,
    toggleFollows,
    toggleUpvotes,
    toggleComments,
    toggleReplies,
    toggleMentions
} from "../../redux"
import NotificationSetting from '../../components/notification_setting'

const NotificationsSettings = () => {
    const dispatch = useDispatch()
    const { notificationsOpen } = useSelector((state) => state.settings);
    const { posts, follows, upvotes, comments, replies, mentions } = useSelector((state) => state.settings.notificationsState);



    const notificationsList = [
        { id: 1, title: "New Posts", icon: "pulseIcon", callback: () => dispatch(togglePosts()), bool: posts },
        { id: 2, title: "Follows", icon: "followIcon", callback: () => dispatch(toggleFollows()), bool: follows },
        { id: 3, title: "Upvotes", icon: "upvoteIcon", callback: () => dispatch(toggleUpvotes()), bool: upvotes },
        { id: 4, title: "Comments", icon: "messageIcon", callback: () => dispatch(toggleComments()), bool: comments },
        { id: 5, title: "Replies", icon: "repostIcon", callback: () => dispatch(toggleReplies()), bool: replies },
        { id: 6, title: "Mentions", icon: "hashtagIcon", callback: () => dispatch(toggleMentions()), bool: mentions },
    ];


    return (
        <View style={[styles.topContiner, {
            height: notificationsOpen ? 340 : null, backgroundColor: notificationsOpen ? "rgba(31, 32, 34, 0.4)" : "transparent",
        }]}>
            <TouchableOpacity onPress={() => {
                notificationsOpen
                    ? dispatch(closeNotifications())
                    : dispatch(openNotifications())
            }}>

                <View style={[styles.container]}>
                    <View style={styles.left}>

                        <Icon name="notification" style={{ width: 24, height: 24, lineWidth: 2, fill: notificationsOpen && "#fff" }} />

                        <CustomText style={{ fontSize: 20 }}>
                            Notifications
                        </CustomText>
                    </View>
                    <View style={[styles.chevron, notificationsOpen && {
                        transform: [{ rotate: '180deg' }]
                    }]}><Icon name="chevronDown" style={{ width: 35 }} />
                    </View>
                </View>
            </TouchableOpacity>
            {notificationsOpen &&
                <ScrollView>
                    <View style={{
                        paddingTop: 20,

                    }}>
                        {notificationsList.map((item) => (
                            <NotificationSetting key={item.id} item={item} />
                        ))}
                    </View>
                </ScrollView>
            }
        </View>
    )
}

export default NotificationsSettings

const styles = StyleSheet.create({
    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    },
    topContiner: {

        // backgroundColor: "blue",
        borderRadius: 10,
        marginBottom: 20,


    },
    chevron: {
        height: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 5,
    },
    container: {
        flexDirection: "row",
        marginLeft: 0,
        backgroundColor: "rgba(31, 32, 34, 0.6)",
        paddingHorizontal: 15,
        borderRadius: 10,
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "space-between",
    },
})