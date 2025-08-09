import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { StyleSheet } from "react-native";

export const challengeTagStyles = StyleSheet.create({
  root: {
    backgroundColor: `${COLORS.primary}20`,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 9999,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  tagName: {
    maxWidth: "90%",
  },
});
