


import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';
import styles from './indexStyle';

const Icon = (props) => {
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
                    fillRule="evenodd"
                    d="M11.22 11.293V3.026h1.458v8.188l-.74 2.76-.718-2.68zM17.646 3.928l-2.124 9.26-.734-1.084-2.049 8.842.122.028 2.074-1.81.646-2.79.742 1.094 2.773-12.09-1.45-1.45zM4.904 5.508l1.462-1.461 1.95 9.032.69-1.085 1.954 8.962-.08.017-2.147-2.081-.526-2.412-.698 1.095L4.904 5.508z"
                    clipRule="evenodd"
                ></Path>
            </Svg>
        </View>
    )
}

export default Icon;