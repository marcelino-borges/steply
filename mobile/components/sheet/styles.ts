import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { RADIUS } from "@/constants/radius";
import { SPACING } from "@/constants/spacings";

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  modalView: {
    backgroundColor: "white",
    borderTopStartRadius: RADIUS.md,
    borderTopEndRadius: RADIUS.md,
    paddingHorizontal: SPACING[6],
    paddingVertical: SPACING[8],
    width: "100%",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: COLORS.muted,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  content: {
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING[6],
  },
  contentNoTitle: {
    paddingVertical: SPACING[6],
    paddingTop: 0,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  actionsContainer: {
    flex: 0,
    gap: SPACING[4],
    maxWidth: "100%",
  },
});
