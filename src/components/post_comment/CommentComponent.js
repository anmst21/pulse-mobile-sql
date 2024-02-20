import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import sqlApi from "../../redux/axios/sqlApi"
import CustomText from "../../components/text";
import Icon from '../icon';
import Button from "../../components/button";
import { useDispatch, useSelector } from "react-redux";


const CommentComponent = ({ comment, setComments, userId }) => {

    const [editValue, setEditValue] = useState("")
    const [isEdited, setIdEdited] = useState(false)
    const [isActiveComment, setIsActiveComment] = useState(null)


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
        <View key={comment.id} style={styles.commentContainer} >
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
            {
                comment.user_id === userId &&
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
                </View>
            }

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
                {userId === comment.user_id &&
                    <View style={styles.edit}>
                        {isActive ? <TouchableOpacity onPress={() => {
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
                {isEdited && isActiveComment === comment.id && <Button
                    label="Post"
                    iconRight="arrow_right"

                    purple={true}
                    // status={player.edited}
                    // loading={saving}
                    onPressIn={() => console.log("pressed")}
                />}

            </View>
        </View >
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

        borderWidth: 1,

        //   width: '100%',

        color: "white"
    },
    like: { position: "absolute", right: 10, top: 3, alignItems: "center", flexDirection: "row", gap: 7 },
    likeText: { fontSize: 16 },
    comments: {
        height: 400,
        // backgroundColor: "blue",
        bottom: -40
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
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },

})