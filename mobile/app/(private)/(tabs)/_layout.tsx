import React, { useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

import { COLORS } from "@/constants/colors";
import { useUser } from "@/store/user";
import TabBarLabel from "@/components/tab-bar";
import Feather from "@expo/vector-icons/Feather";

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
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
