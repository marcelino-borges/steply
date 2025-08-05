import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { FONT_SIZE } from "@/constants/fonts";
import { RADIUS } from "@/constants/radius";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 150,
    gap: SPACING[8],
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  inputsContainer: {
    flexDirection: "row",
    gap: SPACING[1],
    width: "100%",
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    fontSize: FONT_SIZE["3xl"],
    borderRadius: RADIUS[4],
    backgroundColor: "white",
  },
  inputFocused: {
    borderColor: COLORS.primary,
  },
});
