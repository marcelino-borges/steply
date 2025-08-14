import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Toast } from "toastify-react-native";

import Button from "@/components/buttons/button";
import CheckboxGroup from "@/components/inputs/checkbox-group";
import Typography from "@/components/typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { useUser } from "@/store/user";
import { UserRegistrationStep } from "@/types/api/user";
import { useUpdateUser } from "@/hooks/users/update";
import { useAddUserActivities } from "@/hooks/users/add-activities";
import BackOnlyHeader from "@/components/headers/back-only-header";
import { useGetInterestActivities } from "@/hooks/interests/get-activities";
import { useRouter } from "expo-router";

export default function InterestActivities() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const { t } = useTranslation();
  const { updateUser, isUpdating } = useUpdateUser();
  const { addActivities, isAddingActivities } = useAddUserActivities();
  const { activities, isLoadingActivities } = useGetInterestActivities();
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const maxSelections = 3;

  useEffect(() => {
    if (user?.activityInterests && activities) {
      const selectedIds = user.activityInterests.map((interest) =>
        interest.id.toString()
      );
      setSelectedActivities(selectedIds);
    }
  }, [user, activities]);

  const handleToggle = (value: string) => {
    setSelectedActivities((prev) => {
      if (prev.includes(value)) {
        return prev.filter((id) => id !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleContinue = async () => {
    if (!user) return;

    try {
      // First, add the selected activities to the user
      if (selectedActivities.length > 0) {
        const activityIds = selectedActivities.map((id) => parseInt(id, 10));
        await addActivities({
          userId: user.id,
          activityIds,
        });
      }
    } catch (error) {
      Toast.error((error as Error).message);
      console.error("Error updating activity interests:", error);
    }

    try {
      // Then update the user to the next registration step
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
        mainGoalLevelId: user.mainGoalLevelId,
        nextRegistrationStep: UserRegistrationStep.ONBOARDING_COMPLETE,
      });

      setUser(updatedUser);
      router.replace("/(private)/(tabs)/home");
    } catch (error) {
      Toast.error((error as Error).message);
      console.error("Error updating activity interests:", error);
    }
  };

  return (
    <View style={styles.container}>
      <BackOnlyHeader backTo="/(private)/(out-of-tabs)/onboarding/(steps)/4-main-goal-level" />
      <View style={styles.content}>
        <Typography
          weight="medium"
          size="xl"
          lineHeight={SPACING[10]}
          align="center"
          style={{
            marginBottom: SPACING[2],
          }}
        >
          {t("user.whatActivitiesInterestYou")}
        </Typography>
        <Typography
          color={COLORS.gray}
          align="center"
          style={{
            marginBottom: SPACING[6],
          }}
        >
          {t("user.selectUpTo", { count: maxSelections })}
        </Typography>
        {isLoadingActivities ? (
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={{ marginTop: SPACING[8] }}
          />
        ) : (
          <CheckboxGroup
            items={
              activities?.map((activity) => ({
                label: activity.name,
                value: activity.id.toString(),
              })) || []
            }
            onToggle={handleToggle}
            selectedValues={selectedActivities}
            maxSelections={maxSelections}
            fullWidth
            variant="outline"
          />
        )}
      </View>
      <View style={styles.bottomView}>
        <Button
          onPress={handleContinue}
          loading={isUpdating || isAddingActivities}
        >
          {t("common.finish")}
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
    marginTop: SPACING[8],
    gap: SPACING[4],
  },
});
