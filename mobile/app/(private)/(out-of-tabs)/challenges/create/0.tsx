import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SteppedHeader from "@/components/stepped-header";
import Typography from "@/components/typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import Button from "@/components/button";
import { ASYNC_STORAGE_KEYS } from "@/constants/async-storage";
import { LoadingScreen } from "@/components/loading-screen";
import { useTranslation } from "react-i18next";

const CreateChallenge0: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [isCheckingDismissed, setIsCheckingDismissed] = useState(true);

  const setDontShowAgain = async () => {
    try {
      await AsyncStorage.setItem(
        ASYNC_STORAGE_KEYS.DISMISSED_CHALLENGE_CREATION_ONBOARDING,
        "true"
      );
      router.replace("/challenges/create/1");
    } catch (error) {
      console.error(
        "Error saving DISMISSED_CHALLENGE_CREATION_ONBOARDING to AsyncStorage:",
        error
      );
    }
  };

  useEffect(() => {
    const checkDontShowAgain = async () => {
      const dismissed = await AsyncStorage.getItem(
        ASYNC_STORAGE_KEYS.DISMISSED_CHALLENGE_CREATION_ONBOARDING
      );

      if (dismissed === "true") {
        router.replace("/challenges/create/1");
        return;
      }

      setIsCheckingDismissed(false);
    };

    checkDontShowAgain();
  }, []);

  if (isCheckingDismissed) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <SteppedHeader
        title={t("challenge.createYourChallenge")}
        foreground={COLORS.bgWhite}
      />
      <View style={styles.content}>
        <Image
          style={styles.icon}
          source={require("@/assets/images/person-exercise.png")}
        />
        <Typography
          size="3xl"
          weight="semibold"
          color={COLORS.bgWhite}
          lineHeight={SPACING[10]}
        >
          {t("challenge.createQuickly")}
        </Typography>
        <Typography color={COLORS.bgWhite}>
          {t("challenge.challengeCreationBriefing")}
        </Typography>
      </View>
      <View style={styles.buttonView}>
        <Button
          variant="ghost"
          color="primaryInverted"
          boldFont={false}
          onPress={setDontShowAgain}
        >
          {t("common.dontShowScreenAgain")}
        </Button>
        <Button
          color="primaryInverted"
          onPress={() => router.replace("/challenges/create/1")}
        >
          {t("challenge.createYourChallenge")}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    color: COLORS.contentBlack,
    flex: 1,
    paddingBottom: SPACING.md,
  },
  content: {
    marginTop: SPACING["2xl"],
    display: "flex",
    gap: SPACING[1],
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  icon: {
    width: 46,
    height: 50,
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

export default CreateChallenge0;
