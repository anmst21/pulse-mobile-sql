import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ProfilePicture from '../profile_picture';
import CustomText from '../text';
import Button from "../../components/button";


const CommentInput = ({ callback }) => {
    const storedUserInfo = useSelector((state) => state.user?.userInfo);
    const [inputValue, setInputValue] = useState('');



    const handleSubmit = () => {
        callback(inputValue, storedUserInfo.id)
        setInputValue(''); // Clear the input after submission
    };
    return (
        <View style={styles.commentContainer}>
            <View style={styles.postHeader}>

                <ProfilePicture userId={storedUserInfo.id} imageLink={storedUserInfo.image_link?.small} width={25} />

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
                    onPressIn={() => handleSubmit()}
                />
            </View>
        </View>
    )
}

export default CommentInput

const styles = StyleSheet.create({
    commentContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: "rgba(31, 32, 34, 0.2)",
        borderRadius: 5,
    },
    postHeader: {
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        fontSize: 16,
        marginVertical: 10,
        color: "white"
    },
    btnContainer: {
        //  backgroundColor: "blue",
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: "center"
    },
    counter: {
        color: "grey",
        fontSize: 14,

    },
})