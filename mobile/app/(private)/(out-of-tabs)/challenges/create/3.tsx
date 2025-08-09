import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Toast } from "toastify-react-native";
import { useTranslation } from "react-i18next";

import SteppedHeader from "@/components/stepped-header";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import Button from "@/components/button";
import { useCreateChallenge } from "@/hooks/challenges/create";

const CreateChallenge3: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const {
    setChallenge,
    challenge,
    isPending: isCreatingChallange,
  } = useCreateChallenge();

  const hasFilledForm =
    challenge.title.length > 4 && challenge.description.length > 10;

  const isLoadingScreen = isCreatingChallange;

  const handleContinue = async () => {
    if (challenge.startAt.getTime() > challenge.endAt.getTime()) {
      console.log(
        "------------- [ERROR] Challenge start date cannot be after end date"
      );
      Toast.error(t("challenge.startDateCannotBeAfterEnd"));
      return;
    }

    router.push("/(private)/(out-of-tabs)/challenges/create/4");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <SteppedHeader
          title={t("challenge.details")}
          foreground={COLORS.contentBlack}
          totalSteps={6}
          step={1}
        />
        <View style={styles.content}></View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Button
          loading={isLoadingScreen}
          disabled={!hasFilledForm}
          onPress={handleContinue}
        >
          {t("common.next")}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgWhite,
    color: COLORS.contentBlack,
    flex: 1,
    paddingBottom: SPACING[8],
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: SPACING[10],
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING[10],
  },
  buttonView: {
    paddingHorizontal: SPACING.md,
    width: "100%",
  },
});

export default CreateChallenge3;
