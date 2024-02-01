
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';
import styles from './indexStyle';

const Icon = ({ style }) => {
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
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.35 5.7V2.1m0 19.8v-4.8m5.7-5.7h2.1m-18.3 0h4.8m9.73-4.03l1.67-1.67M5.924 18.825l3.394-3.394m8.063 0l1.669 1.668M5.924 3.975L9.318 7.37"
                ></Path>
            </Svg>
        </View>
    )
}

export default Icon;