import { LoadingScreen } from "@/components/loading-screen";
import { useUser } from "@/store/user";
import { UserRegistrationStep } from "@/types/api/user";
import { Href, useRouter } from "expo-router";
import React, { useEffect } from "react";

const STEPS_PATHS: Record<UserRegistrationStep, Href> = {
  [UserRegistrationStep.INFORM_WANTS_PERSONALIZATION]:
    "./onboarding/1-personalization",
  [UserRegistrationStep.GENDER]: "./onboarding/2-gender",
  [UserRegistrationStep.MAIN_GOAL]: "./onboarding/3-main-goal",
  [UserRegistrationStep.MAIN_GOAL_CURRENT_LEVEL]:
    "./onboarding/4-main-goal-level",
  [UserRegistrationStep.INTEREST_ACTIVITIES]:
    "/onboarding/5-interest-activities",
  [UserRegistrationStep.FINGERPRINT_ACCESS]: "./onboarding/fingerprint-access",
  [UserRegistrationStep.PERSONAL_DATA]: "/signup",
  [UserRegistrationStep.NONE]: "/home",
};

export default function OnboardingScreen() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user?.nextRegistrationStep) return;

    router.replace(STEPS_PATHS[user.nextRegistrationStep]);
  }, [user]);

  return <LoadingScreen />;
}
