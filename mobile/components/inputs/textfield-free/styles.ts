import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_SIZE } from "@/constants/fonts";
import { SPACING } from "@/constants/spacings";
import { BORDER_WIDTH } from "@/constants/borders";

const textfieldStyles = StyleSheet.create({
  container: {
    position: "relative",
  },
  input: {
    height: SPACING[14],
    borderWidth: BORDER_WIDTH.input,
    borderColor: COLORS.inputBorder,
    borderRadius: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    fontSize: FONT_SIZE.base,
    fontFamily: "WorkSans_400Regular",
  },
  errorFont: {
    color: COLORS.destructive,
  },
  errorBorder: {
    borderColor: COLORS.destructive,
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
