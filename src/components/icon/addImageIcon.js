



import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';
import styles from './indexStyle';

const Icon = ({ style }) => {
    return (

        <View>

            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="137"
                height="137"
                fill="none"
                viewBox="0 0 137 137"
            >
                <Path
                    stroke="rgba(50,50, 50, 1)"

                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="10"
                    d="M35.377 119.5l51.709-48.668 24.334 24.334M35.377 119.5H96.21c10.079 0 18.25-8.171 18.25-18.25V70.832M35.377 119.5c-10.08 0-18.25-8.171-18.25-18.25V40.415c0-10.08 8.17-18.25 18.25-18.25h39.542m33.459 29.373V34.332m0 0V17.125m0 17.207H91.171m17.207 0h17.207M53.627 49.54a9.125 9.125 0 11-18.25 0 9.125 9.125 0 0118.25 0z"
                ></Path>
            </Svg>
        </View >
    )
}

export default Icon;