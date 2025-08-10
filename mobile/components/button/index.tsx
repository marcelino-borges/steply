import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";

import { PropsWithFullwidth } from "@/types/abstractions/fullwidth";
import { SPACING } from "@/constants/spacings";
import { COLORS } from "@/constants/colors";
import Typography from "../typography";
import buttonStyles from "./styles";

interface ButtonProps extends PropsWithFullwidth {
  children: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: "contained" | "outlined" | "ghost";
  color?: "primary" | "secondary" | "primaryInverted";
  onPress: VoidFunction;
  boldFont?: boolean;
  customStyle?: {
    color?: keyof typeof COLORS;
    borderColor?: string;
    backgroundColor?: string;
  };
}

const Button: React.FC<ButtonProps> = ({
  children,
  fullWidth,
  disabled,
  variant = "contained",
  color = "primary",
  customStyle,
  boldFont = true,
  loading = false,
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled ?? loading ?? false}
      style={[
        buttonStyles.base,
        buttonStyles[variant],
        buttonStyles[color],
        variant === "outlined" || variant === "ghost"
          ? { backgroundColor: "transparent" }
          : { backgroundColor: buttonStyles[color].backgroundColor },
        fullWidth && { width: "100%" },
        (disabled || loading) &&
          (variant === "outlined"
            ? {
                backgroundColor: COLORS.muted,
                borderColor: "transparent",
              }
            : { backgroundColor: COLORS.muted }),
        customStyle
          ? {
              borderColor: customStyle?.borderColor,
              backgroundColor: customStyle?.backgroundColor,
            }
          : null,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.bgWhite} />
      ) : (
        <Typography
          color={
            disabled
              ? COLORS.mutedForeground
              : customStyle?.color
                ? COLORS[customStyle.color]
                : variant === "outlined"
                  ? COLORS.primary
                  : buttonStyles[color].color
          }
          letterSpacing={0.1}
          lineHeight={SPACING[5]}
          weight={!boldFont ? "normal" : "semibold"}
          size="sm"
        >
          {children}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

export default Button;
