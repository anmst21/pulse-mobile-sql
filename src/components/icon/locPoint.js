




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
                    strokeWidth="2"
                    d="M12 21.6s7.513-6.678 7.513-11.687a7.513 7.513 0 10-15.026 0C4.487 14.922 12 21.6 12 21.6z"
                ></Path>
                <Path
                    stroke="#fff"
                    strokeWidth="2"
                    d="M14.4 9.6a2.4 2.4 0 11-4.8 0 2.4 2.4 0 014.8 0z"
                ></Path>
            </Svg>
        </View>
    );
};

export default CustomIcon;
