import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Button, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import sqlApi from "../../redux/axios/sqlApi"
import CustomText from "../../components/text";
import Icon from '../icon';



const PostComment = ({ isActive, openComments, userId, audio }) => {
    const [comments, setComments] = useState([]);
    const [inputValue, setInputValue] = useState('');


    useEffect(() => { fetchComments(isActive, userId) }, [isActive])



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
                <TextInput
                    style={styles.input}
                    placeholder="Enter a comment..."
                    value={inputValue}
                    onChangeText={text => setInputValue(text)} // Update the state on input change
                /><Button
                    title="Submit Comment"
                    onPress={() => handleSubmit(inputValue, audio.user_id, audio.id)} // Call handleSubmit when the button is pressed
                />


                <ScrollView>
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
                            </View>
                            {/* </TouchableOpacity> */}
                            <CustomText >{comment.contents}</CustomText>
                            <CustomText>Posted on: {new Date(comment.created_at).toLocaleDateString()} at {new Date(comment.created_at).toLocaleTimeString()}</CustomText>
                        </View>
                    ))}</ScrollView>
            </View>

        }
        </>
    )
}

export default PostComment

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%',
        borderColor: 'gray',
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