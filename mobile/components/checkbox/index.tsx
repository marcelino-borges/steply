import React from "react";
import { TouchableOpacity, View } from "react-native";
import { checkboxStyles } from "./styles";
import Typography from "../typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { RADIUS } from "@/constants/radius";
import { CheckIcon } from "lucide-react-native";

export interface CheckboxProps {
  label: string;
  subLabel?: string;
  onToggle: VoidFunction;
  reverse?: boolean;
  justifyBetween?: boolean;
  checked: boolean;
  fullWidth?: boolean;
  variant?: "outline" | "ghost";
}

export default function Checkbox({
  label,
  onToggle,
  justifyBetween,
  reverse,
  checked,
  variant = "ghost",
  fullWidth,
  subLabel,
}: CheckboxProps) {
  return (
    <TouchableOpacity
      style={[
        checkboxStyles.root,
        justifyBetween && { justifyContent: "space-between" },
        reverse && { flexDirection: "row-reverse" },
        variant === "outline" && {
          borderWidth: 1,
          borderColor: checked ? COLORS.primary : COLORS.inputBorder,
          borderRadius: RADIUS.sm,
          padding: SPACING[4],
        },
        fullWidth && {
          width: "100%",
          alignSelf: "auto",
          justifyContent: "space-between",
        },
      ]}
      onPress={onToggle}
      activeOpacity={0.5}
    >
      <View style={checkboxStyles.labelContainer}>
        <Typography>{label}</Typography>
        {!!subLabel?.length && (
          <Typography color={COLORS.gray}>{subLabel}</Typography>
        )}
      </View>
      <View
        style={[
          checkboxStyles.outerBox,
          checked && {
            borderColor: COLORS.primary,
            backgroundColor: COLORS.primary,
          },
        ]}
      >
        {checked && <CheckIcon size={12} color={COLORS.bgWhite} />}
      </View>
    </TouchableOpacity>
  );
}
