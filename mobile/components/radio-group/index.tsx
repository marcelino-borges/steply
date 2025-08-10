import React from "react";
import { View } from "react-native";
import { radioGroupStyles } from "./styles";
import RadioButton from "../radio-button";

interface RadioGroupProps {
  items: {
    value: string;
    label: string;
    subLabel?: string;
  }[];
  onSelect: (value: string) => void;
  selectedValue: string;
  reverse?: boolean;
  justifyBetween?: boolean;
  fullWidth?: boolean;
  variant?: "outline" | "ghost";
  disabled?: boolean;
}

export default function RadioGroup({
  items,
  fullWidth,
  justifyBetween,
  reverse,
  variant,
  onSelect,
  selectedValue,
  disabled,
}: RadioGroupProps) {
  return (
    <View
      style={[radioGroupStyles.root, fullWidth && { flexDirection: "column" }]}
    >
      {items.map((item) => (
        <RadioButton
          key={item.value + `_${item.label.replaceAll(" ", "_").toLowerCase()}`}
          label={item.label}
          subLabel={item.subLabel}
          onSelect={() => onSelect(item.value)}
          selected={selectedValue === item.value}
          fullWidth={fullWidth}
          justifyBetween={justifyBetween}
          reverse={reverse}
          variant={variant}
          disabled={disabled}
        />
      ))}
    </View>
  );
}
