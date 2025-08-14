import HighlightedMessageAction from "@/components/highlighted-message-action";
import Typography from "@/components/typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { useUser } from "@/store/user";
import { UserRegistrationStep } from "@/types/api/user";
import { useUpdateUser } from "@/hooks/users/update";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Toast } from "toastify-react-native";
import { useTranslation } from "react-i18next";
import { TrophyIcon } from "lucide-react-native";

enum LoadingAction {
  NONE = 0,
  ACCEPT = 1,
  REJECT = 2,
}

export default function PersonalizationPreference() {
  const { user, setUser } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
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

      const updatedUser = await updateUser({
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
        router.replace("/(private)/(out-of-tabs)/onboarding/(steps)/2-gender");
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
    <HighlightedMessageAction
      variant="inverted"
      icon={<TrophyIcon size={40} />}
      content={
        <>
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
        </>
      }
      primaryAction={{
        label: t("user.personalizeExperience"),
        onPress: handleAccept,
        loading: isUpdating && loadingAction === LoadingAction.ACCEPT,
      }}
      secondaryAction={{
        label: t("user.preferNotPersonalizeExperience"),
        onPress: handleReject,
        variant: "ghost",
        color: "primaryInverted",
        customStyle: { color: "primary" },
        loading: isUpdating && loadingAction === LoadingAction.REJECT,
      }}
    />
  );
}
