import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Toast } from "toastify-react-native";

import Button from "@/components/button";
import RadioGroup from "@/components/radio-group";
import Typography from "@/components/typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { useUser } from "@/store/user";
import { UserRegistrationStep } from "@/types/api/user";
import { useGetUserGoalsList } from "@/hooks/user-goals/get-list";
import { useUpdateUser } from "@/hooks/users/update";

export default function MainGoal() {
  const { user, setUser } = useUser();
  const { t } = useTranslation();
  const router = useRouter();
  const updateUser = useUpdateUser();
  const { data: userGoals, isLoading: isLoadingGoals } = useGetUserGoalsList();
  const [selectedGoal, setSelectedGoal] = useState("");

  useEffect(() => {
    if (user?.goalId && userGoals) {
      setSelectedGoal(user.goalId.toString());
    }
  }, [user, userGoals]);

  const handleContinue = async () => {
    if (!selectedGoal || !user) return;

    try {
      const updatedUser = await updateUser.mutateAsync({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        countryId: user.countryId,
        acceptsCommunication: user.acceptsCommunication,
        wantsAccountPersonalization: user.wantsAccountPersonalization,
        genderId: user.genderId,
        goalId: parseInt(selectedGoal),
        nextRegistrationStep: UserRegistrationStep.MAIN_GOAL_CURRENT_LEVEL,
      });

      setUser(updatedUser);
      router.push("/onboarding/4-main-goal-level");
    } catch (error) {
      Toast.error(t("user.updateError"));
      console.error("Error updating main goal:", error);
    }
  };

  return (
    <View style={styles.container}>
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
          {t("user.whatIsYourMainGoal")}
        </Typography>
        {isLoadingGoals ? (
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={{ marginTop: SPACING[8] }}
          />
        ) : (
          <RadioGroup
            items={
              userGoals?.map((goal) => ({
                label: goal.name,
                value: goal.id.toString(),
              })) || []
            }
            onSelect={(value) => setSelectedGoal(value)}
            selectedValue={selectedGoal}
            fullWidth
            variant="outline"
          />
        )}
      </View>
      <View style={styles.bottomView}>
        <Button
          onPress={handleContinue}
          loading={updateUser.isPending}
          disabled={!selectedGoal || updateUser.isPending}
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
    marginTop: 175,
  },
  bottomView: {
    paddingBottom: SPACING[14],
    gap: SPACING[4],
  },
});
