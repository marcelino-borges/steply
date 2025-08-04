import { useEffect } from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/(private)/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/signin" />;
}