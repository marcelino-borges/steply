import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Text, View } from "react-native";

import { COLORS } from "@/constants/colors";
import { circularProgressStyles } from "./styles";

interface CircularProgressProps {
  size?: number;
  thickness?: number;
  progress?: number;
  total: number;
  onAnimationComplete?: VoidFunction;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 32,
  thickness = 4,
  progress = 0,
  total = 100,
  onAnimationComplete,
}) => {
  return (
    <AnimatedCircularProgress
      size={size}
      width={thickness}
      fill={(progress * 100) / total}
      tintColor={COLORS.primary}
      onAnimationComplete={onAnimationComplete}
      backgroundColor={COLORS.contentBlack + "08"}
      rotation={0}
    >
      {() => (
        <View style={circularProgressStyles.container}>
          <Text style={circularProgressStyles.text}>{progress}</Text>
          <Text style={circularProgressStyles.text}>/</Text>
          <Text style={circularProgressStyles.text}>{total}</Text>
        </View>
      )}
    </AnimatedCircularProgress>
  );
};

export default CircularProgress;
