import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
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


const UpvoteDownvote = ({ audio, userId, setAudioList, id, dateCreated, setOpenComments, toggleIsActive, upvotes, downvotes }) => {
    const [voteType, setVoteType] = useState(audio.vote_type)

    //useEffect(() => { setVoteType(audio.vote_type) }, [])

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

                        // Update upvotes/downvotes based on the action and responseVoteType
                        if (responseVoteType === true && action === "add") {
                            updatedAudio.upvotes = (updatedAudio.upvotes || 0) + 1;
                            setVoteType(true); // Set vote_type to true for upvote
                        } else if (responseVoteType === true && action === "update") {
                            updatedAudio.upvotes = (updatedAudio.upvotes || 0) + 1;
                            updatedAudio.downvotes = Math.max(0, (updatedAudio.downvotes || 0) - 1);
                            setVoteType(true); // Update vote_type to true for upvote
                        } else if (responseVoteType === false && action === "add") {
                            updatedAudio.downvotes = (updatedAudio.downvotes || 0) + 1;
                            setVoteType(false); // Set vote_type to false for downvote
                        } else if (responseVoteType === false && action === "update") {
                            updatedAudio.downvotes = (updatedAudio.downvotes || 0) + 1;
                            updatedAudio.upvotes = Math.max(0, (updatedAudio.upvotes || 0) - 1);
                            setVoteType(false); // Update vote_type to false for downvote
                        } else if (responseVoteType === null) {
                            // Remove vote
                            if (vote_type === true) {
                                updatedAudio.upvotes = Math.max(0, (updatedAudio.upvotes || 0) - 1);
                            } else if (vote_type === false) {
                                updatedAudio.downvotes = Math.max(0, (updatedAudio.downvotes || 0) - 1);
                            }
                            setVoteType(null)

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


    console.log("audio.userVoteStatus", audio.vote_type)

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => postVote(userId, id, true)}>
                <View style={styles.minibox}>
                    <View style={styles.arrowIcon}>
                        <Icon name="upvoteIcon" style={{ color: voteType === true ? "#14AD4D" : "grey" }} />
                    </View>
                    <CustomText style={styles.text}>{upvotes}</CustomText>

                </View>
            </TouchableOpacity>
            <View style={styles.lineHorizontal} />
            <TouchableOpacity onPress={() => postVote(userId, id, false)}>
                <View style={styles.minibox}>
                    <View style={styles.arrowIcon}>
                        <Icon name="downvoteIcon" style={{ color: voteType === false ? "#F53535" : "grey" }} />
                    </View>
                    <CustomText style={styles.text}>{downvotes}</CustomText>

                </View >
            </TouchableOpacity>





            {/* <View style={styles.bookMark}>
                <Icon name="bookMark" />

            </View> */}

            {/* <View style={styles.dateContainer}>
                <CustomText style={styles.date}>{humanReadableDate(dateCreated)}</CustomText>

            </View> */}
        </View >
    )
}

export default UpvoteDownvote

const styles = StyleSheet.create({

    arrowIcon: {
        right: 30,
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
        width: 1,
        backgroundColor: "#2D2B32",
        height: 40
    },
    minibox: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        //  backgroundColor: "blue",

        paddingLeft: 10,
        flex: 1,
        width: 60,
        justifyContent: "center",
        height: 40
    },
    text: { fontSize: 14 },
    container: {


        width: 121,
        height: 40,
        borderColor: "#2D2B32",
        borderWidth: 2,
        justifyContent: "space-between",
        borderRadius: 100,
        flexDirection: "row",
        // paddingHorizontal: 12,
        alignItems: "center"
    },
})