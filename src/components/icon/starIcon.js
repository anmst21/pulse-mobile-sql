

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
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.495 2.714a.563.563 0 011.01 0l2.674 5.418c.082.166.24.281.424.308l5.98.869a.563.563 0 01.311.96l-4.326 4.218a.563.563 0 00-.162.498l1.021 5.955a.563.563 0 01-.817.594l-5.348-2.812a.563.563 0 00-.524 0L6.39 21.534a.563.563 0 01-.817-.594l1.021-5.955a.563.563 0 00-.162-.498L2.106 10.27a.563.563 0 01.312-.961l5.979-.869a.563.563 0 00.424-.308l2.674-5.418z"
            ></Path>
        </Svg>



    )
}

export default Icon;