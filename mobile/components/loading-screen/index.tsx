import React from "react";
import { SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import { COLORS } from "@/constants/colors";
import Typography from "@/components/typography";
import { useTranslation } from "react-i18next";

export const LoadingScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size={80} color={COLORS.bgWhite} />
      <Typography>{t("common.loading")}</Typography>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    flex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
