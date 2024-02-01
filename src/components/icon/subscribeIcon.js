
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
                viewBox="0 0 24 24"
            >
                <Path
                    fill={style.color}
                    fillRule="evenodd"
                    d="M9.126 3.064a1.199 1.199 0 011.74-.462c.416.277.737.67.987 1.056.257.397 1.124 1.882 1.325 2.365.15.36.244.544.357.76.189.367.427.828 1.056 2.381.044.108.077.196.103.267.063.17.09.24.135.233.294-.047 1.034-.428 1.55-1.05.214-.26.357-.475.451-.645.116-.208.448-.346.637-.202.896.68 2.82 2.479 2.933 5.433a8.402 8.402 0 01-16.8 0c0-2.148.821-4.3 2.46-5.94.71-.71 1.176-1.182 1.618-1.76.436-.572.869-1.276 1.448-2.436zm-.53 12.58a3.75 3.75 0 01.583-4.04 3.75 3.75 0 012.326-1.247 5.99 5.99 0 011.925 3.545 5.935 5.935 0 002.133-1 3.749 3.749 0 01-6.967 2.743z"
                    clipRule="evenodd"
                ></Path>
            </Svg>
        </View>
    )
}

export default Icon;