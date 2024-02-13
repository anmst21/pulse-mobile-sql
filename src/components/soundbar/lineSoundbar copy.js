import React, { useRef } from "react";
import { Canvas, Line, vec } from "@shopify/react-native-skia";
import {
  View,
  TouchableOpacity,
  PanResponder,
  TouchableWithoutFeedback,
} from "react-native";

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS
} from 'react-native-reanimated';

const SoundBar = ({
  duration,
  playbackPosition,
  setPlaybackPosition,
  canvasWidth,
}) => {

  const canvasHeight = 20; // Height of the canvas, touchable area
  const lineHeight = 2; // Height of the line
  const lineY = canvasHeight / 2;



  const width = useSharedValue(0);

  const progressLineWidth = (playbackPosition / duration) * canvasWidth;

  return (


    <Canvas style={{ width: canvasWidth, height: canvasHeight }}>
      {/* Background line */}
      <Line
        p1={vec(0, lineY)}
        p2={vec(canvasWidth, lineY)}
        color="#555"
        style="stroke"
        strokeWidth={lineHeight}
        lineCap="round"
      />

      {/* Progress line */}
      <Line
        p1={vec(0, lineY)}
        p2={vec(width, lineY)}
        color="#fff"
        style="stroke"
        strokeWidth={lineHeight}
        lineCap="round"
      />
    </Canvas>
  );
};

export default SoundBar;
