import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_SIZE } from "@/constants/fonts";
import { SPACING } from "@/constants/spacings";

export const tagsfieldStyles = StyleSheet.create({
  root: {
    gap: SPACING[2],
  },
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
  tagsContainer: {
    flexDirection: "row",
    gap: SPACING.xs,
    flexWrap: "wrap",
  },
});
