import React, { useMemo } from "react";
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
import RadioGroup from "@/components/radio-group";
import { JoinMethod } from "@/types/api/challenges";

const CreateChallenge6: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const {
    setChallenge,
    challenge,
    isPending: isCreatingChallange,
    createChallenge,
  } = useCreateChallenge();

  const isLoadingScreen = isCreatingChallange;

  const handleContinue = async () => {
    try {
      await createChallenge?.();

      router.push("/(private)/(out-of-tabs)/challenges/create/finished");
    } catch (error) {
      console.log("Error creating challenge: ", error);
      Toast.error(t("challenge.errorCreating"));
    }
  };

  const options = useMemo(
    () =>
      Object.values(JoinMethod).map((method) => ({
        value: method,
        label: t(`challenge.joinMethods.${method.toLowerCase()}.name`),
        subLabel: t(
          `challenge.joinMethods.${method.toLowerCase()}.description`
        ),
      })),
    [t]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <SteppedHeader
          title={t("challenge.createAndShare")}
          foreground={COLORS.contentBlack}
          totalSteps={6}
          step={6}
        />
        <View style={styles.content}>
          <RadioGroup
            items={options}
            onSelect={(value: string) => {
              setChallenge({ ...challenge, joinMethod: value as JoinMethod });
            }}
            selectedValue={challenge.joinMethod}
            variant="outlineOnlySelected"
          />
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Button loading={isLoadingScreen} onPress={handleContinue}>
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
    paddingBottom: SPACING.lg,
    width: "100%",
  },
});

export default CreateChallenge6;
