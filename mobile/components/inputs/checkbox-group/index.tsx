import React from "react";
import { View } from "react-native";
import Checkbox from "@/components/inputs/checkbox";
import { checkboxGroupStyles } from "./styles";

interface CheckboxGroupProps {
  items: {
    value: string;
    label: string;
    subLabel?: string;
  }[];
  onToggle: (value: string) => void;
  selectedValues: string[];
  reverse?: boolean;
  justifyBetween?: boolean;
  fullWidth?: boolean;
  variant?: "outline" | "ghost";
  maxSelections?: number;
}

export default function CheckboxGroup({
  items,
  fullWidth,
  justifyBetween,
  reverse,
  variant,
  onToggle,
  selectedValues,
  maxSelections,
}: CheckboxGroupProps) {
  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      // Always allow unchecking
      onToggle(value);
    } else {
      // Only allow checking if under max limit (or no limit)
      if (!maxSelections || selectedValues.length < maxSelections) {
        onToggle(value);
      }
    }
  };

  return (
    <View
      style={[
        checkboxGroupStyles.root,
        fullWidth && { flexDirection: "column" },
      ]}
    >
      {items.map((item) => (
        <Checkbox
          key={item.value + `_${item.label.replaceAll(" ", "_").toLowerCase()}`}
          label={item.label}
          subLabel={item.subLabel}
          onToggle={() => handleToggle(item.value)}
          checked={selectedValues.includes(item.value)}
          fullWidth={fullWidth}
          justifyBetween={justifyBetween}
          reverse={reverse}
          variant={variant}
        />
      ))}
    </View>
  );
}
