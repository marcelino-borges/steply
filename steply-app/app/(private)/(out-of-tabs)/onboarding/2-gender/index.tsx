import Typography from "@/components/typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { useUser } from "@/store/user";
import { UserRegistrationStep } from "@/types/api/user";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function Gender() {
  const { user } = useUser();

  return (
    <SafeAreaView style={authStyles.safeArea}>
      <ScrollView
        contentContainerStyle={authStyles.scrollView}
        style={{ width: "100%", position: "relative" }}
      >
        <Typography>Gender</Typography>
      </ScrollView>
    </SafeAreaView>
  );
}

const authStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bgWhite },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  scrollView: {
    paddingHorizontal: SPACING.md,
    width: "100%",
    paddingBottom: SPACING[64],
    flex: 1,
  },
});
