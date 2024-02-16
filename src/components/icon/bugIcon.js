

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';
import styles from './indexStyle';

const Icon = ({ style }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <Path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7.09 20.238h-.508a2.535 2.535 0 01-2.534-2.535v-5.07c0-.78-1.648-1.14-1.648-1.14s1.648-.3 1.648-1.14V6.296c0-1.4 1.134-2.535 2.534-2.535h.507m9.822 0h.507c1.4 0 2.535 1.135 2.535 2.535v5.07c0 .78 1.647 1.14 1.647 1.14s-1.648.3-1.648 1.14v4.056c0 1.4-1.134 2.535-2.534 2.535h-.507M9.6 9.762l2.4 2.4m0 0l2.4 2.4m-2.4-2.4l-2.4 2.4m2.4-2.4l2.4-2.4"
            ></Path>
        </Svg>



    )
}

export default Icon;