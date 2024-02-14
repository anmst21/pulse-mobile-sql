



import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
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
                    fill={style.background}
                    d="M19 3c1.105 0 2 .883 2 1.973V8.34c0 1.09-.895 1.973-2 1.973h-3c-1.105 0-2-.884-2-1.973V4.973C14 3.883 14.895 3 16 3h3zM5 3c-1.105 0-2 .883-2 1.973V8.34c0 1.09.895 1.973 2 1.973h3c1.105 0 2-.884 2-1.973V4.973C10 3.883 9.105 3 8 3H5zM19 13.688c1.105 0 2 .883 2 1.972v3.367c0 1.09-.895 1.973-2 1.973h-3c-1.105 0-2-.883-2-1.973V15.66c0-1.09.895-1.973 2-1.973h3zM5 13.688c-1.105 0-2 .883-2 1.972v3.367C3 20.117 3.895 21 5 21h3c1.105 0 2-.883 2-1.973V15.66c0-1.09-.895-1.973-2-1.973H5z"
                ></Path>
                <Path
                    stroke={style.stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 3c1.105 0 2 .883 2 1.973V8.34c0 1.09-.895 1.973-2 1.973h-3c-1.105 0-2-.884-2-1.973V4.973C14 3.883 14.895 3 16 3h3zM5 3c-1.105 0-2 .883-2 1.973V8.34c0 1.09.895 1.973 2 1.973h3c1.105 0 2-.884 2-1.973V4.973C10 3.883 9.105 3 8 3H5zM19 13.688c1.105 0 2 .883 2 1.972v3.367c0 1.09-.895 1.973-2 1.973h-3c-1.105 0-2-.883-2-1.973V15.66c0-1.09.895-1.973 2-1.973h3zM5 13.688c-1.105 0-2 .883-2 1.972v3.367C3 20.117 3.895 21 5 21h3c1.105 0 2-.883 2-1.973V15.66c0-1.09-.895-1.973-2-1.973H5z"
                ></Path>
            </Svg>




        </View>
    )
}

export default Icon;