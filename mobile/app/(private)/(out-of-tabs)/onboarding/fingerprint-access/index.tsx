import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Button from "@/components/button";
import Typography from "@/components/typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { useUser } from "@/store/user";
import { UserRegistrationStep } from "@/types/api/user";
import { useUpdateUser } from "@/hooks/users/update";

export default function FingerprintAccess() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const updateUser = useUpdateUser();

  const handleCompleteOnboarding = async () => {
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
        nextRegistrationStep: UserRegistrationStep.NONE,
      });

      setUser(updatedUser);
      router.replace("/(private)/(tabs)/home");
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MaterialCommunityIcons
          name="face-recognition"
          size={48}
          color="white"
        />

        <Typography
          weight="medium"
          size="3xl"
          color="white"
          style={styles.title}
          lineHeight={SPACING[10]}
        >
          Facilitar seu acesso com biometria?
        </Typography>

        <Typography
          color="white"
          style={styles.subtitle}
          lineHeight={SPACING[6]}
        >
          Use impressão digital ou reconhecimento facial para entrar de forma
          rápida e segura no app.
        </Typography>
      </View>

      <View style={styles.bottomSection}>
        <Button onPress={handleCompleteOnboarding} variant="ghost">
          Agora não
        </Button>

        <Button
          fullWidth
          onPress={handleCompleteOnboarding}
          loading={updateUser.isPending}
          disabled={updateUser.isPending}
          customStyle={{
            backgroundColor: "white",
            color: "primary",
          }}
        >
          Ativar biometria
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    marginTop: SPACING[10],
    marginBottom: SPACING[2],
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  bottomSection: {
    paddingBottom: SPACING[4],
    gap: SPACING[4],
    width: "100%",
  },
});
