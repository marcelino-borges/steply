import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { StyleSheet } from "react-native";
import { CHECKBOX_SIZE } from "./constants";
import { BORDER_WIDTH } from "@/constants/borders";
import { RADIUS } from "@/constants/radius";

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
    borderRadius: RADIUS["1/4"],
    borderWidth: BORDER_WIDTH.checkboxAndRadio,
    borderColor: COLORS.contentBlack,
    width: CHECKBOX_SIZE,
    height: CHECKBOX_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
});
