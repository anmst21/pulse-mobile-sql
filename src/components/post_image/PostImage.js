import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Icon from '../icon'
import * as ImagePicker from 'expo-image-picker';
import { setImgLink } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';

const PostImage = () => {
    const dispatch = useDispatch()
    const { imgLink } = useSelector(state => state.pulseRecording)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [19.5, 9],
            quality: 1,
        });
        console.log("qqwewwe", result.assets[0])
        if (!result.canceled) {
            dispatch(setImgLink(result.assets[0].uri))
        }
    };
    return (
        <View style={
            styles.container
        }>
            {imgLink ?
                <TouchableOpacity style={
                    styles.container
                } onPress={pickImage}>
                    <Image source={{ uri: imgLink }} style={styles.image} />
                </TouchableOpacity> :
                <TouchableOpacity onPress={pickImage}>
                    <Icon name="addImageIcon" />
                </TouchableOpacity>}
        </View>
    )
}

export default PostImage

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Cover the button area, adjust as needed
    },
    container: {
        //   backgroundColor: "blue",
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
})