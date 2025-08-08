import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import Button from "@/components/button";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { useAuth } from "@clerk/clerk-expo";
import { useUser } from "@/store/user";

export default function TabHomeScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { clearUser } = useUser();

  const handleSignOut = async () => {
    clearUser();
    await signOut();
    router.replace("/(auth)/signin");
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          router.push("/(private)/(out-of-tabs)/challenges/create/0");
        }}
        fullWidth
      >
        Criar desafio
      </Button>
      <Button onPress={handleSignOut} fullWidth>
        Sair
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.bgWhite,
    paddingHorizontal: SPACING["2xl"],
    gap: SPACING["2xl"],
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    color: COLORS.contentBlack,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
