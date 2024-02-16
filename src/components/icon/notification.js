import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';
import styles from './indexStyle';

const Icon = (props) => {
    const lineWidth = props.style?.lineWidth ? props.style.lineWidth : 1
    return (

        // <Svg width="20" height="22" fill={props.style?.fill} viewBox="0 0 20 22">
        //     <Path
        //         style={[styles.icon, props.style, { strokeWidth: lineWidth }]}
        //         d="M7 19.9899C7.79613 20.618 8.84747 21 10 21C11.1525 21 12.2039 20.618 13 19.9899M1.57109 16.7575C1.09677 16.7575 0.831858 16.0216 1.11877 15.6127C1.78453 14.6639 2.42712 13.2724 2.42712 11.5967L2.45458 9.16851C2.45458 4.65717 5.83278 1 10 1C14.2286 1 17.6566 4.71104 17.6566 9.28883L17.6291 11.5967C17.6291 13.2839 18.2495 14.683 18.8882 15.6322C19.164 16.0421 18.8984 16.7575 18.43 16.7575H1.57109Z"
        //     />
        // </Svg>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill={props.style?.fill}
            viewBox="0 0 24 24"
        >
            <Path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={lineWidth}
                d="M9.333 20.09c.708.566 1.643.91 2.667.91a4.268 4.268 0 002.667-.91m-10.16-2.908c-.421 0-.656-.663-.401-1.03.591-.855 1.163-2.107 1.163-3.615l.024-2.185C5.293 6.292 8.296 3 12 3c3.759 0 6.806 3.34 6.806 7.46l-.025 2.077c0 1.518.552 2.778 1.12 3.632.245.369.009 1.013-.408 1.013H4.508z"
            ></Path>
        </Svg>
    )
}

export default Icon;