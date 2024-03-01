

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';
import styles from './indexStyle';

const Icon = ({ style }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            // fill="#fff"
            viewBox="0 0 24 24"
        >
            <Path
                stroke="#FAFBFE"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                fill={style?.fill ? "#fff" : "transparent"}
                d="M7.2 7.2h8.4M7.2 12H12m-.313 4.591L6.678 21.6v-5.009H4.8a2.4 2.4 0 01-2.4-2.4V4.8a2.4 2.4 0 012.4-2.4h14.4a2.4 2.4 0 012.4 2.4v9.391a2.4 2.4 0 01-2.4 2.4h-7.513z"
            ></Path>
        </Svg>



    )
}

export default Icon;