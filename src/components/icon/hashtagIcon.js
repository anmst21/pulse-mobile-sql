



import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';
import styles from './indexStyle';

const Icon = (props) => {
    return (
        <View>
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
                    strokeWidth="2"
                    d="M20 16H4m16-8H4m2.667 12L9.333 4m5.334 16l2.666-16"
                ></Path>
            </Svg>

        </View>
    )
}

export default Icon;