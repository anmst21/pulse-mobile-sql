import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';
import styles from './indexStyle';

const Icon = ({ style }) => {
    return (
        <View>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={style?.width ? style.width : "25"}
                height={style?.width ? style.width : "25"}
                fill="none"
                viewBox="0 0 25 25"
            >
                <Path
                    stroke={style.color}
                    strokeWidth="2"
                    d="M14.8 12.172c0 1.29-1.074 2.336-2.4 2.336-1.325 0-2.4-1.046-2.4-2.336 0-1.29 1.075-2.335 2.4-2.335 1.326 0 2.4 1.045 2.4 2.335z"
                ></Path>
                <Path
                    stroke={style.color}
                    strokeWidth="2"
                    d="M12.4 18.998c7.323.12 9.6-6.736 9.6-6.736s-2.185-6.976-9.6-6.976c-7.416 0-9.6 6.976-9.6 6.976s2.277 6.617 9.6 6.736z"
                ></Path>
            </Svg>
        </View>
    )
}

export default Icon;

