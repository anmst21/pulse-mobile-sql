{/* <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="32"
    fill="none"
    viewBox="0 0 24 32"
>
    <rect width="24" height="32" fill="#222" rx="3"></rect>
    <rect
        width="14"
        height="22"
        x="5"
        y="5"
        stroke="#fff"
        strokeWidth="2"
        rx="2"
    ></rect>
</svg> */}


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
                    width="14"
                    height="22"
                    x="5"
                    y="5"
                    stroke={style.stroke}
                    strokeWidth="2"
                    rx="2"
                ></Rect>
            </Svg>

        </View>
    )
}

export default Icon;