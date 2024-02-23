import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Button from '../../components/button'
import CustomText from '../../components/text'
import Icon from '../../components/icon'
import AsyncSearch from '../../components/async_search'
import { useDispatch, useSelector } from "react-redux";
import { openGenre, closeGenre, fetchGenres } from "../../redux"

const GenrePreferences = () => {
    const dispatch = useDispatch()
    const { genreOpen, genreList } = useSelector((state) => state.settings);
    const [userChoice, setUserChoice] = useState([])
    console.log("genreList@", genreList);


    return (
        <View style={[styles.topContiner, {
            height: genreOpen ? 350 : null, backgroundColor: genreOpen ? "rgba(31, 32, 34, 0.4)" : "transparent",
        }]}>
            <TouchableOpacity onPress={() => {
                genreOpen
                    ? dispatch(closeGenre())
                    : dispatch(openGenre())
            }}>

                <View style={[styles.container]}>

                    <View style={styles.left}>
                        <Icon name="starIcon" style={{ width: 24, height: 24, lineWidth: 2, fill: genreOpen && "#fff" }} />

                        <CustomText>Genre Preferences</CustomText>
                    </View>
                    <View style={[styles.chevron, genreOpen && {
                        transform: [{ rotate: '180deg' }]
                    }]}><Icon name="chevronDown" style={{ width: 35 }} />
                    </View>
                </View>
            </TouchableOpacity>
            {genreOpen &&

                <AsyncSearch genre={false} tags={true} search={false} setUserChoice={setUserChoice} />

            }
        </View>
    )
}

export default GenrePreferences

const styles = StyleSheet.create({
    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    },
    topContiner: {

        // backgroundColor: "blue",
        borderRadius: 10,
        marginBottom: 20,


    },
    chevron: {
        height: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 5,
    },
    container: {
        flexDirection: "row",
        marginLeft: 0,
        backgroundColor: "rgba(31, 32, 34, 0.6)",
        paddingHorizontal: 15,
        borderRadius: 10,
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "space-between",
    },
})