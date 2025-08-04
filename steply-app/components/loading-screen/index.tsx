import React, { useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import { COLORS } from "@/constants/colors";

export const LoadingScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size={80} color={COLORS.bgWhite} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    flex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
