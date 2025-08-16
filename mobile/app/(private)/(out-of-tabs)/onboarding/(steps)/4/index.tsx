import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Toast } from "toastify-react-native";

import Button from "@/components/buttons/button";
import RadioGroup from "@/components/inputs/radio-group";
import Typography from "@/components/typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { useUser } from "@/store/user";
import { UserRegistrationStep } from "@/types/api/user";
import { useGetUserMainGoalLevelsList } from "@/hooks/user-main-goal-levels/get-list";
import { useUpdateUser } from "@/hooks/users/update";
import BackOnlyHeader from "@/components/headers/back-only-header";

export default function MainGoalLevel() {
  const { user, setUser } = useUser();
  const { t } = useTranslation();
  const router = useRouter();
  const { updateUser, isUpdating } = useUpdateUser();
  const {
    data: userMainGoalLevels,
    isLoading: isLoadingLevels,
    error,
  } = useGetUserMainGoalLevelsList();
  const [selectedLevel, setSelectedLevel] = useState("");

  useEffect(() => {
    if (user?.mainGoalLevelId && userMainGoalLevels) {
      setSelectedLevel(user.mainGoalLevelId.toString());
    }
  }, [user, userMainGoalLevels]);

  const handleContinue = async () => {
    if (!selectedLevel || !user) return;

    try {
      const updatedUser = await updateUser({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        countryId: user.countryId,
        acceptsCommunication: user.acceptsCommunication,
        wantsAccountPersonalization: user.wantsAccountPersonalization,
        genderId: user.genderId,
        goalId: user.goalId,
        mainGoalLevelId: parseInt(selectedLevel),
        nextRegistrationStep: UserRegistrationStep.INTEREST_ACTIVITIES,
      });

      setUser(updatedUser);
      router.replace(
        "/(private)/(out-of-tabs)/onboarding/(steps)/5-interest-activities"
      );
    } catch (error) {
      Toast.error(t("user.updateError"));
      console.error("Error updating main goal level:", error);
    }
  };

  return (
    <View style={styles.container}>
      <BackOnlyHeader backTo="/(private)/(out-of-tabs)/onboarding/(steps)/3-main-goal" />
      <View style={styles.content}>
        <Typography
          weight="medium"
          size="xl"
          lineHeight={SPACING[10]}
          align="center"
          style={{
            marginBottom: SPACING[4],
          }}
        >
          {t("user.whatIsYourCurrentLevelInActivities")}
        </Typography>
        {isLoadingLevels ? (
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={{ marginTop: SPACING[8] }}
          />
        ) : (
          <RadioGroup
            items={
              userMainGoalLevels?.map((level) => ({
                label: level.name,
                subLabel: level.description,
                value: level.id.toString(),
              })) || []
            }
            onSelect={(value) => setSelectedLevel(value)}
            selectedValue={selectedLevel}
            fullWidth
            variant="outlineAll"
          />
        )}
      </View>
      <View style={styles.bottomView}>
        <Button
          onPress={handleContinue}
          loading={isUpdating}
          disabled={!selectedLevel || isUpdating}
        >
          {t("common.continue")}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    minHeight: "100%",
  },
  content: {
    justifyContent: "center",
  },
  bottomView: {
    paddingBottom: SPACING[14],
    gap: SPACING[4],
  },
});
