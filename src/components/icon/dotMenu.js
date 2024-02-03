




import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';
import styles from './indexStyle';

const Icon = ({ style }) => {
    return (

        <View>

            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="none"
                viewBox="0 0 25 25"
            >
                <Path
                    fill="#D9D9D9"
                    fillRule="evenodd"
                    d="M15.5 3.5a3 3 0 11-6 0 3 3 0 016 0zm0 9a3 3 0 11-6 0 3 3 0 016 0zm-3 12a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                ></Path>
            </Svg>

        </View>
    )
}

export default Icon;