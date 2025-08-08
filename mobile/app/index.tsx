import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useUser } from "@/store/user";
import { UserRegistrationStep } from "@/types/api/user";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    // Check if user needs onboarding
    if (user && (
      user.nextRegistrationStep === UserRegistrationStep.INFORM_WANTS_PERSONALIZATION ||
      user.wantsAccountPersonalization
    )) {
      return <Redirect href="/(private)/(out-of-tabs)/onboarding" />;
    }
    return <Redirect href="/(private)/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/signin" />;
}
