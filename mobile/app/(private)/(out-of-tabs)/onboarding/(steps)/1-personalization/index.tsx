import Button from "@/components/button";
import Typography from "@/components/typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { useUser } from "@/store/user";
import { UserRegistrationStep } from "@/types/api/user";
import { useUpdateUser } from "@/hooks/users/update";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Toast } from "toastify-react-native";
import { useTranslation } from "react-i18next";

enum LoadingAction {
  NONE = 0,
  ACCEPT = 1,
  REJECT = 2,
}

export default function PersonalizationPreference() {
  const { user, setUser } = useUser();
  const updateUser = useUpdateUser();
  const router = useRouter();
  const { t } = useTranslation();

  const [loadingAction, setLoadingAction] = useState<LoadingAction>(
    LoadingAction.NONE
  );

  const handleUpdateUser = async (wantsPersonalization: boolean) => {
    if (!user) {
      setLoadingAction(LoadingAction.NONE);
      return;
    }

    try {
      const nextStep = wantsPersonalization
        ? UserRegistrationStep.GENDER
        : UserRegistrationStep.NONE;

      const updatedUser = await updateUser.mutateAsync({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        countryId: user.countryId,
        acceptsCommunication: user.acceptsCommunication,
        wantsAccountPersonalization: wantsPersonalization,
        nextRegistrationStep: nextStep,
      });

      setUser(updatedUser);

      if (wantsPersonalization) {
        router.replace("/(private)/(out-of-tabs)/onboarding/2-gender");
      } else {
        router.replace("/(private)/(tabs)/home");
      }
    } catch (error) {
      Toast.error("Erro ao atualizar preferências");
      console.error("Error updating user preferences:", error);
      setLoadingAction(LoadingAction.NONE);
    }
  };

  const handleReject = () => {
    setLoadingAction(LoadingAction.REJECT);
    handleUpdateUser(false);
  };

  const handleAccept = () => {
    setLoadingAction(LoadingAction.ACCEPT);
    handleUpdateUser(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons
          name="trophy-outline"
          size={40}
          style={{ marginBottom: SPACING[10] }}
        />

        {user && (
          <Typography weight="medium" size="3xl" lineHeight={SPACING[10]}>
            {user.name.split(" ")[0]},{" "}
          </Typography>
        )}
        <Typography>
          <Typography weight="medium" size="3xl" lineHeight={SPACING[10]}>
            {user
              ? t("user.thisXpIsAbout").toLowerCase()
              : t("user.thisXpIsAbout")}{" "}
          </Typography>
          <Typography
            weight="medium"
            size="3xl"
            lineHeight={SPACING[10]}
            color={COLORS.primary}
          >
            {t("common.you")}
          </Typography>
        </Typography>
        <Typography lineHeight={SPACING[6]} style={{ marginTop: SPACING[2] }}>
          {t("user.showPersonalizedOffersChallengesContents")}
        </Typography>
      </View>
      <View style={styles.bottomView}>
        <Button
          onPress={handleReject}
          variant="ghost"
          color="primaryInverted"
          loading={
            updateUser.isPending && loadingAction === LoadingAction.REJECT
          }
        >
          {t("user.preferNotPersonalizeExperience")}
        </Button>
        <Button
          onPress={handleAccept}
          loading={
            updateUser.isPending && loadingAction === LoadingAction.ACCEPT
          }
        >
          {t("user.personalizeExperience")}
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
