import React, { useEffect } from "react";
import { Href, useRouter } from "expo-router";
import { LoadingScreen } from "@/components/loading-screen";
import { useUser } from "@/store/user";
import { UserRegistrationStep } from "@/types/api/user";

const STEPS_PATHS: Record<UserRegistrationStep, Href> = {
  [UserRegistrationStep.INFORM_WANTS_PERSONALIZATION]:
    "/(private)/(out-of-tabs)/onboarding/1-personalization" as Href,
  [UserRegistrationStep.GENDER]:
    "/(private)/(out-of-tabs)/onboarding/2-gender" as Href,
  [UserRegistrationStep.MAIN_GOAL]:
    "/(private)/(out-of-tabs)/onboarding/3-main-goal" as Href,
  [UserRegistrationStep.MAIN_GOAL_CURRENT_LEVEL]:
    "/(private)/(out-of-tabs)/onboarding/4-main-goal-level" as Href,
  [UserRegistrationStep.INTEREST_ACTIVITIES]:
    "/(private)/(out-of-tabs)/onboarding/5-interest-activities" as Href,
  [UserRegistrationStep.ONBOARDING_COMPLETE]: "/(private)/(tabs)/home" as Href,
  [UserRegistrationStep.PERSONAL_DATA]: "/(auth)/signup" as Href,
  [UserRegistrationStep.NONE]: "/(private)/(tabs)/home" as Href,
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
