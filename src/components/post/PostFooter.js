import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { humanReadableDate } from '../../utils/humanReadableDate'
import CustomText from '../text'
import UpvoteDownvote from '../unvote_downvote'
import Icon from '../icon'

const PostFooter = ({ audio, seen }) => {
    return (
        <View style={styles.upvoteDownvote}>
            <UpvoteDownvote

                id={audio.id}
                audio={audio}
                upvotes={audio.upvotes}
                downvotes={audio.downvotes}

            />



            <View style={[styles.message, { backgroundColor: "transparent" }]} >
                <View style={[styles.commentsCount, {
                    backgroundColor: "transparent", top: -1,
                    right: -2,
                }]}>
                    <CustomText
                        style={{
                            fontSize: 10,
                            color: "rgba(225,255,255, 0.3)"
                        }}>
                        {seen}
                    </CustomText>
                </View>


                <Icon
                    name="seenIcon"
                    style={{
                        width: 24,
                        color: "rgba(225,255,255, 0.3)"
                    }}
                />

            </View>
            <View style={styles.dateContainer}>
                <CustomText style={styles.date}>{humanReadableDate(audio.date_created)}</CustomText>

            </View>

        </View>
    )
}

export default PostFooter

const styles = StyleSheet.create({
    date: {
        fontSize: 12,
        color: "rgba(225,255,255, 0.3)"
    },
    dateContainer: {

        position: "absolute",
        right: 10,
        top: 35,

        alignItems: "center",
        justifyContent: "center",
        borderColor: "#2D2B32",

        borderRadius: 100,
    },
    commentsCount: {
        backgroundColor: "white",
        position: "absolute",
        paddingLeft: 0,
        top: -5,
        right: -4,
        width: 16,
        height: 16,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
    },
    message: {
        width: 40,
        height: 40,
        backgroundColor: "rgba(31, 32, 34, 0.8)",

        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
    },
    upvoteDownvote: {
        marginBottom: 30,
        alignItems: "center",
        flexDirection: "row",
        gap: 15,
        justifyContent: "space-between",
        paddingRight: 5
    },
})