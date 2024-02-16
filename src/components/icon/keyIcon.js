

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';
import styles from './indexStyle';

const Icon = ({ style }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill={style.fill}
            viewBox="0 0 24 24"
        >
            <Path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 9h.121m8.88 12.6l-6.693-6.598c-1.295.502-2.842.305-4.28-.115-3.423-1.002-5.375-4.55-4.36-7.925 1.017-3.374 4.616-5.298 8.04-4.297 3.423 1.002 5.375 4.55 4.359 7.924l-.16.866 6.693 6.597V21.6h-3.599z"
            ></Path>
        </Svg>


    )
}

export default Icon;