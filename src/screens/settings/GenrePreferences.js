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
    const { genreOpen } = useSelector((state) => state.settings);
    const [userChoice, setUserChoice] = useState([])
    console.log("userChoice", userChoice);


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
                    <CustomText>Genre Preferences</CustomText>
                    <View style={[styles.chevron, genreOpen && {
                        transform: [{ rotate: '180deg' }]
                    }]}><Icon name="chevronDown" style={{ width: 35 }} />
                    </View>
                </View>
            </TouchableOpacity>
            {genreOpen &&
                <>
                    <AsyncSearch search={false} setUserChoice={setUserChoice} />
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginBottom: 10,
                        paddingHorizontal: 20
                    }}>
                        <Button
                            label={"Close"}

                            onPressIn={() => {
                                dispatch(closeGenre())

                            }}
                        />
                        <Button
                            label={"Load"}
                            grey
                            onPressIn={() => {
                                dispatch(fetchGenres());

                            }}
                        />
                    </View>
                </>
            }
        </View>
    )
}

export default GenrePreferences

const styles = StyleSheet.create({
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