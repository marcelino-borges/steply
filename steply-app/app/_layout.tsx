import { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { useFonts } from "@expo-google-fonts/work-sans/useFonts";
import { Stack, usePathname, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { WorkSans_100Thin } from "@expo-google-fonts/work-sans/100Thin";
import { WorkSans_200ExtraLight } from "@expo-google-fonts/work-sans/200ExtraLight";
import { WorkSans_300Light } from "@expo-google-fonts/work-sans/300Light";
import { WorkSans_400Regular } from "@expo-google-fonts/work-sans/400Regular";
import { WorkSans_500Medium } from "@expo-google-fonts/work-sans/500Medium";
import { WorkSans_600SemiBold } from "@expo-google-fonts/work-sans/600SemiBold";
import { WorkSans_700Bold } from "@expo-google-fonts/work-sans/700Bold";
import { WorkSans_800ExtraBold } from "@expo-google-fonts/work-sans/800ExtraBold";
import { WorkSans_900Black } from "@expo-google-fonts/work-sans/900Black";
import { WorkSans_100Thin_Italic } from "@expo-google-fonts/work-sans/100Thin_Italic";
import { WorkSans_200ExtraLight_Italic } from "@expo-google-fonts/work-sans/200ExtraLight_Italic";
import { WorkSans_300Light_Italic } from "@expo-google-fonts/work-sans/300Light_Italic";
import { WorkSans_400Regular_Italic } from "@expo-google-fonts/work-sans/400Regular_Italic";
import { WorkSans_500Medium_Italic } from "@expo-google-fonts/work-sans/500Medium_Italic";
import { WorkSans_600SemiBold_Italic } from "@expo-google-fonts/work-sans/600SemiBold_Italic";
import { WorkSans_700Bold_Italic } from "@expo-google-fonts/work-sans/700Bold_Italic";
import { WorkSans_800ExtraBold_Italic } from "@expo-google-fonts/work-sans/800ExtraBold_Italic";
import { WorkSans_900Black_Italic } from "@expo-google-fonts/work-sans/900Black_Italic";
import { ClerkProvider } from "@clerk/clerk-expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ToastManager from "toastify-react-native";
import { QueryClientProvider } from "@tanstack/react-query";
export { ErrorBoundary } from "expo-router";
import "react-native-reanimated";
import "react-native-get-random-values";

import "@/localization/i18n";

import { queryClient } from "@/config/react-query";
import { StatusBar } from "react-native";
import { COLORS } from "@/constants/colors";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const pathname = usePathname();
  console.debug("pathname", pathname);
  const [loaded, error] = useFonts({
    WorkSans_100Thin,
    WorkSans_200ExtraLight,
    WorkSans_300Light,
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
    WorkSans_800ExtraBold,
    WorkSans_900Black,
    WorkSans_100Thin_Italic,
    WorkSans_200ExtraLight_Italic,
    WorkSans_300Light_Italic,
    WorkSans_400Regular_Italic,
    WorkSans_500Medium_Italic,
    WorkSans_600SemiBold_Italic,
    WorkSans_700Bold_Italic,
    WorkSans_800ExtraBold_Italic,
    WorkSans_900Black_Italic,
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <ToastManager />
        <StatusBar backgroundColor={COLORS.bgWhite} barStyle="dark-content" />
        <ClerkProvider
          tokenCache={tokenCache}
          publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="(private)/(tabs)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </ClerkProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
