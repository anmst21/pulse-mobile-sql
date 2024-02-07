

import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";
import { View } from "react-native";

const CustomIcon = ({ style }) => {
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
                    fillRule="evenodd"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.806 6.206a4.8 4.8 0 016.788 0L12 7.612l1.406-1.406a4.8 4.8 0 116.788 6.788L12 21.188l-8.194-8.194a4.8 4.8 0 010-6.788v0z"
                    clipRule="evenodd"
                    fill={style.fill}
                ></Path>
            </Svg>
        </View>
    );
};

export default CustomIcon;
