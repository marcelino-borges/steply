import { SPACING } from "@/constants/spacings";
import { StatusBar, StyleSheet } from "react-native";

export const backOnlyHeaderStyles = StyleSheet.create({
  headerContainer: {
    marginTop: StatusBar.currentHeight,
    height: 44,
    justifyContent: "center",
    paddingHorizontal: SPACING[8],
  },
});
