import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { toggleTags } from "../../redux";
import { useDispatch, useSelector } from "react-redux";



const Switch = () => {
    const dispatch = useDispatch()
    const { tags } = useSelector((state) => state.settings)

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => dispatch(toggleTags())}>
                <View style={[styles.switch, { alignItems: tags ? "flex-end" : "flex-start" }]}>
                    <View style={[styles.circle, { backgroundColor: tags ? "#1ED760" : "#2D2B32" }]} />

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
        // backgroundColor: "#1ED760",
        // backgroundColor: "#2D2B32",

    },
    container: { height: 50, justifyContent: "center" },
    switch: {
        height: 23,
        width: 50,
        backgroundColor: "#4F4D55",
        justifyContent: "center",
        borderRadius: 100,

        //  flexDirection: "row",
        paddingHorizontal: 2,
        // alignItems: "flex-end"

    },

})