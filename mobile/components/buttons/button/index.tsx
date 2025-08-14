import React, { ReactNode } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";

import { PropsWithFullwidth } from "@/types/abstractions/fullwidth";
import { SPACING } from "@/constants/spacings";
import { COLORS } from "@/constants/colors";
import Typography from "@/components/typography";
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
  leftElement?: ReactNode;
  rightElement?: ReactNode;
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
  leftElement,
  rightElement,
  ...props
}) => {
  const getFontColor = () => {
    if (disabled) return COLORS.mutedForeground;
    if (customStyle?.color) return COLORS[customStyle.color];
    if (variant === "outlined") {
      if (color === "primary") {
        return COLORS.primary;
      }
      return "white";
    }

    if (variant === "ghost") {
      if (color === "primary") {
        return COLORS.primary;
      }
      return "white";
    }

    return buttonStyles[color].color;
  };

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
      {leftElement}
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.bgWhite} />
      ) : (
        <Typography
          color={getFontColor()}
          letterSpacing={0.1}
          lineHeight={SPACING[5]}
          weight={!boldFont ? "normal" : "semibold"}
          size="sm"
        >
          {children}
        </Typography>
      )}
      {rightElement}
    </TouchableOpacity>
  );
};

export default Button;
