import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import CustomText from '../text'
import Icon from '../icon'
import sqlApi from "../../redux/axios/sqlApi"

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


const UpvoteDownvote = ({ userId, setAudioList, id, dateCreated, setOpenComments, toggleIsActive, upvotes, downvotes }) => {


    const postVote = async (user_id, post_id, vote_type) => {
        try {
            const response = await sqlApi.post(`/vote`, { user_id, post_id, vote_type });
            const responseVoteType = response.data.vote_type;
            const action = response.data.action

            setAudioList((prevAudioList) => {
                return prevAudioList.map((audio) => {
                    // Find the audio record by post_id


                    if (audio.id === post_id) {
                        let updatedAudio = { ...audio };

                        if (responseVoteType === true && action === "add") {
                            // If vote_type was true, increment upvotes
                            updatedAudio.upvotes = (updatedAudio.upvotes || 0) + 1;
                        } else if (responseVoteType === true && action === "update") {
                            // If vote_type was true, increment upvotes
                            updatedAudio.upvotes = (updatedAudio.upvotes || 0) + 1;
                            updatedAudio.downvotes = Math.max(0, (updatedAudio.downvotes || 0) - 1);
                        } else if (responseVoteType === false && action === "add") {
                            // If vote_type was false, increment downvotes
                            updatedAudio.downvotes = (updatedAudio.downvotes || 0) + 1;
                        } else if (responseVoteType === false && action === "update") {
                            // If vote_type was false, increment downvotes
                            updatedAudio.downvotes = (updatedAudio.downvotes || 0) + 1;
                            updatedAudio.upvotes = Math.max(0, (updatedAudio.upvotes || 0) - 1);
                        } else if (responseVoteType === null) {
                            // If vote was removed, decrement the previously voted type
                            if (vote_type === true) {
                                // If original vote was an upvote, decrement upvotes
                                updatedAudio.upvotes = Math.max(0, (updatedAudio.upvotes || 0) - 1);
                            } else if (vote_type === false) {
                                // If original vote was a downvote, decrement downvotes
                                updatedAudio.downvotes = Math.max(0, (updatedAudio.downvotes || 0) - 1);
                            }
                        }
                        return updatedAudio;
                    }
                    return audio;
                });
            });
        } catch (error) {
            console.error("Error posting vote:", error);
            // Handle error appropriately
        }
    };




    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => postVote(userId, id, true)}>
                <View style={styles.minibox}>

                    <Icon name="upvoteIcon" />
                    <CustomText style={styles.text}>{upvotes}</CustomText>

                </View>
            </TouchableOpacity>
            <View style={styles.lineHorizontal} />
            <TouchableOpacity onPress={() => postVote(userId, id, true)}>
                <View style={styles.minibox}>
                    <Icon name="downvoteIcon" />
                    <CustomText style={styles.text}>{downvotes}</CustomText>
                </View >
            </TouchableOpacity>


            <View style={styles.message} >
                <TouchableOpacity onPress={() => { toggleIsActive(id); setOpenComments(prev => !prev) }}>
                    <Icon name="messageIcon" />
                </TouchableOpacity>

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
        </View >
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
    minibox: { flexDirection: "row", alignItems: "center" },
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