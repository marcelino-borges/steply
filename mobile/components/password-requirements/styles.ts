import { StyleSheet } from "react-native";
import { SPACING } from "@/constants/spacings";

export const styles = StyleSheet.create({
  container: {
    gap: SPACING[2],
    paddingVertical: SPACING[2],
  },
  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING[2],
  },
});