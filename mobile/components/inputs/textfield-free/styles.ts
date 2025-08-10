import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_SIZE } from "@/constants/fonts";
import { SPACING } from "@/constants/spacings";

const textfieldStyles = StyleSheet.create({
  container: {
    position: "relative",
  },
  input: {
    height: SPACING[14],
    borderWidth: SPACING["1/2"],
    borderColor: COLORS.inputBorder,
    borderRadius: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    fontSize: FONT_SIZE.base,
    fontFamily: "WorkSans_400Regular",
  },
  errorFont: {
    color: COLORS.error,
  },
  errorBorder: {
    borderColor: COLORS.error,
  },
  placeholderBase: {
    position: "absolute",
    top: SPACING.md,
    left: SPACING.md,
    display: "flex",
    flexDirection: "row",
    textAlign: "left",
    transformOrigin: "left",
  },
  rightElement: {
    position: "absolute",
    top: SPACING.md,
    right: SPACING.md,
  },
});

export default textfieldStyles;
