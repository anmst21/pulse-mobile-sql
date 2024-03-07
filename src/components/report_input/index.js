import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import CustomText from '../text'
import Button from "../button"


const ReportInput = ({
    topInputValue,
    setTopInputValue,
    botInputValue,
    setBotInputValue,
    onSubmit
}) => {
    return (
        <View style={{
        }}>
            <View style={styles.commentContainer}>

                <TextInput
                    style={styles.input}
                    placeholder="Enter a header..."
                    value={topInputValue}
                    onChangeText={text => setTopInputValue(text)} // Update the state on input change
                    placeholderTextColor="gray"
                    multiline
                    maxLength={30}
                />
                <CustomText style={styles.counter}>
                    {topInputValue.length} / 30
                </CustomText>
            </View>
            <View style={[styles.commentContainer, { height: 100, marginTop: 30 }]}>

                <TextInput
                    style={styles.input}
                    placeholder="Enter a body..."
                    value={botInputValue}
                    onChangeText={text => setBotInputValue(text)} // Update the state on input change
                    placeholderTextColor="gray"
                    multiline
                    maxLength={240}
                />
                <CustomText style={styles.counter}>
                    {botInputValue.length} / 240
                </CustomText>
            </View>
            <View style={styles.ctaBtn}>
                <Button
                    label={"Submit"}
                    grey
                    onPressIn={onSubmit}
                />
            </View>
        </View>
    )
}

export default ReportInput

const styles = StyleSheet.create({
    counter: {
        color: "rgba(31, 32, 34, 1)",
        fontSize: 12,
        position: "absolute",
        bottom: -20,
        right: 0
    },
    input: {
        fontSize: 14,
        lineHeight: 22, color: "white",
        alignItems: "center",
        top: 2
    },
    commentContainer: {
        marginTop: 20,
        marginHorizontal: 20,
        backgroundColor: "rgba(31, 32, 34, 0.5)",
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,

    },
    ctaBtn: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 10,
        paddingHorizontal: 20,
        left: 5,
        marginTop: 40
    },

})