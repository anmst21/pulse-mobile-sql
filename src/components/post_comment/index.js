import { StyleSheet, View, ScrollView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import sqlApi from "../../redux/axios/sqlApi"
import CustomText from '../text';
import CommentInput from './CommentInput';
import CommentComponent from './CommentComponent';
import RectBtn from '../rect_btn';


const PostComment = ({ userId, audio, close }) => {
    const [comments, setComments] = useState([]);
    const [replies, setReplies] = useState([]);
    const [activeReplyId, setActiveReplyId] = useState(null)
    const [containerWidth, setContainerWidth] = useState(100)

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
    const onEditorLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width || 100)
        console.log("hhh", width)
    };



    return (
        <View style={styles.comments} onLayout={onEditorLayout}>
            <View style={{
                flexDirection: "row",
                // backgroundColor: "blue",
                position: "absolute", top: 30,
                zIndex: 9999,
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between"
            }}>
                <CustomText style={{ fontSize: 40, }}>Comments</CustomText>
                <RectBtn name="minus" callback={() => close()} />
            </View>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{

            }}>
                <View style={{
                    marginTop: 100
                }}>
                    <CommentInput containerWidth={containerWidth} callback={(value, userId) => postComment(value, userId, audio.id)} />
                </View>
                {comments.map((comment) => (
                    <ScrollView key={comment.id} showsVerticalScrollIndicator={false} style={{
                        paddingTop: 100,
                    }}>
                        <View style={{

                            //  backgroundColor: "yellow",
                            flexDirection: "column",
                        }}>
                            <CommentComponent containerWidth={containerWidth} comment={comment} setComments={setComments} setReply={setActiveReplyId} replyId={activeReplyId} />
                            {activeReplyId === comment.id && <View style={{
                                // backgroundColor: "red",
                                flex: 1,

                            }}>

                                <CommentInput reply callback={(value, userId) => postReply(value, userId, audio.id, comment.id)} />
                                <View style={{
                                    paddingBottom: 150
                                }}>
                                    {replies && replies.map((comment) => (
                                        <View key={comment.id} style={{

                                            //  backgroundColor: "yellow",
                                            flexDirection: "column",
                                        }}>
                                            <CommentComponent reply comment={comment} setComments={setReplies} setReply={setActiveReplyId} replyId={activeReplyId} />
                                        </View>
                                    ))}
                                </View>



                            </View>}

                        </View>
                    </ScrollView>
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
        //  top: -30,
        flex: 1,
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