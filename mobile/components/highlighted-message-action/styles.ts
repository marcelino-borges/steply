import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    color: COLORS.contentBlack,
    flex: 1,
    paddingBottom: SPACING.md,
  },
  containerInverted: {
    backgroundColor: COLORS.bgWhite,
  },
  content: {
    marginTop: SPACING["2xl"],
    display: "flex",
    gap: SPACING[1],
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  iconContainer: {
    marginBottom: SPACING[10],
  },
  buttonView: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
    width: "100%",
    display: "flex",
    gap: SPACING.md,
  },
});