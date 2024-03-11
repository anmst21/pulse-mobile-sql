{/* <Icon name="markSeenIcon" /> */ }
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Button from '../../components/button'
import CustomText from '../../components/text'
import Icon from '../../components/icon'
import AsyncSearch from '../../components/async_search'
import { useDispatch, useSelector } from "react-redux";
import sqlApi from "../../redux/axios/sqlApi"
import {
    closeShadowList,
    openShadowList
} from "../../redux"
import UsersList from '../../components/user_list'
const NotificationsSettings = () => {
    const dispatch = useDispatch()
    const { shadowListOpen } = useSelector((state) => state.settings);
    const [results, setResults] = useState([])

    const fetchShadowList = async () => {
        try {
            const { data } = await sqlApi.post("/user/shadowlist")
            setResults(data)
            console.log("fetchShadowList", data)
        } catch (err) {
            console.error("Something Went Wrong", err)
        }
    }
    useEffect(() => {
        fetchShadowList()
    }, [])

    return (
        <View style={[styles.topContiner, {
            height: shadowListOpen ? 340 : null, backgroundColor: shadowListOpen ? "rgba(31, 32, 34, 0.4)" : "transparent",
        }]}>
            <TouchableOpacity onPress={() => {
                shadowListOpen
                    ? dispatch(closeShadowList())
                    : dispatch(openShadowList())
            }}>

                <View style={[styles.container]}>
                    <View style={styles.left}>

                        <Icon name="markSeenIcon" style={{ color: "#fff", fill: shadowListOpen && "#fff" }} />

                        <CustomText style={{ fontSize: 20 }}>
                            Shadow List
                        </CustomText>
                    </View>
                    <View style={[styles.chevron, shadowListOpen && {
                        transform: [{ rotate: '180deg' }]
                    }]}><Icon name="chevronDown" style={{ width: 35 }} />
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 20 }}>
                {
                    shadowListOpen &&
                    <UsersList results={results} setResults={setResults} />
                }
            </View>
        </View >
    )
}

export default NotificationsSettings

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