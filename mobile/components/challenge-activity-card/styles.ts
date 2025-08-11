import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { StyleSheet } from "react-native";

export const challengeActivityCardStyles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.mutedLight,
    paddingVertical: SPACING[4],
  },
  textsContainer: {
    flex: 5,
    width: "80%",
  },
  iconscontainer: {
    flexDirection: "row",
    gap: SPACING[4],
    alignItems: "center",
  },
  datesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING[1],
  },
});
