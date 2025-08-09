import React from "react";
import { TouchableOpacity, View } from "react-native";
import { radioButtonStyles } from "./styles";
import Typography from "../typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { RADIUS } from "@/constants/radius";

export interface RadioButtonProps {
  label: string;
  subLabel?: string;
  onSelect: VoidFunction;
  reverse?: boolean;
  justifyBetween?: boolean;
  selected: boolean;
  fullWidth?: boolean;
  variant?: "outline" | "ghost";
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
}: RadioButtonProps) {
  return (
    <TouchableOpacity
      style={[
        radioButtonStyles.root,
        justifyBetween && { justifyContent: "space-between" },
        reverse && { flexDirection: "row-reverse" },
        variant === "outline" && {
          borderWidth: 1,
          borderColor: selected ? COLORS.primary : COLORS.inputBorder,
          borderRadius: RADIUS.sm,
          padding: SPACING[4],
        },
        fullWidth && {
          width: "100%",
          alignSelf: "auto",
          justifyContent: "space-between",
        },
      ]}
      onPress={onSelect}
      activeOpacity={0.5}
    >
      <View style={radioButtonStyles.textContainer}>
        <Typography numberOfLines={0} weight="medium">
          {label}
        </Typography>
        {!!subLabel?.length && (
          <Typography color={COLORS.gray} numberOfLines={0}>
            {subLabel}
          </Typography>
        )}
      </View>
      <View
        style={[
          radioButtonStyles.outerCircle,
          selected && { borderColor: COLORS.primary },
        ]}
      >
        {selected && <View style={radioButtonStyles.innerCircle} />}
      </View>
    </TouchableOpacity>
  );
}
