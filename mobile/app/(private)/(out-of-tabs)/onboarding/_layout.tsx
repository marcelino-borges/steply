import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export default function OnboardingScreenLayout() {
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
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bgWhite,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
