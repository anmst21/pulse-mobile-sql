import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GenrePreferences from '../../screens/settings/GenrePreferences'
import AsyncSearch from '../async_search'
import CustomText from '../text'

const AddPostTags = () => {
    return (
        <View style={styles.container}>

            <CustomText style={{ marginLeft: 15, top: 10 }}>Tags</CustomText>

            <AsyncSearch genre={false} tags={true} search={false} setUserChoice={() => { console.log("userChoice") }} />


        </View>
    )
}

export default AddPostTags

const styles = StyleSheet.create({
    container: {
        height: 290
    }
})
