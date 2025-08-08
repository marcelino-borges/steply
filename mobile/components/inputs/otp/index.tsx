import React, { useState, useRef } from "react";
import { View, TextInput } from "react-native";
import Button from "@/components/button";
import TextfieldFree from "../textfield-free";
import { styles } from "./styles";
import Typography from "@/components/typography";
import { useTranslation } from "react-i18next";

interface OTPInputProps {
  onSubmit: (code: string) => void;
  retry: VoidFunction;
  email: string;
  isLoading?: boolean;
}

export default function OTPInput({
  onSubmit,
  email,
  retry,
  isLoading = false,
}: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [inputHeight, setInputHeight] = useState<number>(56);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const { t } = useTranslation();

  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];

    if (text === "") {
      newOtp[index] = "";
      setOtp(newOtp);
      setTimeout(() => {
        inputRefs.current[index]?.focus();
      }, 10);
    } else {
      const digit = text.slice(-1);
      if (/\D/.test(digit)) return;

      const wasEmpty = !otp[index];
      newOtp[index] = digit;
      setOtp(newOtp);

      if (wasEmpty && index < 5) {
        setTimeout(() => {
          inputRefs.current[index + 1]?.focus();
        }, 10);
      }
    }
  };

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setInputHeight(width * 1.25);
  };

  const handleSubmit = () => {
    const code = otp.join("");

    if (code.length === 6 && onSubmit) {
      onSubmit(code);
    }
  };

  const isSubmitDisabled = otp.some((digit) => digit === "") || isLoading;

  return (
    <View style={styles.container}>
      <Typography size="2xl" weight="bold">
        {t("forms.verifyYourEmail")}
      </Typography>
      <Typography>{t("forms.emailOtpExplanation", { email })}</Typography>
      <View style={styles.inputsContainer}>
        {otp.map((digit, index) => (
          <View
            key={Math.round(Math.random() * 100000)}
            style={[styles.inputWrapper, { height: inputHeight }]}
            onLayout={index === 0 ? handleLayout : undefined}
          >
            <TextfieldFree
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              fullWidth
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
              style={styles.input}
            />
          </View>
        ))}
      </View>
      <Typography>
        <Typography>{t("forms.didNotReceiveOtp")}</Typography>{" "}
        <Typography underline>{t("common.sendAnother")}</Typography>
      </Typography>
      <Button
        fullWidth
        onPress={handleSubmit}
        disabled={isSubmitDisabled}
        loading={isLoading}
      >
        {t("common.verify")}
      </Button>
    </View>
  );
}
