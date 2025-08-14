import { useGetUser } from "@/hooks/users/get";
import { useUser } from "@/store/user";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function PrivateLayout() {
  const { setUser, user } = useUser();

  const { userData } = useGetUser(
    {
      userId: user?.id ?? 0,
    },
    !!user
  );

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(out-of-tabs)" />
    </Stack>
  );
}
