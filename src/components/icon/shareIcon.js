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
                fill={style?.fill || "none"}
                viewBox="0 0 24 24"
            >
                <Path
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 11.46L11.4 5.1v3.6C3 10.5 3 18.9 3 18.9s3.6-4.8 8.4-4.2v3.72l9.6-6.96z"
                ></Path>
            </Svg>

        </View>
    )
}

export default Icon;