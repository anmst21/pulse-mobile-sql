import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useRef, useMemo } from 'react'

const FIRST_PAGE_HEIGHT = 350;
const SECOND_PAGE_HEIGHT = 500;
const THIRD_PAGE_HEIGHT = 250;

const MainDrawerPlayer = () => {
    const { width: windowWidth } = useWindowDimensions();
    const ref = useRef(null);

    return (
        <View style={{
            width: "100%",
            height: 70,
            backgroundColor: "blue",
            position: "absolute",
            bottom: "100%"
        }} />
    )
}

export default MainDrawerPlayer

const styles = StyleSheet.create({})