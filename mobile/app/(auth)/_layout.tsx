import { Redirect, Slot } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { SPACING } from "@/constants/spacings";
import { COLORS } from "@/constants/colors";
import { useUser } from "@/store/user";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  if (isSignedIn && user) {
    console.log(
      "--------- AuthRoutesLayout: going to home, isSignedIn: ",
      isSignedIn,
      " user: ",
      user
    );
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView style={authStyles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={authStyles.container}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollView}
          style={{ width: "100%", position: "relative" }}
        >
          <Slot />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const authStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bgWhite },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  scrollView: {
    paddingHorizontal: SPACING.md,
    width: "100%",
    flex: 1,
  },
});
