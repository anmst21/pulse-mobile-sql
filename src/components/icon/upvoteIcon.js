




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
                    fill="#14AD4D"
                    d="M11.646 8.754l-5.992 5.992a.5.5 0 00.353.854h11.986a.5.5 0 00.353-.854l-5.992-5.992a.5.5 0 00-.708 0z"
                ></Path>
            </Svg>


        </View>
    )
}

export default Icon;