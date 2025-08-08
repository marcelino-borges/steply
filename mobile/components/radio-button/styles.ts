import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { StyleSheet } from "react-native";
import { RADIO_BUTTON_SIZE } from "./constants";

export const radioButtonStyles = StyleSheet.create({
  root: {
    flexDirection: "row",
    gap: SPACING[4],
    alignItems: "center",
    width: "auto",
    alignSelf: "flex-start",
  },
  outerCircle: {
    borderRadius: 9999,
    borderWidth: 1.5,
    borderColor: COLORS.contentBlack,
    width: RADIO_BUTTON_SIZE,
    height: RADIO_BUTTON_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    backgroundColor: COLORS.primary,
    borderRadius: 9999,
    width: RADIO_BUTTON_SIZE * 0.45,
    height: RADIO_BUTTON_SIZE * 0.45,
  },
});
