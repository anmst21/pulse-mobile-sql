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
                    stroke={style.color}
                    strokeWidth="2"
                    d="M14.4 12.03c0 1.289-1.075 2.335-2.4 2.335-1.326 0-2.4-1.046-2.4-2.336 0-1.29 1.074-2.335 2.4-2.335 1.325 0 2.4 1.045 2.4 2.335z"
                ></Path>
            </Svg>
        </View>
    )
}

export default Icon;

