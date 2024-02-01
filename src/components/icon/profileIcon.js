



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
                height={style.height}
                fill="none"
                viewBox="0 0 31 31"
            >
                <Path
                    fill={style.color}
                    fillRule="evenodd"
                    d="M30.6 15.6c0 8.284-6.716 15-15 15-8.285 0-15-6.716-15-15 0-8.284 6.715-15 15-15 8.284 0 15 6.716 15 15zm-9.627-5.112c0-2.862-2.416-5.2-5.373-5.2-2.957 0-5.373 2.338-5.373 5.2 0 2.861 2.416 5.2 5.373 5.2 2.957 0 5.373-2.339 5.373-5.2zM7.889 23.791a2.607 2.607 0 01-.168-3.646c.72-.807 1.662-1.567 2.65-1.567h10.457c1.434 0 2.512.722 3.237 1.808.64.957.405 2.228-.397 3.054a11.217 11.217 0 01-8.068 3.41 11.211 11.211 0 01-7.71-3.059z"
                    clipRule="evenodd"
                ></Path>
            </Svg>
        </View>
    )
}

export default Icon;