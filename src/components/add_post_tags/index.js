import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GenrePreferences from '../../screens/settings/GenrePreferences'
import AsyncSearch from '../async_search'

const AddPostTags = () => {
    return (
        <View style={styles.container}>
            <Text>AddPostTags</Text>
            <View style={{
                height: 290
            }}>
                <AsyncSearch genre={false} tags={true} search={false} setUserChoice={() => { console.log("userChoice") }} />
            </View>

        </View>
    )
}

export default AddPostTags

const styles = StyleSheet.create({
    container: {
        //backgroundColor: "blue"
    }
})
