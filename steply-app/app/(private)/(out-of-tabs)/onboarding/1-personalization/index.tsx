import Button from "@/components/button";
import Typography from "@/components/typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { useUser } from "@/store/user";
import { UserRegistrationStep } from "@/types/api/user";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function PersonalizationPreference() {
  const { user } = useUser();

  const handleReject = () => {};

  const handleAccept = () => {};
  console.log(" ---------------------- PersonalizationPreference");

  return (
    <SafeAreaView style={authStyles.root}>
      <View style={authStyles.content}>
        <Ionicons name="trophy-outline" size={40} />
        <Typography style={{ marginTop: SPACING[10] }}>
          <Typography weight="medium" size="3xl" lineHeight={SPACING[10]}>
            Essa experiência é sobre{" "}
          </Typography>
          <Typography
            weight="medium"
            size="3xl"
            lineHeight={SPACING[10]}
            color={COLORS.primary}
          >
            você
          </Typography>
        </Typography>
        <Typography lineHeight={SPACING[6]} style={{ marginTop: SPACING[2] }}>
          Com sua permissão, podemos mostrar ofertas, conteúdos e desafios mais
          alinhados com o que você gosta e busca.
        </Typography>
      </View>
      <View style={authStyles.bottomView}>
        <Button onPress={handleReject}>Prefiro não personalizar</Button>
        <Button onPress={handleAccept}>Personalizar experiência</Button>
      </View>
    </SafeAreaView>
  );
}

const authStyles = StyleSheet.create({
  root: {
    flex: 1,
    flexGrow: 1,
    // backgroundColor: COLORS.bgWhite,
    backgroundColor: "red",
  },
  content: {
    paddingTop: 175,
  },
  bottomView: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: SPACING[4],
    gap: SPACING[3],
  },
});
