




import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';
import styles from './indexStyle';

const Icon = ({ style }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={style.width}
            height={style.width}
            fill="none"
            viewBox="0 0 24 24"
        >
            <Path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.8 21.6h14.4c1.326 0 2.4-1.13 2.4-2.526V4.926c0-1.395-1.075-2.526-2.4-2.526H4.8c-1.325 0-2.4 1.131-2.4 2.526v14.148c0 1.395 1.075 2.526 2.4 2.526z"
            ></Path>
            <Path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 15.6h12l-4-7-3 4.5-2-2-3 4.5z"
            ></Path>
        </Svg>



    )
}

export default Icon;