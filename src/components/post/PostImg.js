import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'

const PostImg = ({ isOpenComments, audio }) => {
    return (
        <>
            {audio.img && <>
                <Image
                    source={{ uri: audio.img?.small }}
                    style={StyleSheet.absoluteFill}
                />
                <BlurView
                    style={styles.stretchBg}
                    intensity={isOpenComments ? 20 : 0}
                    tint="systemThickMaterialLight"
                />
            </>
            }
        </>
    )
}

export default PostImg

const styles = StyleSheet.create({
    imageBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    stretchBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
})