import React from "react";
import { TouchableOpacity, View } from "react-native";
import { radioButtonStyles } from "./styles";
import Typography from "../typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { RADIUS } from "@/constants/radius";

export type RadioButtonVariant = "outlineAll" | "outlineOnlySelected" | "ghost";

export interface RadioButtonProps {
  label: string;
  subLabel?: string;
  onSelect: VoidFunction;
  reverse?: boolean;
  justifyBetween?: boolean;
  selected: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  variant?: RadioButtonVariant;
}

export default function RadioButton({
  label,
  onSelect,
  justifyBetween,
  reverse,
  selected,
  variant = "ghost",
  fullWidth,
  subLabel,
  disabled,
}: RadioButtonProps) {
  return (
    <TouchableOpacity
      style={[
        radioButtonStyles.root,
        justifyBetween && { justifyContent: "space-between" },
        reverse && { flexDirection: "row-reverse" },
        (variant === "outlineAll" || variant === "outlineOnlySelected") && {
          borderWidth: 1,
          borderColor: disabled
            ? COLORS.muted
            : selected
              ? COLORS.primary
              : variant === "outlineAll"
                ? COLORS.inputBorder
                : "transparent",
          borderRadius: RADIUS.sm,
          padding: SPACING[4],
        },
        fullWidth && {
          width: "100%",
          alignSelf: "auto",
          justifyContent: "space-between",
        },
      ]}
      onPress={!disabled ? onSelect : undefined}
      activeOpacity={!disabled ? 0.5 : 1}
    >
      <View style={radioButtonStyles.textContainer}>
        <Typography
          numberOfLines={0}
          weight="medium"
          color={disabled ? COLORS.muted : undefined}
        >
          {label}
        </Typography>
        {!!subLabel?.length && (
          <Typography
            color={disabled ? COLORS.muted : COLORS.gray}
            numberOfLines={0}
          >
            {subLabel}
          </Typography>
        )}
      </View>
      <View
        style={[
          radioButtonStyles.outerCircle,
          selected && { borderColor: COLORS.primary },
          disabled && { borderColor: COLORS.muted },
        ]}
      >
        {selected && (
          <View
            style={[
              radioButtonStyles.innerCircle,
              disabled && { backgroundColor: COLORS.muted },
            ]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
