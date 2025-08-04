import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const circularProgressStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 10,
    color: COLORS.primary,
  },
});
