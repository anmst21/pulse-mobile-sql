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
                    strokeWidth="2"
                    d="M19.2 12H4.8"
                ></Path>
            </Svg>
        </View>
    )
}

export default Icon;