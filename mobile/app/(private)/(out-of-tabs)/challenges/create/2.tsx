import React, { useMemo } from "react";
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
import Button from "@/components/buttons/button";
import { useCreateChallenge } from "@/hooks/challenges/create";
import { useGetChallengeCheckInTypes } from "@/hooks/challenges";
import Typography from "@/components/typography";
import RadioGroup from "@/components/inputs/radio-group";
import Switch from "@/components/inputs/switch";
import Skeleton from "@/components/base-skeleton";

const CreateChallenge2: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  const { setChallenge, challenge } = useCreateChallenge();
  const { data: checkInTypes, isFetching: isFetchingCheckInTypes } =
    useGetChallengeCheckInTypes();

  const handleContinue = async () => {
    if (challenge.startAt.getTime() > challenge.endAt.getTime()) {
      console.log(
        "------------- [ERROR] Challenge start date cannot be after end date"
      );
      Toast.error(t("challenge.startDateCannotBeAfterEnd"));
      return;
    }

    router.push("/(private)/(out-of-tabs)/challenges/create/3");
  };

  const checkInTypesOptions = useMemo(
    () =>
      checkInTypes?.map((type) => ({
        value: type.code.toString(),
        label: type.name,
        subLabel: type.description,
      })) ?? [],
    [checkInTypes]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <SteppedHeader
          title={t("challenge.checkinFormat")}
          foreground={COLORS.contentBlack}
          totalSteps={6}
          step={2}
        />
        <View style={styles.content}>
          <Typography>
            <Typography>
              {t("challenge.howActivitiesWillBeDistributed")}
            </Typography>
            <Typography color={COLORS.destructive}>*</Typography>
          </Typography>
          {!isFetchingCheckInTypes ? (
            <RadioGroup
              items={checkInTypesOptions}
              onSelect={(value: string) => {
                setChallenge({
                  ...challenge,
                  checkInTypeCode: Number(value),
                });
              }}
              selectedValue={challenge.checkInTypeCode.toString()}
              fullWidth
              variant="outlineOnlySelected"
            />
          ) : (
            <View style={{ gap: SPACING[4] }}>
              <Skeleton width={width - SPACING[6] * 2} height={150} />
              <Skeleton width={width - SPACING[6] * 2} height={150} />
            </View>
          )}
          <Typography>
            <Typography>{t("challenge.howCheckInWillBeValidated")}</Typography>
            <Typography color={COLORS.destructive}>*</Typography>
          </Typography>
          <Switch
            disabled={isFetchingCheckInTypes}
            checked={challenge.checkInEndOfDay}
            onChange={(newState: boolean) => {
              setChallenge({
                ...challenge,
                checkInEndOfDay: newState,
              });
            }}
            label={"Para completar o dia"}
            subLabel={
              "Os participantes precisão concluir todas as atividades do dia para fazer o check-in. Se desmarcado, completar uma atividade já será suficiente para o check-in."
            }
          />
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Button onPress={handleContinue} disabled={isFetchingCheckInTypes}>
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
    gap: SPACING[8],
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING[10],
  },
  buttonView: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: COLORS.mutedLight,
  },
});

export default CreateChallenge2;
