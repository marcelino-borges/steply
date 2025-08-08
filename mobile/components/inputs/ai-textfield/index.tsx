import React, { useState } from "react";
import { Image, Keyboard, StyleSheet, TextInput, View } from "react-native";

import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { Toast } from "toastify-react-native";

interface AITextfieldProps {
  onRespond?: (response: string) => void;
}

const AITextfield: React.FC<AITextfieldProps> = ({ onRespond }) => {
  const [value, setValue] = useState("");

  const onSubmitPrompt = async () => {
    if (!value.length) {
      Keyboard.dismiss();
      return;
    }

    try {
      const res = "";

      onRespond?.(res);
    } catch (error) {
      Toast.error("A SAI não conseguiu responder");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.aiLogoContainer}>
        <Image
          style={styles.aiLogoImage}
          source={require("@/assets/images/logo-white.png")}
        />
      </View>

      <TextInput
        value={value}
        onChangeText={(text: string) => setValue(text)}
        style={styles.input}
        placeholder="Criar seu desafio com a SAI, nossa IA"
        onSubmitEditing={onSubmitPrompt}
        onBlur={onSubmitPrompt}
        returnKeyType="done"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    position: "relative",
    backgroundColor: "white",
  },
  aiLogoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    height: 40,
    width: 40,
    position: "absolute",
    left: 16,
    top: 8,
    borderRadius: SPACING.xs,
  },
  aiLogoImage: {
    height: 20,
    width: 10,
  },
  input: {
    height: SPACING[14],
    width: "100%",
    borderWidth: SPACING["1/4"],
    borderColor: COLORS.muted,
    borderRadius: SPACING.xs,
    paddingLeft: 72,
    paddingRight: SPACING.md,
  },
});

export default AITextfield;
