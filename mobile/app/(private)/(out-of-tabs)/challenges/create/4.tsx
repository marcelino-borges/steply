import React, { useEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Toast } from "toastify-react-native";
import { useTranslation } from "react-i18next";

import SteppedHeader from "@/components/stepped-header";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import Button from "@/components/button";
import { useCreateChallenge } from "@/hooks/challenges/create";
import { useGetRewardTypes } from "@/hooks/challenges/get-reward-types";
import Typography from "@/components/typography";
import RadioGroup from "@/components/radio-group";
import Skeleton from "@/components/base-skeleton";
import Switch from "@/components/switch";

const CreateChallenge4: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  const {
    challenge,
    setChallenge,
    selectedRewardType,
    setSelectedRewardType,
    isPending: isCreatingChallange,
  } = useCreateChallenge();

  const { data: rewardTypes, isFetching: isFetchingRewardTypes } =
    useGetRewardTypes();

  const hasFilledForm = !!selectedRewardType;

  const isLoadingScreen = isCreatingChallange;

  const handleContinue = async () => {
    if (challenge.startAt.getTime() > challenge.endAt.getTime()) {
      console.log(
        "------------- [ERROR] Challenge start date cannot be after end date"
      );
      Toast.error(t("challenge.startDateCannotBeAfterEnd"));
      return;
    }

    router.push("/(private)/(out-of-tabs)/challenges/create/5");
  };

  useEffect(() => {
    if (rewardTypes) {
      setSelectedRewardType(rewardTypes[0]);
    }
  }, [rewardTypes]);

  const rewardTypesOptions = useMemo(
    () =>
      rewardTypes?.map((type) => ({
        value: type.id.toString(),
        label: type.title,
        subLabel: type.description || undefined,
      })) ?? [],
    [rewardTypes]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <SteppedHeader
          title={t("challenge.rewardType")}
          foreground={COLORS.contentBlack}
          totalSteps={6}
          step={4}
        />
        <View style={styles.content}>
          {isFetchingRewardTypes ? (
            <View style={{ gap: SPACING[4] }}>
              <Skeleton width={width - SPACING[6] * 2} height={80} />
              <Skeleton width={width - SPACING[6] * 2} height={80} />
              <Skeleton width={width - SPACING[6] * 2} height={80} />
            </View>
          ) : (
            selectedRewardType && (
              <RadioGroup
                items={rewardTypesOptions}
                onSelect={(value: string) => {
                  const selected = rewardTypes?.find(
                    (type) => type.id.toString() === value
                  );
                  setSelectedRewardType(selected);
                }}
                selectedValue={selectedRewardType.id.toString()}
                fullWidth
                variant="outline"
              />
            )
          )}
          <Switch
            checked={challenge.multipleCheckIns}
            onChange={(newState: boolean) => {
              setChallenge({
                ...challenge,
                multipleCheckIns: newState,
              });
            }}
            label={t("challenge.multipleCheckInsLabel")}
            subLabel={t("challenge.multipleCheckInsSubLabel")}
            disabled={isFetchingRewardTypes}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Button
          loading={isLoadingScreen}
          disabled={!hasFilledForm || isFetchingRewardTypes}
          onPress={handleContinue}
        >
          {t("common.continue")}
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
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING[10],
    gap: SPACING[16],
  },
  buttonView: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
    width: "100%",
  },
});

export default CreateChallenge4;
