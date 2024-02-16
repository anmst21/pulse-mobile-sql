import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'



const Switch = ({ bool, callback }) => {


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={callback}>
                <View style={[styles.switch, { alignItems: bool ? "flex-end" : "flex-start" }]}>
                    <View style={[styles.circle, { backgroundColor: bool ? "#1ED760" : "#2D2B32" }]} />

                </View>
            </TouchableOpacity>
        </View >
    )
}

export default Switch

const styles = StyleSheet.create({
    circle: {
        width: 20,
        height: 20,
        backgroundColor: "green",
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#595E6A",

    },
    container: { height: 50, justifyContent: "center" },
    switch: {
        height: 23,
        width: 50,
        backgroundColor: "#4F4D55",
        justifyContent: "center",
        borderRadius: 100,
        paddingHorizontal: 2,
    },

})