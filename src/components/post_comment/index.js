import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import sqlApi from "../../redux/axios/sqlApi"
import CustomText from "../../components/text";
import Icon from '../icon';
import Button from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { lowerFirst } from 'lodash';

import { PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS,
    useAnimatedGestureHandler,
} from "react-native-reanimated";



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



const PostComment = ({ isActive, openComments, userId, audio }) => {
    const [comments, setComments] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editValue, setEditValue] = useState("")
    const [isEdited, setIdEdited] = useState(false)
    const [isActiveComment, setIsActiveComment] = useState(null)



    const storedUserInfo = useSelector((state) => state.user?.userInfo);


    useEffect(() => { openComments && fetchComments(isActive, userId) }, [isActive])






    const handleSubmit = (contents, user_id, post_id) => {
        postComment(contents, user_id, post_id);
        setInputValue(''); // Clear the input after submission
    };

    const fetchComments = async (post_id, user_id) => {
        const response = await sqlApi.get(`/comments/${post_id}/${user_id}`);
        console.log("fetchComments", response.data.comments)

        setComments(response.data.comments)
    }


    const postComment = async (contents, user_id, post_id) => {
        const response = await sqlApi.post(`/comments`, { contents, user_id, post_id });
        console.log("fetchComments", response.data)

        setComments(prev => [response.data, ...prev])
    }

    const putComment = async (post_id, contents) => {
        try {
            // Assuming the API response includes the updated comment object
            const response = await sqlApi.put(`/comments/${post_id}/${contents}`);
            const updatedComment = response.data.updatedComment; // Assuming this is the updated comment object
            console.log("updatedComment", updatedComment)
            setIdEdited(false);
            setEditValue("");
            setIsActiveComment(null)
            // Update the comments state
            setComments((prevComments) => {
                return prevComments.map((comment) => {
                    if (comment.id === updatedComment.id) {
                        // Update the specific comment with new contents and updated_at
                        return { ...comment, contents: updatedComment.contents, updated_at: updatedComment.updated_at };
                    }
                    return comment; // Return all other comments unchanged
                });
            });
        } catch (error) {
            console.error("Error updating comment:", error);
            // Handle error appropriately
        }
    };


    const deleteComment = async (comment_id) => {
        try {
            // Sending a DELETE request to the server to delete a comment
            await sqlApi.delete(`/comments/${comment_id}`);

            // Update the comments state to remove the deleted comment
            setComments(prevComments => prevComments.filter(comment => comment.id !== comment_id));
        } catch (error) {
            console.error("Error deleting the comment:", error);
            // Handle the error appropriately, e.g., show an error message to the user
        }
    };


    const likeComment = async (user_id, comment_id) => {
        try {
            // Sending a POST request to the server to like/unlike a comment
            const response = await sqlApi.post(`/comments/like`, { user_id, comment_id });
            const { action } = response.data;

            // Update the comments state based on the response
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
            // Handle the error appropriately
        }
    };

    return (
        <>{openComments && isActive === audio.id &&

            <View style={styles.comments}>

                <ScrollView>
                    <View style={styles.commentContainer}>
                        <View style={styles.postHeader}>
                            <Image
                                source={{ uri: storedUserInfo.image_link }}
                                style={{ width: 25, height: 25, borderRadius: 1000 }}
                            />
                            <CustomText style={{ marginLeft: 15, fontSize: 20 }}>{storedUserInfo.username}</CustomText>

                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter a comment..."
                            value={inputValue}
                            onChangeText={text => setInputValue(text)} // Update the state on input change
                            placeholderTextColor="gray"
                            multiline
                            maxLength={240}
                        />
                        <View style={styles.btnContainer}>
                            <CustomText style={styles.counter}>
                                {inputValue.length} / 240
                            </CustomText>
                            <Button
                                label="Post"
                                iconRight="arrow_right"

                                purple={true}
                                // status={player.edited}
                                // loading={saving}
                                onPressIn={() => handleSubmit(inputValue, userId, audio.id)}
                            />
                        </View>
                    </View>
                    {comments.map((comment) => (
                        <View key={comment.id} style={styles.commentContainer}>
                            {/* <TouchableOpacity
                        onPress={() => {
                          storedUserInfo.id !== comment.user_id
                            ? navigation.push("UserProfileScreen", {
                              id: comment.user_id,
                              comment,
                            })
                            : navigation.dispatch(StackActions.popToTop());
                        }}
                      > */}
                            {comment.user_id === userId &&
                                <View style={styles.commentsTrashIcon}>
                                    <TouchableOpacity onPress={() => deleteComment(comment.id)}>
                                        <Icon
                                            name="trashIcon"
                                            style={{
                                                color: "#F25219",
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>}

                            <View style={styles.postHeader}>
                                <Image
                                    source={{ uri: comment.image_link }}
                                    style={{ width: 25, height: 25, borderRadius: 1000 }}
                                />
                                <CustomText style={{ marginLeft: 15, fontSize: 20 }}>{comment.username}</CustomText>
                                <View style={styles.like}>
                                    <TouchableOpacity onPress={() => likeComment(userId, comment.id)}>

                                        <Icon style={{ fill: comment.liked && "white" }} name="heartIcon" />

                                    </TouchableOpacity>
                                    <CustomText style={styles.likeText}>{comment.likes_count}</CustomText>
                                </View>
                                {userId !== comment.user_id && <View style={styles.repost}>
                                    <TouchableOpacity onPress={() => likeComment(userId, comment.id)}>

                                        <Icon name="repostIcon" />

                                    </TouchableOpacity>

                                </View>}

                                {userId === comment.user_id &&
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
                                        {/* <TouchableOpacity onPress={() => {
                                            setIdEdited(false);
                                            setEditValue("");
                                            setIsActiveComment(null)
                                        }
                                        }>
                                            <Icon style={{ fill: isEdited && isActiveComment === comment.id ? "#fff" : "transparent" }} name="pencilEdit" />
                                        </TouchableOpacity> */}
                                    </View>
                                }

                            </View>
                            {/* </TouchableOpacity> */}

                            {
                                isEdited && isActiveComment === comment.id ?
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter a comment..."
                                        value={editValue}
                                        onChangeText={text => setEditValue(text)} // Update the state on input change
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
                                    // status={player.edited}
                                    // loading={saving}
                                    onPressIn={() => putComment(comment.id, editValue)}
                                />}

                            </View>
                        </View>
                    ))}</ScrollView>
            </View>


        }
        </>
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

        //   width: '100%',


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
        //  paddingBottom: 20
    },

})