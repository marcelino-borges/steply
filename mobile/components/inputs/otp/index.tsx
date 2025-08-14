import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { View, TextInput, Pressable } from "react-native";
import Button from "@/components/buttons/button";
import TextfieldFree from "../textfield-free";
import Typography from "@/components/typography";
import { useTranslation } from "react-i18next";
import { SPACING } from "@/constants/spacings";
import { COLORS } from "@/constants/colors";
import { styles } from "./styles";

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
  const [inputHeight, setInputHeight] = useState(56);
  const [retryCountdown, setRetryCountdown] = useState(0);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    let interval: number;

    if (retryCountdown > 0) {
      interval = setInterval(() => {
        setRetryCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [retryCountdown]);

  const handleRetry = useCallback(() => {
    retry();
    setRetryCountdown(60);
  }, [retry]);

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

  const retrySection = useMemo(
    () => (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "baseline",
          gap: SPACING[1],
          flexWrap: "wrap",
        }}
      >
        <Typography>{t("forms.didNotReceiveOtp")}</Typography>
        <Pressable onPress={handleRetry} disabled={retryCountdown > 0}>
          <Typography
            underline={retryCountdown === 0}
            color={retryCountdown > 0 ? COLORS.gray : undefined}
          >
            {retryCountdown > 0
              ? `Envie novamente em ${retryCountdown}s`
              : t("common.sendAnother")}
          </Typography>
        </Pressable>
      </View>
    ),
    [retryCountdown, handleRetry, t]
  );

  return (
    <View style={styles.container}>
      <Typography size="2xl" weight="bold">
        {t("forms.verifyYourEmail")}
      </Typography>
      <Typography>{t("forms.emailOtpExplanation", { email })}</Typography>
      <View style={styles.inputsContainer}>
        {otp.map((digit, index) => (
          <View
            key={`otp-input-${index}`}
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
      {retrySection}
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
