import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../text'
import Icon from '../icon'

const RectBtn = ({ count, name, callback, state }) => {


    const NumberBtn = ({ type, icon }) => {
        return <TouchableOpacity onPress={callback}>
            <View style={[
                styles.message,
                {
                    backgroundColor:
                        type === "noBG"
                            ? "transparent"
                            : "rgba(31, 32, 34, 0.8)"
                }
            ]} >
                {type === "withNumber" &&
                    <View style={styles.commentsCount}>
                        <CustomText style={{ fontSize: 12, color: "black" }}>
                            {count}
                        </CustomText>
                    </View>}


                {icon}

            </View>
        </TouchableOpacity>
    }

    const renderBtn = () => {
        switch (name) {
            case "comments":
                return <NumberBtn

                    type="withNumber"
                    icon={<Icon name="messageIcon" style={{ fill: state }} />}
                />;
            case "bookmark":
                return <NumberBtn
                    icon={<Icon name="bookmarkIcon" style={{ width: 24, stroke: "white", background: state ? "white" : null }} />}
                />;
            case "tags":
                return <NumberBtn
                    type="withNumber"
                    icon={<Icon name="tagsIcon" style={{ color: state ? "#fff" : "transparent" }} />}
                />;
            case "trash":
                return <NumberBtn
                    type="noBG"
                    icon={<Icon
                        name="trashIcon"
                        style={{
                            color: "#F25219",
                            width: 24
                        }}
                    />}
                />;
            case "chevronOpen":
                return <NumberBtn
                    type="noBG"
                    icon={<Icon name="chevronDown" style={{
                        width: 25,
                        transform: [{ rotate: state ? '-90deg' : "90deg" }]
                    }} />}
                />;
            case "share":
                return <NumberBtn
                    type="noBG"
                    icon={<Icon name="shareIcon" style={{
                        fill: state ? "#fff" : "none"
                    }} />}
                />;
            case "report":
                return <NumberBtn
                    type="noBG"
                    icon={<Icon name="reportIcon" style={{
                        stroke: "#FFAB1F"
                    }} />}
                />;
            case "minus":
                return <NumberBtn
                    type="noBG"
                    icon={<Icon name="minusIcon" />}
                />;
        }
    }
    return (
        <>
            {renderBtn()}
        </>
    )
}

export default RectBtn

const styles = StyleSheet.create({
    commentsCount: {
        backgroundColor: "white",
        position: "absolute",
        paddingLeft: 0,
        top: -5,
        right: -4,
        width: 16,
        height: 16,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
    },
    message: {
        width: 40,
        height: 40,


        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
    },
})