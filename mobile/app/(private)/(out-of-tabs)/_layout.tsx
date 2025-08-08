import { Stack } from "expo-router";

export default function OutOfTabsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="challenges/create" />
    </Stack>
  );
}