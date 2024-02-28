import { StyleSheet, View, ScrollView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import sqlApi from "../../redux/axios/sqlApi"

import CommentInput from './CommentInput';
import CommentComponent from './CommentComponent';


const PostComment = ({ userId, audio }) => {
    const [comments, setComments] = useState([]);
    const [replies, setReplies] = useState([]);
    const [activeReplyId, setActiveReplyId] = useState(null)

    useEffect(() => { fetchComments(audio.id, userId) }, [])

    useEffect(() => {
        if (activeReplyId !== null) {
            fetchReplies(activeReplyId, userId)
        } else {
            setReplies([])
        }
    }, [activeReplyId])



    const fetchComments = async (post_id, user_id) => {
        const response = await sqlApi.get(`/comments/${post_id}/${user_id}`);
        //  console.log("fetchComments", response.data.comments)

        setComments(response.data.comments)
    }
    const fetchReplies = async (post_id, user_id) => {
        const response = await sqlApi.get(`/replies/${post_id}/${user_id}`);
        //  console.log("fetchComments", response.data.comments)

        setReplies(response.data.replies)
    }


    const postComment = async (contents, user_id, post_id) => {
        const response = await sqlApi.post(`/comments`, { contents, user_id, post_id });
        //   console.log("fetchComments", response.data)

        setComments(prev => [response.data, ...prev])
    }
    const postReply = async (contents, user_id, post_id, parent_id) => {
        const response = await sqlApi.post(`/comments`, { contents, user_id, post_id, parent_id });
        console.log("13333", response.data)
        setReplies([response.data, ...(replies || [])]);
    }


    return (
        <View style={styles.comments}>

            <ScrollView style={{
                paddingBottom: 100
            }}>
                <CommentInput callback={(value, userId) => postComment(value, userId, audio.id)} />
                {comments.map((comment) => (
                    <View key={comment.id} style={{
                        marginBottom: 15,
                        //  backgroundColor: "yellow",
                        flexDirection: "column"
                    }}>
                        <CommentComponent comment={comment} setComments={setComments} setReply={setActiveReplyId} replyId={activeReplyId} />
                        {activeReplyId === comment.id && <View style={{
                            // backgroundColor: "red",
                            flex: 1,
                            marginHorizontal: 10
                        }}>
                            <ScrollView style={{
                                paddingBottom: 100
                            }}>
                                <CommentInput callback={(value, userId) => postReply(value, userId, audio.id, comment.id)} />
                                {replies && replies.map((comment) => (
                                    <View key={comment.id} style={{
                                        marginBottom: 15,
                                        //  backgroundColor: "yellow",
                                        flexDirection: "column",
                                    }}>
                                        <CommentComponent comment={comment} setComments={setReplies} setReply={setActiveReplyId} replyId={activeReplyId} />
                                    </View>
                                ))}

                            </ScrollView>

                        </View>}

                    </View>
                ))}
            </ScrollView>
        </View>



    )
}

export default PostComment

const styles = StyleSheet.create({
    edit: {
        position: "absolute",
        right: 100,
        top: 4
    },
    counter: {
        color: "grey",
        fontSize: 14,

    },
    btnContainer: {
        //  backgroundColor: "blue",
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        fontSize: 16,
        marginVertical: 10,
        color: "white"
    },
    like: { position: "absolute", right: 10, top: 3, alignItems: "center", flexDirection: "row", gap: 7 },
    repost: { position: "absolute", right: 140, top: 3, alignItems: "center", flexDirection: "row", gap: 7 },
    likeText: { fontSize: 16 },
    comments: {
        // right: 100,
        height: 400,
        // backgroundColor: "blue",
        // bottom: -40
    },

    postHeader: {
        flexDirection: "row",
        alignItems: "center"
    },
    commentsTrashIcon: {
        zIndex: 9999,
        right: 70,
        top: 13,
        borderRadius: 10,

        alignItems: "center",
        justifyContent: "center",
        position: "absolute"
    },
    commentContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: "rgba(31, 32, 34, 0.2)",
        borderRadius: 5,
    },

})