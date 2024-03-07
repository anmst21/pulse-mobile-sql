import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import Button from '../../components/button'
import CustomText from '../../components/text'
import Icon from '../../components/icon'
import AsyncSearch from '../../components/async_search'
import { useDispatch, useSelector } from "react-redux";
import {
    openReport, closeReport
} from "../../redux";
import ReportInput from '../../components/report_input'
import sqlApi from "../../redux/axios/sqlApi"

const ReportBug = () => {
    const dispatch = useDispatch()
    const { reportOpen } = useSelector((state) => state.settings);
    const [topInputValue, setTopInputValue] = useState("")
    const [botInputValue, setBotInputValue] = useState("")

    const onSubmit = async () => {
        try {
            dispatch(closeReport())
            const response = sqlApi.post("/report/bug", {
                reportReason: topInputValue,
                reportDetails: botInputValue
            })
            setBotInputValue("")
            setTopInputValue("")
            console.log("Success!", response.data)
        } catch (err) {
            console.log("Error Reporting a Bug:", err)
        }
    }
    // const onSubmitReport = async () => {
    //     try {
    //         dispatch(setActiveReportId(null))

    //         const object = posts.find(item => item.id === activeReportId);

    //         const response = sqlApi.post("/report/post", {
    //             audioId: object.id,
    //             ownerUserId: object.user_id,
    //             reportReason: topInputValue,
    //             reportDetails: botInputValue
    //         })
    //         setBotInputValue("")
    //         setTopInputValue("")
    //         console.log("Success!", response.data)
    //     } catch (err) {
    //         console.log("Error uploading post report", err)
    //     }
    // }




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
                    <View style={styles.left}>

                        <Icon name="bugIcon" style={{ width: 24, height: 24 }} />

                        <CustomText style={{ fontSize: 20 }}>
                            Report a Bug
                        </CustomText>
                    </View>

                    <View style={[styles.chevron, reportOpen && {
                        transform: [{ rotate: '180deg' }]
                    }]}><Icon name="chevronDown" style={{ width: 35 }} />
                    </View>
                </View>
            </TouchableOpacity>
            {reportOpen &&
                <ReportInput
                    topInputValue={topInputValue}
                    setTopInputValue={setTopInputValue}
                    botInputValue={botInputValue}
                    setBotInputValue={setBotInputValue}
                    onSubmit={onSubmit}
                />

            }
        </View>
    )
}

export default ReportBug

const styles = StyleSheet.create({
    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    },
    counter: {
        color: "rgba(31, 32, 34, 1)",
        fontSize: 12,
        position: "absolute",
        bottom: -20,
        right: 0
    },
    btnContainer: {
        // flex: 1,
        backgroundColor: "blue",
        justifyContent: 'flex-end',
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        fontSize: 14,
        lineHeight: 22, color: "white",
        alignItems: "center",
        top: 2
    },

    postHeader: {

        flexDirection: "row",
        alignItems: "center"
    },
    commentContainer: {
        marginTop: 20,
        marginHorizontal: 20,
        backgroundColor: "rgba(31, 32, 34, 0.5)",
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,
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