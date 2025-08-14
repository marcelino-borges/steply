import { BORDER_WIDTH } from "@/constants/borders";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { StyleSheet } from "react-native";

const buttonStyles = StyleSheet.create({
  base: {
    height: SPACING[10],
    borderRadius: 100,
    textTransform: "capitalize",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.sm,
  },

  // Variants
  contained: {
    borderWidth: 0,
  },
  outlined: {
    borderWidth: BORDER_WIDTH.input,
    borderColor: COLORS.primary,
  },
  ghost: {
    color: COLORS.contentBlack,
    borderWidth: 0,
    backgroundColor: "transparent",
  },

  // Colors
  primary: {
    color: "white",
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  primaryInverted: {
    color: COLORS.primary,
    backgroundColor: COLORS.bgWhite,
  },
  secondary: {
    color: "white",
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary,
  },
  white: {
    color: COLORS.primary,
    backgroundColor: "white",
  },
});

export default buttonStyles;
