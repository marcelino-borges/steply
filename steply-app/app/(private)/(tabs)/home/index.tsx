import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import Button from "@/components/button";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { useAuth } from "@clerk/clerk-expo";

export default function TabHomeScreen() {
  const router = useRouter();
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          router.push("/challenges/create/0");
        }}
        fullWidth
      >
        Criar desafio
      </Button>
      <Button
        onPress={async () => {
          await signOut();
          router.push("/signin");
        }}
        fullWidth
      >
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
