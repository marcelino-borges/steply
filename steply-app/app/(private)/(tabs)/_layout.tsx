import React, { useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import { useAuth, useUser as useClerkUser } from "@clerk/clerk-expo";

import { COLORS } from "@/constants/colors";
import { useUser } from "@/store/user";
import { UserRegistrationStep } from "@/types/api/user";
import { useGetUser } from "@/hooks/users/get";
import Typography from "@/components/typography";
import Center from "@/components/center";
import TabBarLabel from "@/components/tab-bar";
import Feather from "@expo/vector-icons/Feather";

export default function TabLayout() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { user, setUser } = useUser();
  const { user: clerkUser } = useClerkUser();

  const clerkEmail = clerkUser?.emailAddresses[0].emailAddress;

  const {
    data: fetchedUser,
    isLoading: isFetchingUser,
    error,
  } = useGetUser({ email: clerkEmail! }, isSignedIn && !!clerkEmail);

  useEffect(() => {
    if (!isSignedIn) router.push("/(auth)/signin");
  }, [isSignedIn]);

  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser);

      console.log("---------- fetchedUser:", fetchedUser);
      console.log(
        "---------- nextRegistrationStep:",
        fetchedUser.nextRegistrationStep
      );
      console.log(
        "---------- INFORM_WANTS_PERSONALIZATION:",
        UserRegistrationStep.INFORM_WANTS_PERSONALIZATION
      );
      console.log(
        "---------- Condition result:",
        fetchedUser.nextRegistrationStep ===
          UserRegistrationStep.INFORM_WANTS_PERSONALIZATION
      );

      if (
        fetchedUser.nextRegistrationStep ===
        UserRegistrationStep.INFORM_WANTS_PERSONALIZATION
      ) {
        console.log("---------- Going to onboarding");
        router.push("../(out-of-tabs)/onboarding/1-personalization");
      }
    }
  }, [fetchedUser]);

  if (error) {
    return (
      <Center>
        <Typography>
          {(error.response?.data as any)?.message ?? error.message}
        </Typography>
      </Center>
    );
  }

  if (isFetchingUser || !user) {
    return null;
  }

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
