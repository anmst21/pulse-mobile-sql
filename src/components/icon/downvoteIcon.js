




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
                    fill="#F53535"
                    d="M12.38 15.757l6.112-7.132a.5.5 0 00-.38-.825H5.888a.5.5 0 00-.38.825l6.113 7.132a.5.5 0 00.76 0z"
                ></Path>
            </Svg>
        </View>
    )
}

export default Icon;