import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LineLoader = ({ name, status }) => {
    return (
        <>
            {name === "imgSettings" &&
                <View style={styles.container}>
                    <View style={[
                        styles.status,
                        { width: status }
                    ]} />
                </View>}
            {name === "postUpload" &&
                <View style={[styles.container, { bottom: 0 }]}>
                    <View style={[
                        styles.status,
                        { width: status }
                    ]} />
                </View>}
            {/* <View style={{
                width: "100%",
                height: 50,
                backgroundColor: "green",
                position: "absolute",
                bottom: "100%",
                flex: 1
            }} /> */}
        </>
    )
}

export default LineLoader

const styles = StyleSheet.create({
    status: {
        backgroundColor: "grey",

        height: 5,
    },
    container: {
        backgroundColor: "rgba(31, 32, 34, 0.5)",

        position: "absolute",
        top: 0,
        width: "100%",
        height: 5,
        right: 0
    },

})