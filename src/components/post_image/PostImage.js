import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '../icon'

const PostImage = () => {
    return (
        <View>
            <TouchableOpacity>
                <Icon name="addImageIcon" />
            </TouchableOpacity>
        </View>
    )
}

export default PostImage

const styles = StyleSheet.create({})