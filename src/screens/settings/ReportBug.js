import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import Button from '../../components/button'
import CustomText from '../../components/text'
import Icon from '../../components/icon'
import AsyncSearch from '../../components/async_search'
import { useDispatch, useSelector } from "react-redux";
import {
    openReport, closeReport
} from "../../redux"

const ReportBug = () => {
    const dispatch = useDispatch()
    const { reportOpen } = useSelector((state) => state.settings);
    const [topInputValue, setTopInputValue] = useState("")
    const [botInputValue, setBotInputValue] = useState("")






    return (
        <View style={[styles.topContiner, {
            backgroundColor: reportOpen ? "rgba(31, 32, 34, 0.4)" : "transparent",
        }]}>
            <TouchableOpacity onPress={() => {
                reportOpen
                    ? dispatch(closeReport())
                    : dispatch(openReport())
            }}>

                <View style={[styles.container]}>
                    <CustomText>Report a Bug</CustomText>
                    <View style={[styles.chevron, reportOpen && {
                        transform: [{ rotate: '180deg' }]
                    }]}><Icon name="chevronDown" style={{ width: 35 }} />
                    </View>
                </View>
            </TouchableOpacity>
            {reportOpen &&

                <View style={{


                }}>
                    <View style={styles.commentContainer}>

                        <TextInput
                            style={styles.input}
                            placeholder="Enter a header..."
                            value={topInputValue}
                            onChangeText={text => setTopInputValue(text)} // Update the state on input change
                            placeholderTextColor="gray"
                            multiline
                            maxLength={30}
                        />
                        <CustomText style={styles.counter}>
                            {topInputValue.length} / 30
                        </CustomText>
                    </View>
                    <View style={[styles.commentContainer, { height: 100, marginTop: 30 }]}>

                        <TextInput
                            style={styles.input}
                            placeholder="Enter a body..."
                            value={botInputValue}
                            onChangeText={text => setBotInputValue(text)} // Update the state on input change
                            placeholderTextColor="gray"
                            multiline
                            maxLength={240}
                        />
                        <CustomText style={styles.counter}>
                            {botInputValue.length} / 240
                        </CustomText>
                    </View>
                    <View style={styles.btnContainer}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            // marginBottom: 10,
                            paddingHorizontal: 20,
                            flex: 1,
                            marginTop: 30,
                            marginBottom: 10
                        }}>
                            <Button
                                label="Submit"
                                iconRight="arrow_right"

                                grey
                                // status={player.edited}
                                // loading={saving}
                                onPressIn={() => console.log()}
                            />
                        </View>

                    </View>
                </View>
            }
        </View>
    )
}

export default ReportBug

const styles = StyleSheet.create({
    counter: {
        color: "rgba(31, 32, 34, 1)",
        fontSize: 12,
        position: "absolute",
        bottom: -20,
        right: 0

    },
    btnContainer: {
        //  backgroundColor: "blue",
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        fontSize: 14,
        lineHeight: 22, color: "white",
        alignItems: "center",
        //   width: '100%',
        top: 2

    },

    postHeader: {

        flexDirection: "row",
        alignItems: "center"
    },
    commentContainer: {

        marginTop: 20,
        //  padding: 10,
        marginHorizontal: 20,
        backgroundColor: "rgba(31, 32, 34, 0.5)",
        height: 40,
        borderRadius: 5,
        //  justifyContent: "center",
        paddingHorizontal: 10,
        //  paddingBottom: 20
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