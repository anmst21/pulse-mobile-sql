







import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';
import styles from './indexStyle';

const Icon = ({ style }) => {
    const width = style.width ? style.width : 24
    return (

        <View>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={width}
                fill="none"
                viewBox="0 0 24 24"
            >
                <Path
                    fill={style.color}

                    d="M2.917 14.836a1.767 1.767 0 010-2.499l9.42-9.42c.365-.364.87-.551 1.385-.512l5.8.446c.87.067 1.56.757 1.627 1.626l.446 5.8c.04.515-.148 1.02-.512 1.386l-9.42 9.42c-.69.69-1.809.69-2.499 0l-6.246-6.247z"
                ></Path>
                <Path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16.354 7.652h-.006m3.175-4.8l-5.8-.447a1.767 1.767 0 00-1.386.512l-9.42 9.42c-.69.69-.69 1.809 0 2.499l6.247 6.246c.69.69 1.809.69 2.499 0l9.42-9.42c.364-.364.551-.87.512-1.384l-.446-5.8a1.767 1.767 0 00-1.626-1.627z"
                ></Path>
            </Svg>


        </View >
    )
}

export default Icon;