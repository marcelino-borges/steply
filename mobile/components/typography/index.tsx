import React, { PropsWithChildren } from "react";
import { Text, TextStyle } from "react-native";

import { FONT_SIZE } from "@/constants/fonts";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { FontSize, FontWeight } from "@/types/app";
import { getFontFamily } from "@/utils/fonts";

interface TypographyProps {
  weight?: FontWeight;
  size?: FontSize;
  color?: string;
  lineHeight?: number;
  letterSpacing?: number;
  italic?: boolean;
  align?: "auto" | "left" | "right" | "center" | "justify";
  underline?: boolean;
  onPress?: VoidFunction;
  style?: TextStyle;
  numberOfLines?: number;
  pointerEvents?: "auto" | "none" | "box-none" | "box-only";
}

const Typography: React.FC<PropsWithChildren<TypographyProps>> = ({
  weight = "normal",
  size = "base",
  color = COLORS.contentBlack,
  lineHeight = SPACING[6],
  letterSpacing = SPACING["1/8"],
  italic = false,
  align,
  underline = false,
  onPress,
  style,
  children,
  numberOfLines,
  pointerEvents,
}) => {
  return (
    <Text
      style={[
        { fontFamily: getFontFamily(weight, italic) },
        { fontSize: FONT_SIZE[size] },
        { letterSpacing },
        { lineHeight },
        { color },
        { textAlign: align },
        underline && { textDecorationLine: "underline" },
        style,
      ]}
      onPress={onPress}
      numberOfLines={numberOfLines}
      pointerEvents={pointerEvents}
    >
      {children}
    </Text>
  );
};

export default Typography;
