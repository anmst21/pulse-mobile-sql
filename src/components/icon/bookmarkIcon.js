


import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
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
                    fill={style.background}
                    d="M5 5a2 2 0 012-2h9a2 2 0 012 2v14.883a.5.5 0 01-.833.373L11.5 15.194l-5.667 5.062A.5.5 0 015 19.883V5z"
                ></Path>
                <Path
                    stroke={style.stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.79 6.484h5.417m-2.707 8.71l5.667 5.062a.5.5 0 00.833-.373V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14.883a.5.5 0 00.833.373l5.667-5.062z"
                ></Path>
            </Svg>



        </View>
    )
}

export default Icon;