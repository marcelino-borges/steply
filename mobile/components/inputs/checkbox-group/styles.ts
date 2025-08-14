import { SPACING } from "@/constants/spacings";
import { StyleSheet } from "react-native";

export const checkboxGroupStyles = StyleSheet.create({
  root: {
    flexDirection: "row",
    gap: SPACING[4],
    flexWrap: "wrap",
  },
});