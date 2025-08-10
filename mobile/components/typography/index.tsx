import React, { PropsWithChildren } from "react";
import { Text, TextStyle } from "react-native";

import { FONT_SIZE } from "@/constants/fonts";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { FontSize, FontWeight } from "@/types/app";

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
  style,
  children,
  numberOfLines,
}) => {
  const getFontFamily = () => {
    let fontName = "WorkSans";

    const weightStrings: Record<string, string> = {
      thin: "_100Thin",
      extralight: "_200ExtraLight",
      light: "_300Light",
      normal: "_400Regular",
      medium: "_500Medium",
      semibold: "_600SemiBold",
      bold: "_700Bold",
      extrabold: "_800ExtraBold",
      black: "_900Black",
    };

    fontName += weightStrings[weight] ?? "_400Regular";

    if (italic) {
      fontName += "_Italic";
    }

    return fontName;
  };

  return (
    <Text
      style={[
        { fontFamily: getFontFamily() },
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
    >
      {children}
    </Text>
  );
};

export default Typography;
