import { useRouter } from "expo-router";
import { SendHorizonalIcon } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Share } from "react-native";
import { Toast } from "toastify-react-native";
import HighlightedMessageAction from "@/components/highlighted-message-action";
import Typography from "@/components/typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { useCreateChallenge } from "@/hooks/challenges";

export default function ChallengeCreated() {
  const router = useRouter();
  const { t } = useTranslation();
  const { createdChallenge, clearAllStates } = useCreateChallenge();

  const openChallenge = () => {
    if (!createdChallenge) return;

    const challengeId = createdChallenge.id;
    clearAllStates();

    router.replace(`/challenges/${challengeId}`);
  };

  const share = async () => {
    console.log("createdChallenge", JSON.stringify(createdChallenge, null, 2));
    if (!createdChallenge) return;

    const url = `${process.env.EXPO_PUBLIC_DEEP_LINK_URL}/challenges/${createdChallenge.id}/invite`;

    try {
      await Share.share(
        {
          title: t("challenge.invitePeople"),
          message: t("challenge.shareChallengeUrl", {
            url,
          }),
          url,
        },
        {
          dialogTitle: t("challenge.invitePeople"),
        }
      );
    } catch (error) {
      Toast.error((error as Error).message);
    }
  };

  return (
    <HighlightedMessageAction
      content={
        <>
          <Typography
            size="3xl"
            weight="semibold"
            color={COLORS.bgWhite}
            lineHeight={SPACING[10]}
          >
            {t("challenge.challengeCreatedTitle")}
          </Typography>
          <Typography color={COLORS.bgWhite}>
            {t("challenge.challengeCreatedSubtitle")}
          </Typography>
        </>
      }
      primaryAction={{
        label: t("challenge.invitePeople"),
        onPress: share,
        rightElement: <SendHorizonalIcon color={COLORS.primary} size={16} />,
      }}
      secondaryAction={{
        label: t("challenge.seeChallenge"),
        onPress: openChallenge,
      }}
    />
  );
}
