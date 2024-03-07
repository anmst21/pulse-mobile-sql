import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../text'
import Icon from '../icon'
import { BlurView } from 'expo-blur'

const Modal = ({ modalList, type }) => {


    const ModalItem = ({ item }) => {
        if (item.condition) {
            return <TouchableOpacity onPress={item.callback}>
                <View style={styles.modalItem}>
                    {item?.icon && item.icon}

                    <CustomText style={{
                        fontSize: 14
                    }}>{item.text}</CustomText>
                </View>
            </TouchableOpacity>
        }
    }

    return (
        <View style={[type === "profileImg" ? styles.modal : styles.share, { borderRadius: 10, overflow: 'hidden' }]}>
            <BlurView intensity={80} style={StyleSheet.absoluteFill} />

            {modalList.map(item => <ModalItem item={item} key={item.key} />
            )}
        </View>
    )

}

export default Modal

const styles = StyleSheet.create({

    modalItem: {
        flexDirection: "row",
        gap: 7,
        //  backgroundColor: "grey",
        paddingHorizontal: 10,
        paddingRight: 30,

        paddingVertical: 10,
        borderRadius: 3,
        alignItems: "center",
        backgroundColor: "rgba(31, 32, 34, 0.3)",

    },
    modal: {
        // backgroundColor: "rgba(31, 32, 34, 1)",
        position: "absolute",
        bottom: -110,
        zIndex: 9999,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        gap: 5

    },
    share: {
        //  backgroundColor: "rgba(31, 32, 34, 1)",
        position: "absolute",
        top: 40,
        right: 0,
        zIndex: 9999,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        gap: 5,
        width: 200,

    },
})