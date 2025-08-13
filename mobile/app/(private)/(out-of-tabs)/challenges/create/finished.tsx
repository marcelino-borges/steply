import Button from "@/components/button";
import Typography from "@/components/typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { useCreateChallenge } from "@/hooks/challenges";
import { useRouter } from "expo-router";
import { SendHorizonalIcon } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView, View, Image, StyleSheet } from "react-native";
import { Share } from "react-native";
import { Toast } from "toastify-react-native";

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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.icon}
          source={require("@/assets/images/person-exercise.png")}
        />
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
      </View>
      <View style={styles.buttonView}>
        <Button
          variant="ghost"
          color="primaryInverted"
          boldFont={false}
          onPress={openChallenge}
        >
          {t("challenge.seeChallenge")}
        </Button>
        <Button
          color="primaryInverted"
          onPress={share}
          rightElement={<SendHorizonalIcon color={COLORS.primary} size={16} />}
        >
          {t("challenge.invitePeople")}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    color: COLORS.contentBlack,
    flex: 1,
    paddingBottom: SPACING.md,
  },
  content: {
    marginTop: SPACING["2xl"],
    display: "flex",
    gap: SPACING[1],
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  icon: {
    width: 46,
    height: 50,
    marginBottom: SPACING[10],
  },
  buttonView: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
    width: "100%",
    display: "flex",
    gap: SPACING.md,
  },
});
