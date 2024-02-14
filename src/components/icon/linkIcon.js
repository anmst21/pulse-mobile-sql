

import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
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
                    strokeWidth="2"
                    d="M7.379 10.19l-2.234 2.234a4.45 4.45 0 00.047 6.343 4.451 4.451 0 003.181 1.352c1.22.009 2.328-.444 3.162-1.278l2.234-2.233m2.853-2.799l2.233-2.233a4.451 4.451 0 00-.047-6.343 4.536 4.536 0 00-3.18-1.325 4.405 4.405 0 00-3.163 1.278l-2.233 2.233m-1.619 7.908l6.7-6.7"
                ></Path>
            </Svg>

        </View>
    )
}

export default Icon;