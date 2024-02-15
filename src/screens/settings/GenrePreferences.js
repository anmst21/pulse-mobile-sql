import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../../components/button'
import CustomText from '../../components/text'
import Icon from '../../components/icon'

const GenrePreferences = () => {
    return (
        <View style={styles.topContiner}>
            <View style={styles.container}>
                <CustomText>Genre Preferences</CustomText>
                <View style={styles.chevron}><Icon name="chevronDown" style={{ width: 35 }} /></View>
            </View>

        </View>
    )
}

export default GenrePreferences

const styles = StyleSheet.create({
    topContiner: {
        height: 300,
        backgroundColor: "blue",
        borderRadius: 10,
        marginBottom: 20,

    },
    chevron: {
        height: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 5,
        // transform: [{ rotate: '180deg' }]
    },
    container: {
        flexDirection: "row",
        marginLeft: 0,
        backgroundColor: "rgba(31, 32, 34, 0.4)",
        paddingHorizontal: 15,
        borderRadius: 10,
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "space-between",
    },
})