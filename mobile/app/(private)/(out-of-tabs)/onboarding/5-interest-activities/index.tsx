import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Toast } from "toastify-react-native";

import Button from "@/components/button";
import CheckboxGroup from "@/components/checkbox-group";
import Typography from "@/components/typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { useUser } from "@/store/user";
import { UserRegistrationStep } from "@/types/api/user";
import { useGetSuggestedActivities } from "@/hooks/suggestions/get-activities";
import { useUpdateUser } from "@/hooks/users/update";

export default function InterestActivities() {
  const { user, setUser } = useUser();
  const { t } = useTranslation();
  const router = useRouter();
  const updateUser = useUpdateUser();
  const {
    data: suggestedActivities,
    isLoading: isLoadingActivities,
    error,
  } = useGetSuggestedActivities();
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const maxSelections = 3;

  console.log("------ suggestedActivities", suggestedActivities);
  console.log("------ isLoadingActivities", isLoadingActivities);
  console.log("------ error", error);

  useEffect(() => {
    if (user?.activityInterests && suggestedActivities) {
      const selectedIds = user.activityInterests.map((interest) =>
        interest.id.toString()
      );
      setSelectedActivities(selectedIds);
    }
  }, [user, suggestedActivities]);

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
      const updatedUser = await updateUser.mutateAsync({
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
        nextRegistrationStep: UserRegistrationStep.FINGERPRINT_ACCESS,
      });

      setUser(updatedUser);
      router.push("/onboarding/6-fingerprint-access");
    } catch (error) {
      Toast.error(t("user.updateError"));
      console.error("Error updating activity interests:", error);
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
              suggestedActivities?.map((activity) => ({
                label: activity.title,
                subLabel: activity.description || undefined,
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
          loading={updateUser.isPending}
          disabled={updateUser.isPending}
        >
          {t("user.createAccount")}
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
    marginTop: SPACING[8],
    gap: SPACING[4],
  },
});
