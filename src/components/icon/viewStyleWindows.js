<svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="32"
    fill="none"
    viewBox="0 0 24 32"
>
    <rect width="24" height="32" fill="#222" rx="3"></rect>
    <rect
        width="6.111"
        height="10"
        x="4.389"
        y="4.5"
        stroke="#fff"
        rx="1.5"
    ></rect>
    <rect
        width="6.111"
        height="10"
        x="13.5"
        y="4.5"
        stroke="#fff"
        rx="1.5"
    ></rect>
    <rect
        width="6.111"
        height="10"
        x="4.389"
        y="17.5"
        stroke="#fff"
        rx="1.5"
    ></rect>
    <rect
        width="6.111"
        height="10"
        x="13.5"
        y="17.5"
        stroke="#fff"
        rx="1.5"
    ></rect>
</svg>



import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { View } from 'react-native';
import styles from './indexStyle';

const Icon = ({ style }) => {
    return (

        <View>

            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="32"
                fill="none"
                viewBox="0 0 24 32"
            >
                <Rect width="24" height="32" fill={style.background} rx="3"></Rect>
                <Rect
                    width="6.111"
                    height="10"
                    x="4.389"
                    y="4.5"
                    stroke={style.stroke}
                    rx="1.5"
                ></Rect>
                <Rect
                    width="6.111"
                    height="10"
                    x="13.5"
                    y="4.5"
                    stroke={style.stroke}
                    rx="1.5"
                ></Rect>
                <Rect
                    width="6.111"
                    height="10"
                    x="4.389"
                    y="17.5"
                    stroke={style.stroke}
                    rx="1.5"
                ></Rect>
                <Rect
                    width="6.111"
                    height="10"
                    x="13.5"
                    y="17.5"
                    stroke={style.stroke}
                    rx="1.5"
                ></Rect>
            </Svg>



        </View>
    )
}

export default Icon;