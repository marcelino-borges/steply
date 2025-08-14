import { BORDER_WIDTH } from "@/constants/borders";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { StyleSheet } from "react-native";

export const attachButtonStyles = StyleSheet.create({
  labelIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  container: {
    height: SPACING[14],
    borderWidth: BORDER_WIDTH.input,
    borderColor: COLORS.inputBorder,
    borderRadius: SPACING.sm,
    paddingHorizontal: SPACING.md,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
