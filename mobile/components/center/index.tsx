import React, { PropsWithChildren } from "react";
import { useWindowDimensions, View } from "react-native";
import { centerStyles } from "./styles";

interface CenterProps extends PropsWithChildren {
  fullscreen?: boolean;
}

export default function Center({ fullscreen, children }: CenterProps) {
  const { width, height } = useWindowDimensions();
  return (
    <View style={[centerStyles.root, fullscreen && { width, height }]}>
      {children}
    </View>
  );
}
