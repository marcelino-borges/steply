import React, { PropsWithChildren } from "react";
import { Text } from "react-native";

import { FONT_SIZE, FONT_WEIGHT } from "@/constants/fonts";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";

interface TypographyProps {
  weight?: keyof typeof FONT_WEIGHT;
  size?: keyof typeof FONT_SIZE;
  color?: string;
  lineHeight?: number;
  letterSpacing?: number;
  italic?: boolean;
  align?: "auto" | "left" | "right" | "center" | "justify";
  underline?: boolean;
  onPress?: VoidFunction;
}

const Typography: React.FC<PropsWithChildren<TypographyProps>> = ({
  weight = 400,
  size = "base",
  color = COLORS.contentBlack,
  lineHeight = SPACING[6],
  letterSpacing = SPACING["1/8"],
  italic = false,
  align,
  underline = false,
  onPress,
  children,
}) => {
  return (
    <Text
      style={[
        { fontWeight: FONT_WEIGHT[weight] },
        { fontSize: FONT_SIZE[size] },
        { letterSpacing },
        { lineHeight },
        { color },
        { fontStyle: italic ? "italic" : "normal" },
        { textAlign: align },
        { textDecorationLine: underline ? "underline" : "none" },
      ]}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};

export default Typography;
