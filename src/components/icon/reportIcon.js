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
                    fill="#fff"
                    d="M15.89 9.525a1 1 0 00-1.415-1.414l1.414 1.414zm-7.78 4.95a1 1 0 101.415 1.414l-1.414-1.414zm6.365 1.414a1 1 0 001.414-1.414l-1.414 1.414zm-4.95-7.778a1 1 0 00-1.414 1.414l1.414-1.414zM20 12a8 8 0 01-8 8v2c5.523 0 10-4.477 10-10h-2zm-8 8a8 8 0 01-8-8H2c0 5.523 4.477 10 10 10v-2zm-8-8a8 8 0 018-8V2C6.477 2 2 6.477 2 12h2zm8-8a8 8 0 018 8h2c0-5.523-4.477-10-10-10v2zm2.475 4.11l-3.182 3.183 1.414 1.414 3.182-3.182-1.414-1.414zm-3.182 3.183L8.11 14.475l1.414 1.414 3.182-3.182-1.414-1.414zm4.596 3.182l-3.182-3.182-1.414 1.414 3.182 3.182 1.414-1.414zm-3.182-3.182L9.525 8.11 8.111 9.525l3.182 3.182 1.414-1.414z"
                ></Path>
            </Svg>
        </View>
    )
}

export default Icon;