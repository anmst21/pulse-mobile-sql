




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
                    fill={style.color}
                    fillRule="evenodd"
                    d="M12 18.598c5.94.094 8.56-4.231 9.338-5.867.187-.393.19-.841.01-1.238C20.596 9.83 18.024 5.4 12 5.4c-6.01 0-8.584 4.411-9.344 6.083-.183.403-.177.857.02 1.254.792 1.605 3.416 5.768 9.324 5.861zm0-2.535c2.38 0 4.308-1.807 4.308-4.035S14.379 7.993 12 7.993c-2.38 0-4.308 1.807-4.308 4.035S9.621 16.062 12 16.062z"
                    clipRule="evenodd"
                ></Path>
                <Path
                    fill={style.color}

                    d="M14.4 12.028c0 1.241-1.075 2.248-2.4 2.248s-2.4-1.007-2.4-2.248c0-1.241 1.075-2.248 2.4-2.248s2.4 1.007 2.4 2.248z"
                ></Path>
            </Svg>

        </View>
    );
};

export default CustomIcon;
