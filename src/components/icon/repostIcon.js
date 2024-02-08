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
                    d="M6.954 4.8L2.4 9.415m0 0l4.554 4.616M2.4 9.415h15.2a4 4 0 014 4V15.2a4 4 0 01-4 4H12"
                ></Path>
            </Svg>
        </View>
    )
}

export default Icon;