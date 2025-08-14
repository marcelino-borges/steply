import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toast } from "toastify-react-native";

import Button from "@/components/buttons/button";
import TextfieldFormControlled from "@/components/inputs/textfield-form-controlled";
import Typography from "@/components/typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { handleClerkErrorMessage } from "@/utils/clerk-error";
import { useTranslation } from "react-i18next";
import AppIcon from "@/components/app-icon";
import OTPInput from "@/components/inputs/otp";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/utils/schemas/forgot-password";
import { ForgotPasswordForm, ResetPasswordForm } from "@/types/forgot-password";

export default function ForgotPasswordScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verifiedCode, setVerifiedCode] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const { t } = useTranslation();

  const forgotForm = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetForm = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code: "",
      newPassword: "",
    },
  });

  const handleSendResetEmail = async ({ email }: ForgotPasswordForm) => {
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      setCurrentEmail(email);
      setPendingVerification(true);
      Toast.success(t("auth.forgotPassword.codeSent"));
    } catch (error) {
      const errorMessage = handleClerkErrorMessage(error, t);
      Toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (code: string) => {
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      resetForm.setValue("code", code);
      setVerifiedCode(true);
      setPendingVerification(false);
    } catch (error) {
      const errorMessage = handleClerkErrorMessage(error, t);
      Toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async ({
    code,
    newPassword,
  }: ResetPasswordForm) => {
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });

      if (result?.status === "complete") {
        await setActive({ session: result.createdSessionId });
        Toast.success(t("auth.forgotPassword.passwordResetSuccess"));
        router.replace("/(private)/(tabs)/home");
      } else {
        Toast.error(t("errors.generic"));
      }
    } catch (error) {
      const errorMessage = handleClerkErrorMessage(error, t);
      Toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (currentEmail) {
      await handleSendResetEmail({ email: currentEmail });
    }
  };

  // Step 2: Enter OTP code
  if (pendingVerification) {
    return (
      <OTPInput
        email={currentEmail}
        onSubmit={handleVerifyCode}
        retry={handleResendCode}
        isLoading={isLoading}
      />
    );
  }

  // Step 3: Enter new password
  if (verifiedCode) {
    return (
      <View style={styles.screenContainer}>
        <AppIcon />
        <View style={styles.contentContainer}>
          <Typography weight="medium" size="2xl">
            {t("auth.forgotPassword.resetPasswordTitle")}
          </Typography>

          <Typography color={COLORS.gray} style={styles.subtitle}>
            {t("auth.forgotPassword.enterNewPassword")}
          </Typography>

          <View style={styles.inputsContainer}>
            <TextfieldFormControlled
              fullWidth
              required
              control={resetForm.control}
              type="password"
              name="newPassword"
              placeholder={t("auth.forgotPassword.newPassword")}
              error={resetForm.formState.errors.newPassword?.message}
            />
          </View>

          <View style={styles.buttonsView}>
            <Button
              fullWidth
              onPress={resetForm.handleSubmit(handleResetPassword)}
              loading={isLoading}
            >
              {t("auth.forgotPassword.resetPassword")}
            </Button>
          </View>

          <View style={styles.bottomRedirect}>
            <Typography size="sm">
              {t("auth.forgotPassword.rememberPassword")}
            </Typography>
            <Link href="/(auth)/signin">
              <Typography color={COLORS.primary} weight="semibold" size="sm">
                {t("auth.forgotPassword.backToSignIn")}
              </Typography>
            </Link>
          </View>
        </View>
      </View>
    );
  }

  // Step 1: Enter email
  return (
    <View style={styles.screenContainer}>
      <AppIcon />
      <View style={styles.contentContainer}>
        <Typography weight="medium" size="2xl">
          {t("auth.forgotPassword.title")}
        </Typography>

        <View style={styles.inputsContainer}>
          <Typography color={COLORS.gray} style={styles.subtitle}>
            {t("auth.forgotPassword.subtitle")}
          </Typography>
          <TextfieldFormControlled
            fullWidth
            required
            control={forgotForm.control}
            keyboardType="email-address"
            name="email"
            placeholder={t("auth.email")}
            error={forgotForm.formState.errors.email?.message}
          />
        </View>
      </View>

      <View style={styles.buttonsView}>
        <Link href="/(auth)/signin">
          <Typography color={COLORS.primary} weight="medium" size="sm">
            {t("auth.forgotPassword.backToSignIn")}
          </Typography>
        </Link>
        <Button
          fullWidth
          onPress={forgotForm.handleSubmit(handleSendResetEmail)}
          loading={isLoading}
        >
          {t("auth.forgotPassword.sendResetEmail")}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    width: "100%",
    gap: 96,
    alignItems: "center",
    backgroundColor: COLORS.bgWhite,
    justifyContent: "space-between",
    flex: 1,
    paddingBottom: SPACING[8],
  },
  contentContainer: {
    width: "100%",
    gap: SPACING[8],
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.bgWhite,
    flex: 1,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: SPACING[4],
  },
  inputsContainer: {
    width: "100%",
  },
  bottomRedirect: {
    display: "flex",
    flexDirection: "row",
    gap: SPACING[1],
    marginTop: 16,
    justifyContent: "center",
  },
  buttonsView: {
    gap: SPACING[4],
    width: "100%",
    alignItems: "center",
  },
});
