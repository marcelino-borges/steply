import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toast } from "toastify-react-native";

import Button from "@/components/buttons/button";
import TextfieldFormControlled from "@/components/inputs/textfield-form-controlled";
import { SigninForm, signinSchema } from "@/utils/schemas/signin";
import Typography from "@/components/typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { handleClerkErrorMessage } from "@/utils/clerk-error";
import { useTranslation } from "react-i18next";
import AppIcon from "@/components/app-icon";
import { fetchUser } from "@/services/user";
import { useUser } from "@/store/user";
import { useLocalCredentials } from "@clerk/clerk-expo/local-credentials";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { hasCredentials, setCredentials, authenticate, biometricType } =
    useLocalCredentials();

  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { t } = useTranslation();
  const { setUser } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignInPress = async (
    { email, password }: SigninForm,
    useLocal: boolean
  ) => {
    if (!isLoaded) return;

    setIsSigningIn(true);

    const emailLowerCase = email.toLowerCase();

    try {
      const signInAttempt =
        hasCredentials && useLocal
          ? await authenticate()
          : await signIn.create({
              identifier: emailLowerCase,
              password,
            });

      if (signInAttempt.status === "complete") {
        try {
          const userData = await fetchUser({ email: emailLowerCase });
          setUser(userData);
        } catch (fetchError) {
          console.error("Error fetching user data:", fetchError);
          Toast.error((fetchError as Error).message);
          return;
        }

        await setActive({ session: signInAttempt.createdSessionId });

        if (!useLocal) {
          await setCredentials({
            identifier: emailLowerCase,
            password,
          });
        }
        router.replace("/(private)/(tabs)/home");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        Toast.error(t("errors.clerk.signupMissingSteps"));

        setIsSigningIn(false);
      }
    } catch (error) {
      const errorMessage = handleClerkErrorMessage(error, t);
      Toast.error(errorMessage);

      setIsSigningIn(false);
    }
  };

  return (
    <View style={authStyles.screenContainer}>
      <AppIcon />
      <View style={authStyles.contentContainer}>
        <Typography weight="bold" size="2xl">
          Entrar
        </Typography>
        <View style={authStyles.inputsContainer}>
          <TextfieldFormControlled
            fullWidth
            required
            control={control}
            keyboardType="email-address"
            name="email"
            placeholder="E-mail"
            error={errors.email?.message}
          />
          <View>
            <TextfieldFormControlled
              fullWidth
              required
              control={control}
              placeholder="Senha"
              type="password"
              name="password"
              error={errors.password?.message}
            />
            <Link
              href="/(auth)/forgot-password"
              style={authStyles.forgotPasswordLink}
            >
              <Typography color={COLORS.primary} weight="semibold" size="sm">
                {t("auth.forgotPassword.link")}
              </Typography>
            </Link>
          </View>
        </View>
        <View style={authStyles.buttonsView}>
          <Button
            fullWidth
            onPress={handleSubmit((data) => onSignInPress(data, false))}
            loading={isSigningIn}
          >
            Entrar
          </Button>
          <Button
            fullWidth
            onPress={handleSubmit((data) => onSignInPress(data, true))}
            loading={isSigningIn}
            variant="outlined"
          >
            {biometricType === "face-recognition"
              ? t("biometric.signInWithFaceId")
              : t("biometric.signInWithFingerprint")}
          </Button>
        </View>

        <View style={authStyles.bottomRedirect}>
          <Typography size="sm">Não possui conta?</Typography>
          <Link href="/signup">
            <Typography color={COLORS.primary} weight="semibold" size="sm">
              Cadastre-se
            </Typography>
          </Link>
        </View>
      </View>
    </View>
  );
}

const authStyles = StyleSheet.create({
  screenContainer: {
    width: "100%",
    gap: 96,
    alignItems: "center",
    backgroundColor: COLORS.bgWhite,
  },
  contentContainer: {
    width: "100%",
    gap: SPACING[8],
    alignItems: "center",
    backgroundColor: COLORS.bgWhite,
  },
  inputsContainer: {
    width: "100%",
    gap: SPACING[4],
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
  },
  forgotPasswordLink: {
    alignSelf: "flex-end",
    marginTop: SPACING[2],
  },
});
