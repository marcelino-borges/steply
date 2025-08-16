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
import { useGetGendersList } from "@/hooks/genders/get-list";
import { useUpdateUser } from "@/hooks/users/update";
import BackOnlyHeader from "@/components/headers/back-only-header";

export default function Gender() {
  const { user, setUser } = useUser();
  const { t } = useTranslation();
  const router = useRouter();
  const { updateUser, isUpdating } = useUpdateUser();
  const { data: genders, isLoading: isLoadingGenders } = useGetGendersList();
  const [selectedGender, setSelectedGender] = useState("");

  // Set initial selected value if user already has a gender
  useEffect(() => {
    if (user?.genderId && genders) {
      setSelectedGender(user.genderId.toString());
    }
  }, [user, genders]);

  const handleContinue = async () => {
    if (!selectedGender || !user) return;

    try {
      const updatedUser = await updateUser({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        countryId: user.countryId,
        acceptsCommunication: user.acceptsCommunication,
        wantsAccountPersonalization: user.wantsAccountPersonalization,
        genderId: parseInt(selectedGender),
        nextRegistrationStep: UserRegistrationStep.MAIN_GOAL,
      });

      setUser(updatedUser);
      router.replace("/(private)/(out-of-tabs)/onboarding/(steps)/3-main-goal");
    } catch (error) {
      Toast.error(t("user.updateError"));
      console.error("Error updating gender:", error);
    }
  };

  return (
    <View style={styles.container}>
      <BackOnlyHeader backTo="/(private)/(out-of-tabs)/onboarding/(steps)/1-personalization" />
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
          {t("user.howDoYouIdentifyGender")}
        </Typography>
        {isLoadingGenders ? (
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={{ marginTop: SPACING[8] }}
          />
        ) : (
          <RadioGroup
            items={
              genders?.map((gender) => ({
                label: gender.name,
                value: gender.id.toString(),
              })) || []
            }
            onSelect={(value) => setSelectedGender(value)}
            selectedValue={selectedGender}
            fullWidth
            variant="outlineAll"
          />
        )}
      </View>
      <View style={styles.bottomView}>
        <Button
          onPress={handleContinue}
          loading={isUpdating}
          disabled={!selectedGender || isUpdating}
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
