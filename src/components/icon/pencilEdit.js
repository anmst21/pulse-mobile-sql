import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';
import styles from './indexStyle';

const Icon = ({ style }) => {
    return (

        <View>

            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={style.width ? style.width : 22}
                height={style.width ? style.width : 22}
                fill="none"
                viewBox="0 0 22 22"
            >
                <Path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    fill={style.fill}
                    d="M3.8 14.6L8 18.2m-4.8-3.6L15.031 2.355a3.262 3.262 0 014.614 4.614L7.4 18.8l-6 1.8 1.8-6z"
                ></Path>
            </Svg>
        </View>
    )
}

export default Icon;