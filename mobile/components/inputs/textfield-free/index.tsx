import React, { useState, useRef, useEffect, FC, ReactNode } from "react";
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";

import { PropsWithFullwidth } from "@/types/abstractions/fullwidth";
import textfieldStyles from "./styles";
import Typography from "@/components/typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { Mask } from "@react-input/mask";

export interface TextfieldFreeProps
  extends Omit<TextInputProps, "secureTextEntry">,
    PropsWithFullwidth {
  required?: boolean;
  disabled?: boolean;
  error?: string;
  rightElement?: ReactNode;
  leftElement?: ReactNode;
  type?: "text" | "password";
  mask?: Mask;
}

const TextfieldFree = React.forwardRef<TextInput, TextfieldFreeProps>(
  (
    {
      required,
      disabled = false,
      placeholder,
      fullWidth,
      error,
      value,
      onFocus,
      onBlur,
      rightElement,
      type = "text",
      mask,
      onChangeText,
      style,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation();
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const hasValue = value && value.length;
    const shouldShrinkPlaceholder = hasValue || isFocused;

    useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: shouldShrinkPlaceholder ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, [shouldShrinkPlaceholder]);

    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -(SPACING.md - SPACING["1/4"])],
    });

    const scale = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.75],
    });

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const isPasswordField = type === "password";
    const passwordToggleElement = isPasswordField ? (
      <TouchableOpacity onPress={togglePasswordVisibility}>
        <Typography color={COLORS.gray} size="sm" weight="bold">
          {showPassword ? t("forms.passHide") : t("forms.passShow")}
        </Typography>
      </TouchableOpacity>
    ) : null;

    return (
      <View style={[textfieldStyles.container, fullWidth && { width: "100%" }]}>
        {rightElement}
        <TextInput
          {...props}
          ref={ref}
          value={value}
          secureTextEntry={isPasswordField ? !showPassword : false}
          style={[
            textfieldStyles.input,
            fullWidth && { width: "100%" },
            !!error?.length && textfieldStyles.errorBorder,
            disabled && {
              color: COLORS.muted,
            },
            isFocused && { borderColor: COLORS.primary },
            style,
          ]}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={(text: string) => {
            if (!onChangeText) return;

            if (mask) {
              onChangeText(mask.format(text));
              return;
            }

            onChangeText(text);
          }}
        />
        <Animated.View
          style={[
            textfieldStyles.placeholderBase,
            {
              transform: [{ translateY }, { scale }],
            },
          ]}
        >
          <Typography
            color={!disabled ? COLORS.gray : COLORS.mutedForeground}
            size={shouldShrinkPlaceholder ? "xs" : "base"}
          >
            {placeholder}
          </Typography>
          {required && (
            <Typography
              color={!disabled ? COLORS.error : COLORS.mutedForeground}
              size={shouldShrinkPlaceholder ? "xs" : "sm"}
            >
              *
            </Typography>
          )}
        </Animated.View>
        {(rightElement || passwordToggleElement) && (
          <View style={textfieldStyles.rightElement}>
            {!isPasswordField && rightElement}
            {passwordToggleElement}
          </View>
        )}
        {!!error?.length && (
          <Text style={textfieldStyles.errorFont}>{error}</Text>
        )}
      </View>
    );
  }
);

export default TextfieldFree;
