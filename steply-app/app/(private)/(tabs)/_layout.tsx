import React from "react";
import { Link, Redirect, Tabs } from "expo-router";
import { Pressable, Text } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

import { COLORS } from "@/constants/colors";

export default function TabLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href="/(auth)/signin" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        // options={{
        //   title: "Início",
        //   tabBarIcon: ({ color }) => <Text style={{ color: "red" }}>asd</Text>,
        //   headerRight: () => (
        //     <Link href="/home" asChild>
        //       <Pressable>
        //         {({ pressed }) => (
        //           <FontAwesome
        //             name="info-circle"
        //             size={25}
        //             color={COLORS.black}
        //             style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
        //           />
        //         )}
        //       </Pressable>
        //     </Link>
        //   ),
        // }}
      />
    </Tabs>
    // <Text>Oie</Text>
  );
}
