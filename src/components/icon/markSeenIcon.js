


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
                    stroke={style?.color || "#FFAB1F"}
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M20.4 19.5l-15-15m4.8 5.942a2.29 2.29 0 00-.6 1.544c0 1.29 1.075 2.336 2.4 2.336.611 0 1.17-.223 1.593-.589m6.846.589c.826-1.237 1.161-2.246 1.161-2.246S19.416 5.1 12 5.1c-.416 0-.816.022-1.2.063m6.6 12.186c-1.377.88-3.15 1.5-5.4 1.464-7.323-.12-9.6-6.737-9.6-6.737s1.058-3.378 4.2-5.433"
                ></Path>
            </Svg>
        </View>
    )
}

export default Icon;