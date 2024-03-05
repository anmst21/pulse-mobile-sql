import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomText from '../text'
import Icon from '../icon'
import sqlApi from "../../redux/axios/sqlApi"
import { toggleUpvote } from '../../redux'
import { useDispatch } from 'react-redux'
import { BlurView } from 'expo-blur';


//setOpenComments
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


const UpvoteDownvote = ({ audio, id, upvotes, downvotes }) => {
    const dispatch = useDispatch()
    const [vote, setVote] = useState(audio.vote_type)

    const handleUpvote = (type) => {
        if (type) {
            if (audio.vote_type === true) {
                setVote(null)
            } else {
                setVote(true)

            }
            dispatch(toggleUpvote({ postId: id, voteType: true }))
        }
        if (!type) {
            if (audio.vote_type === false) {
                setVote(null)
            } else {
                setVote(false)

            }
            dispatch(toggleUpvote({ postId: id, voteType: false }))
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handleUpvote(true)}>
                <View style={[styles.minibox, {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    overflow: "hidden"
                }]}>
                    <BlurView intensity={vote === true ? 50 : 10} style={styles.blurBackground} />
                    <View style={styles.arrowIcon}>
                        <Icon name="upvoteIcon" style={{ color: vote === true ? "#14AD4D" : "grey" }} />
                    </View>
                    <CustomText style={styles.text}>{upvotes}</CustomText>

                </View>
            </TouchableOpacity>
            {/* <View style={styles.lineHorizontal} /> */}
            <BlurView intensity={70} style={styles.lineHorizontal} />

            <TouchableOpacity onPress={() => handleUpvote(false)}>
                <View style={[styles.minibox, {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    overflow: "hidden"
                }]}>
                    <BlurView intensity={vote === false ? 50 : 10} style={styles.blurBackground} />

                    <View style={styles.arrowIcon}>
                        <Icon name="downvoteIcon" style={{ color: vote === false ? "#F53535" : "grey" }} />
                    </View>
                    <CustomText style={styles.text}>{downvotes}</CustomText>

                </View >
            </TouchableOpacity>
        </View >
    )
}

export default UpvoteDownvote

const styles = StyleSheet.create({
    blurBackground: {

        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,

    },
    arrowIcon: {
        right: 25,
        position: "absolute"
    },
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


    lineHorizontal: {
        width: 2,
        //   backgroundColor: "#2D2B32",
        height: 40
    },
    minibox: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 100,
        // backgroundColor: "blue",

        paddingLeft: 10,
        flex: 1,
        width: 60,
        justifyContent: "center",
        height: 40
    },
    text: { fontSize: 14, left: 5, },
    container: {


        width: 122,
        height: 40,
        backgroundColor: "rgba(31, 32, 34, 0.6)",

        justifyContent: "space-between",
        borderRadius: 100,
        flexDirection: "row",
        // paddingHorizontal: 12,
        alignItems: "center"
    },
})