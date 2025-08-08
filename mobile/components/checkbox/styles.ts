import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { StyleSheet } from "react-native";
import { CHECKBOX_SIZE } from "./constants";

export const checkboxStyles = StyleSheet.create({
  root: {
    flexDirection: "row",
    gap: SPACING[4],
    alignItems: "center",
    width: "auto",
    alignSelf: "flex-start",
  },
  labelContainer: {
    flex: 1,
    flexShrink: 1,
  },
  outerBox: {
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: COLORS.contentBlack,
    width: CHECKBOX_SIZE,
    height: CHECKBOX_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
});
