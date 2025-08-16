import React, { useEffect } from "react";
import { Href, Tabs, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

import { COLORS } from "@/constants/colors";
import { useUser } from "@/store/user";
import TabBarLabel from "@/components/tab-bar";
import { HomeIcon } from "lucide-react-native";
import { UserRegistrationStep } from "@/types/api/user";

export default function TabLayout() {
  const router = useRouter();
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (!isSignedIn || !user) {
      if (!user) signOut();
      router.replace("/(auth)/signin");
      return;
    }

    if (user.wantsAccountPersonalization) {
      const nextOnboardingStep = user.nextRegistrationStep;

      if (
        nextOnboardingStep &&
        nextOnboardingStep < UserRegistrationStep.ONBOARDING_COMPLETE
      ) {
        router.replace(
          `/(private)/(out-of-tabs)/onboarding/(steps)/${user.nextRegistrationStep}` as Href
        );
      }
    }
  }, [isSignedIn, user]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          tabBarLabel: ({ color }) => (
            <TabBarLabel color={color}>Home</TabBarLabel>
          ),
          tabBarIcon: ({ color, size }) => (
            <HomeIcon size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
