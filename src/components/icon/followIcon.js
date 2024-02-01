


import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';
import styles from './indexStyle';

const Icon = ({ style }) => {
    return (

        <View>

            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={style.width}
                height={style.width}
                fill="none"
                viewBox="0 0 24 24"
            >
                <Path
                    stroke={style.color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M10.222 14.489l-.71 7.111 9.244-9.956L13.778 8.8l.71-6.4-9.244 9.956 4.978 2.133z"
                ></Path>
            </Svg>
        </View>
    )
}

export default Icon;