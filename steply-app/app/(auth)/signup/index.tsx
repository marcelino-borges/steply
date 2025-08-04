import * as React from "react";
import { StyleSheet, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

import TextfieldFormControlled from "@/components/inputs/textfield-form-controlled";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpForm, signUpSchema } from "@/utils/schemas/signup";
import Button from "@/components/button";
import Typography from "@/components/typography";
import { COLORS } from "@/constants/colors";
import { FONT_SIZE, FONT_WEIGHT } from "@/constants/fonts";
import { SPACING } from "@/constants/spacings";
import { useTranslation } from "react-i18next";
import { phoneMask } from "@/utils/string-masks";
import PasswordRequirements from "@/components/password-requirements";
import OTPInput from "@/components/inputs/otp";
import { useCreateUser } from "@/hooks/users/create";
import { useUpdateUser } from "@/hooks/users/update";
import { UserRegistrationStep } from "@/types/api/user";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const { t } = useTranslation();
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm({
    resolver: zodResolver(signUpSchema(t)),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      countryCode: "55",
    },
  });

  const currentPassword = watch("password");
  const currentEmail = watch("email");

  const [pendingVerification, setPendingVerification] = React.useState(false);

  const sendOtp = async () => {
    if (!signUp) return;

    await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
  };

  const onPressSignUp = async ({
    email,
    password,
    confirmPassword,
    countryCode,
  }: SignUpForm) => {
    if (!isLoaded) return;

    if (password !== confirmPassword) {
      setError("confirmPassword", {
        message: t("forms.passwordNoMatch"),
        type: "validate",
      });
      return;
    }

    console.log(email, password);

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await sendOtp();

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onPressVerify = async (code: string) => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        
        // Get form data to create user in our API
        const formData = watch();
        
        // Create user in our API
        const createdUser = await createUser({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          countryId: parseInt(formData.countryCode), // Using countryCode as countryId for now
          acceptsCommunication: true, // Default to true, can be made configurable
        });

        // Update user's registration step
        await updateUser({
          id: createdUser.id,
          name: createdUser.name,
          email: createdUser.email,
          phone: createdUser.phone,
          countryId: createdUser.countryId,
          acceptsCommunication: createdUser.acceptsCommunication,
          nextRegistrationStep: UserRegistrationStep.INFORM_WANTS_PERSONALIZATION,
        });

        router.replace("/home");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <OTPInput 
        email={currentEmail} 
        onSubmit={onPressVerify} 
        retry={sendOtp}
        isLoading={isCreatingUser || isUpdatingUser}
      />
    );
  }

  return (
    <View style={authStyles.screenContainer}>
      <Feather name="arrow-left" size={24} onPress={() => router.back()} />
      <View style={authStyles.contentContainer}>
        <Typography size="2xl" weight="bold">
          Criar conta
        </Typography>
        <View style={authStyles.inputsContainer}>
          <TextfieldFormControlled
            fullWidth
            required
            control={control}
            name="name"
            placeholder="Nome"
            error={errors.name?.message}
          />

          <TextfieldFormControlled
            fullWidth
            required
            control={control}
            keyboardType="email-address"
            name="email"
            placeholder="E-mail"
            error={errors.email?.message}
          />

          <View style={authStyles.phoneContainer}>
            <View
              style={{
                flex: 1,
              }}
            >
              <TextfieldFormControlled
                required
                control={control}
                placeholder="País"
                name="countryCode"
                error={errors.countryCode?.message}
                readOnly
                disabled
              />
            </View>
            <View
              style={{
                flex: 3,
              }}
            >
              <TextfieldFormControlled
                fullWidth
                required
                control={control}
                placeholder="Telefone"
                name="phone"
                error={errors.phone?.message}
                mask={phoneMask}
              />
            </View>
          </View>

          <TextfieldFormControlled
            fullWidth
            required
            control={control}
            placeholder="Senha"
            type="password"
            name="password"
            error={errors.password?.message}
          />

          {!!currentPassword.length && (
            <PasswordRequirements password={currentPassword} />
          )}

          <TextfieldFormControlled
            fullWidth
            required
            control={control}
            placeholder="Confirmar senha"
            type="password"
            name="confirmPassword"
            error={errors.confirmPassword?.message}
          />
        </View>

        <Button fullWidth onPress={handleSubmit(onPressSignUp)}>
          Criar conta
        </Button>

        <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <Typography>Já possui conta?</Typography>
          <Link href="/signin">
            <Typography color={COLORS.primary} weight={FONT_WEIGHT[600]}>
              Entre
            </Typography>
          </Link>
        </View>
      </View>
    </View>
  );
}

const authStyles = StyleSheet.create({
  screenContainer: {
    paddingTop: SPACING[4],
    gap: SPACING[8],
    width: "100%",
  },
  contentContainer: {
    gap: SPACING[8],
    width: "100%",
    alignItems: "center",
  },
  inputsContainer: {
    gap: SPACING[4],
    width: "100%",
  },
  titleSignup: {
    fontSize: FONT_SIZE["2xl"],
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.contentBlack,
  },
  verificationText: {
    color: COLORS.contentBlack,
  },
  phoneContainer: {
    flexDirection: "row",
    gap: SPACING[1],
  },
});
