import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import sqlApi from "../../redux/axios/sqlApi"
import CustomText from "../../components/text";
import Icon from '../icon';
import Button from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { lowerFirst } from 'lodash';
import ProfilePicture from '../profile_picture';
import CommentInput from './CommentInput';
import { useNavigation, StackActions } from "@react-navigation/native";
import { switchTab } from '../../redux';
import { humanReadableDate } from '../../utils/humanReadableDate';
import { PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS,
    useAnimatedGestureHandler,
} from "react-native-reanimated";







const CommentComponent = ({ comment, setComments, setReply, replyId, reply }) => {
    const [editValue, setEditValue] = useState("")
    const [isEdited, setIdEdited] = useState(false)
    const [isActiveComment, setIsActiveComment] = useState(null)


    const storedUserInfo = useSelector((state) => state.user?.userInfo);
    const navigation = useNavigation();
    const dispatch = useDispatch()





    const putComment = async (post_id, contents) => {
        try {
            const response = await sqlApi.put(`/comments/${post_id}/${contents}`);
            const updatedComment = response.data.updatedComment;
            setIdEdited(false);
            setEditValue("");
            setIsActiveComment(null)
            setComments((prevComments) => {
                return prevComments.map((comment) => {
                    if (comment.id === updatedComment.id) {
                        return { ...comment, contents: updatedComment.contents, updated_at: updatedComment.updated_at };
                    }
                    return comment;
                });
            });
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };


    const deleteComment = async (comment_id) => {
        try {
            await sqlApi.delete(`/comments/${comment_id}`);

            setComments(prevComments => prevComments.filter(comment => comment.id !== comment_id));
        } catch (error) {
            console.error("Error deleting the comment:", error);
        }
    };


    const likeComment = async (user_id, comment_id) => {
        try {
            const response = await sqlApi.post(`/comments/like`, { user_id, comment_id });
            const { action } = response.data;

            setComments(prevComments => prevComments.map(comment => {
                if (comment.id === comment_id) {
                    if (action === 'like') {
                        return { ...comment, liked: true, likes_count: comment.likes_count + 1 };
                    } else if (action === 'unlike') {
                        return { ...comment, liked: false, likes_count: Math.max(comment.likes_count - 1, 0) }; // Avoid negative counts
                    }
                }
                return comment;
            }));
        } catch (error) {
            console.error("Error liking/unliking the comment:", error);
        }
    };


    return (
        <View key={comment.id} style={[styles.commentContainer, {
            backgroundColor: reply ? "rgba(31, 32, 34, 1)" : "rgba(31, 32, 34, 0.5)",
        }]}>

            {comment.user_id === storedUserInfo.id &&
                <View style={styles.commentsTrashIcon}>
                    <TouchableOpacity onPress={() => deleteComment(comment.id)}>
                        <Icon
                            name="trashIcon"
                            style={{
                                color: "#F25219",
                                width: 24
                            }}
                        />
                    </TouchableOpacity>
                </View>}

            <View style={styles.postHeader}>

                <ProfilePicture userId={comment.user_id} imageLink={comment.image_link?.small} width={25} />
                <TouchableOpacity
                    onPress={() => {
                        storedUserInfo.id !== comment.user_id
                            ? navigation.push("UserProfileScreen", {
                                id: comment.user_id,
                            })
                            : dispatch(
                                switchTab({
                                    name: "profile"
                                })
                            );
                    }}
                >
                    <CustomText style={{ marginLeft: 15, fontSize: 20 }}>{comment.username}</CustomText>

                </TouchableOpacity>

                <View style={styles.like}>
                    <TouchableOpacity onPress={() => likeComment(storedUserInfo.id, comment.id)}>

                        <Icon style={{ fill: comment.liked && "white" }} name="heartIcon" />

                    </TouchableOpacity>
                    <CustomText style={styles.likeText}>{comment.likes_count}</CustomText>
                </View>
                {!reply &&
                    <View style={styles.repost}>
                        <TouchableOpacity onPress={() => { replyId === comment.id ? setReply(null) : setReply(comment.id) }}>

                            <Icon name="repostIcon" />

                        </TouchableOpacity>
                        <CustomText style={styles.likeText}>{comment.replies_count}</CustomText>
                    </View>
                }

                {storedUserInfo.id === comment.user_id &&
                    <View style={styles.edit}>
                        {!isActiveComment ? <TouchableOpacity onPress={() => {
                            setIdEdited(true);
                            setEditValue(comment.contents);
                            setIsActiveComment(comment.id)
                        }
                        }>
                            <Icon style={{ fill: isEdited && isActiveComment === comment.id ? "#fff" : "transparent" }} name="pencilEdit" />
                        </TouchableOpacity>
                            : <TouchableOpacity onPress={() => {
                                setIdEdited(false);
                                setEditValue("");
                                setIsActiveComment(null)
                            }
                            }>
                                <Icon style={{ fill: isEdited && isActiveComment === comment.id ? "#fff" : "transparent" }} name="pencilEdit" />
                            </TouchableOpacity>}

                    </View>
                }

            </View>

            {
                isEdited && isActiveComment === comment.id ?
                    <TextInput
                        style={styles.input}
                        placeholder="Enter a comment..."
                        value={editValue}
                        onChangeText={text => setEditValue(text)}
                        placeholderTextColor="gray"
                        multiline
                        maxLength={240}
                    />
                    :

                    <CustomText style={{ fontSize: 17, marginVertical: 13 }}>{comment.contents}</CustomText>
            }

            <View style={styles.btnContainer}>
                <CustomText style={styles.counter}>
                    {humanReadableDate(comment.created_at)}
                </CustomText>
                {comment.created_at !== comment.updated_at && !isEdited && <CustomText style={styles.counter}>
                    edited
                </CustomText>}

                {isEdited && isActiveComment === comment.id && <Button
                    label="Post"
                    iconRight="arrow_right"
                    purple={true}
                    onPressIn={() => putComment(comment.id, editValue)}
                />}

            </View>
        </View>

    )
}

export default CommentComponent

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
        //   height: 150,
        marginBottom: 10,
        padding: 10,
        backgroundColor: "rgba(31, 32, 34, 0.2)",
        borderRadius: 5,
    },

})