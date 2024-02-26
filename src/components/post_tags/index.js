import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../text'
import Icon from "../icon"

const PostTags = ({ tags }) => {
    const genres = [
        { id: 1, name: "Techno" },
        { id: 2, name: "House" },
        { id: 3, name: "Trance" },
        { id: 4, name: "Dubstep" },
        { id: 5, name: "Drum and Bass" },
        { id: 6, name: "Electro" },
        { id: 7, name: "Hardstyle" },
        { id: 8, name: "Deep House" },
        { id: 9, name: "Progressive House" },
        { id: 10, name: "Chillout" }
    ];
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="tagsIcon" style={{ color: "#fff", }} />
                <CustomText style={{
                    fontSize: 24
                }}>Tags</CustomText>
            </View>
            <View style={styles.genreContainer}>
                {tags.map((genre) => (
                    <View key={genre.id} style={styles.genreItem}>
                        <Icon name="tagsIcon" style={{ color: "transparent", width: 20 }} />

                        <CustomText style={styles.text}>{genre.name}</CustomText>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default PostTags

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    container: {
        flex: 1,
        margin: 10,
        marginVertical: 20,
        marginHorizontal: 25
    },
    genreContainer: {
        flexDirection: "row",
        gap: 15,
        flexWrap: 'wrap',
        marginTop: 15,

    },
    text: {
        fontSize: 16
    },
    genreItem: {
        borderRadius: 5,
        backgroundColor: "rgba(31, 32, 34, 0.7)",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        padding: 7,
        paddingRight: 10,
    },
})