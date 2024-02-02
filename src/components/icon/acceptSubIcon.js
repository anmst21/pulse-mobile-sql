

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';
import styles from './indexStyle';

const Icon = ({ style }) => {
    return (

        <View>

            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
            >
                <Path
                    stroke="#14AD4D"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.4 21.6V18A3.6 3.6 0 016 14.4h7.2m3 3l1.2 1.2 4.2-4.2M14.4 6a3.6 3.6 0 11-7.2 0 3.6 3.6 0 017.2 0z"
                ></Path>
            </Svg>
        </View>
    )
}

export default Icon;