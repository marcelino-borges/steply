import { COLORS } from "@/constants/colors";
import { RADIUS } from "@/constants/radius";
import { SPACING } from "@/constants/spacings";
import { StyleSheet } from "react-native";

export const tabsHeaderStyles = StyleSheet.create({
  root: {
    borderRadius: RADIUS.sm,
    backgroundColor: `${COLORS.primary}30`,
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: SPACING[2],
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RADIUS.sm,
    minHeight: 32,
  },
});
