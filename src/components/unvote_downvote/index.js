import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../text'
import Icon from '../icon'

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


const UpvoteDownvote = ({ dateCreated }) => {
    return (
        <View style={styles.container}>
            <View style={styles.minibox}>
                <Icon name="upvoteIcon" />
                <CustomText style={styles.text}>14</CustomText>
            </View>
            <View style={styles.lineHorizontal} />
            <View style={styles.minibox}>
                <Icon name="downvoteIcon" />
                <CustomText style={styles.text}>14</CustomText>
            </View >
            <View style={styles.message}>
                <Icon name="messageIcon" />

            </View>
            {/* <View style={styles.bookMark}>
                <Icon name="bookMark" />

            </View> */}
            <View style={styles.dotMenu}>
                <Icon name="dotMenu" />

            </View>
            <View style={styles.dateContainer}>
                <CustomText style={styles.date}>{humanReadableDate(dateCreated)}</CustomText>

            </View>
        </View>
    )
}

export default UpvoteDownvote

const styles = StyleSheet.create({
    dateContainer: {

        position: "absolute",
        right: -230,

        alignItems: "center",
        justifyContent: "center",
        borderColor: "#2D2B32",

        borderRadius: 100,
    },
    date: {
        fontSize: 14,
        color: "rgba(225,255,255, 0.3)"
    },
    dotMenu: {
        width: 40,
        height: 40,
        position: "absolute",
        right: -240,
        bottom: 120,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#2D2B32",

        borderRadius: 100,
    },
    bookMark: {
        width: 40,
        height: 40,
        position: "absolute",
        right: -240,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#2D2B32",
        borderWidth: 2,
        borderRadius: 100,
    },
    message: {
        width: 40,
        height: 40,
        position: "absolute",
        right: -60,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#2D2B32",
        borderWidth: 2,
        borderRadius: 100,
    },

    lineHorizontal: {
        width: 1,
        backgroundColor: "#2D2B32",
        height: 40
    },
    minibox: { flexDirection: "row", alignItems: "center", },
    text: { fontSize: 14 },
    container: {
        width: 120,
        height: 40,
        borderColor: "#2D2B32",
        borderWidth: 2,
        justifyContent: "space-between",
        borderRadius: 100,
        flexDirection: "row",
        paddingHorizontal: 12,
        alignItems: "center"
    },
})