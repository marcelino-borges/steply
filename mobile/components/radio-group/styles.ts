import { SPACING } from "@/constants/spacings";
import { StyleSheet } from "react-native";

export const radioGroupStyles = StyleSheet.create({
  root: {
    flexDirection: "row",
    gap: SPACING[4],
    flexWrap: "wrap",
  },
});
