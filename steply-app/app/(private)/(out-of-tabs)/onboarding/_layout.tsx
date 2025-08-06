import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function OnboardingScreenLayout() {
  console.log(" ---------------------- OnboardingLayout");

  return (
    <SafeAreaView style={onboardingStyles.safeArea}>
      <ScrollView
        style={onboardingStyles.scrollView}
        contentContainerStyle={onboardingStyles.scrollViewContent}
      >
        <Slot />
      </ScrollView>
    </SafeAreaView>
  );
}

const onboardingStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bgWhite },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  scrollView: {
    width: "100%",
    position: "relative",
  },
  scrollViewContent: {
    paddingHorizontal: SPACING.md,
    width: "100%",
    paddingBottom: SPACING[64],
    flex: 1,
  },
});
