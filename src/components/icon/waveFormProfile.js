






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
                viewBox="0 0 40 40"
            >
                <Path
                    stroke={style.color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="5"
                    d="M3.333 26.25v-12.5M20 36.667V3.333m-8.333 27.084V9.583m25 4.167v12.5M28.333 9.583v20.834"
                ></Path>
            </Svg>

        </View>
    )
}

export default Icon;