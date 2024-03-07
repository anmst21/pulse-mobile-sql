import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Theme from "../../styles/theme"


const PostSeen = ({ isSeen }) => {
    return (
        <View style={{
            width: 5,
            height: 5,
            backgroundColor: !isSeen ? Theme.green : "transparent",
            borderRadius: 10,
            position: "absolute",
            right: 15,
            top: 15
        }} />
    )
}

export default PostSeen

const styles = StyleSheet.create({})