






import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { View } from 'react-native';
import styles from './indexStyle';

const Icon = ({ style }) => {
    return (

        <View>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
            >

                <Path
                    fill="#472A91"
                    d="M15.044 19.994H4.95c-2.73 0-4.95-2.22-4.95-4.95V4.95C0 2.22 2.22 0 4.95 0h10.094c2.73 0 4.95 2.22 4.95 4.95v10.094c0 2.73-2.22 4.95-4.95 4.95z"
                ></Path>
                <Path
                    fill="#fff"
                    d="M13.12 6.328l-.987 3.702-.989-3.702H8.868l-.998 3.73-.996-3.73H4.282l2.409 8.186h2.236l1.07-3.802 1.07 3.802h2.24l2.404-8.186H13.12z"
                ></Path>

            </Svg>



        </View>
    )
}

export default Icon;