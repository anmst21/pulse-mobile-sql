import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../text'
import Icon from '../icon'

import Switch from '../switch'

const NotificationSetting = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Icon name={item.icon} style={{ width: 24, strokeWidth: 2 }} />
                <CustomText style={{ fontSize: 16 }}>{item.title}</CustomText>
            </View>
            <Switch bool={item.bool} callback={item.callback} />
        </View>
    )
}

export default NotificationSetting

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        // marginLeft: 0,
        backgroundColor: "rgba(31, 32, 34, 0.6)",
        paddingHorizontal: 15,
        borderRadius: 10,

        //paddingVertical: 5,
        marginHorizontal: 10,

        justifyContent: "space-between",
        marginBottom: 15,
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    },
})