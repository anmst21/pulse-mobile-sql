


import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";
import { View } from "react-native";

const CustomIcon = ({ style }) => {
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
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M16.927 17.04L20.4 20.4m-1.12-8.96a7.84 7.84 0 11-15.68 0 7.84 7.84 0 0115.68 0z"
                ></Path>
            </Svg>
        </View>
    );
};

export default CustomIcon;
