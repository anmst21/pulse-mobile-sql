

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
                d="M14.647 7.8V5.7c0-.557-.223-1.091-.62-1.485a2.127 2.127 0 00-1.498-.615H5.118c-.562 0-1.1.221-1.498.615C3.223 4.61 3 5.143 3 5.7v12.6c0 .557.223 1.091.62 1.485.397.394.936.615 1.498.615h7.411c.562 0 1.1-.221 1.498-.615a2.09 2.09 0 00.62-1.485v-2.1M8.294 12H21m0 0l-3.177-3.15M21 12l-3.177 3.15"
            ></Path>
        </Svg>


    )
}

export default Icon;