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
                    d="M4 11.666h4L10.04 5l4.398 14 1.552-7.334H20"
                ></Path>
            </Svg>



        </View>
    )
}

export default Icon;