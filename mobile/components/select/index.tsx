import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Control } from "react-hook-form";
import React from "react";

import { PropsWithFullwidth } from "@/types/abstractions/fullwidth";
import { SPACING } from "@/constants/spacings";
import { COLORS } from "@/constants/colors";
import Typography from "../typography";
import Sheet from "../sheet";

interface SelectProps<T> extends PropsWithFullwidth {
  sheetTitle: string;
  placeholder: string;
  name: string;
  error?: string;
  options: {
    label: string;
    value: T;
  }[];
  defaultValue?: T;
  fullWidth?: boolean;
  onSelect: (value: T) => void;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  defaultOpen?: boolean;
  control: Control<any>;
}

export default function Select<T>({
  sheetTitle,
  options,
  fullWidth,
  onSelect,
  disabled,
  loading,
  required,
  defaultValue,
  error,
  placeholder,
  defaultOpen,
}: SelectProps<T>) {
  const [selectedValue, setSelectedValue] = useState<T | undefined>(
    defaultValue
  );
  const [open, setOpen] = useState(defaultOpen ?? false);
  console.log("------------- open: ", open);

  return (
    <>
      {/* <Sheet
        open={true}
        onClose={() => {
          console.log("------------- close");
          setOpen(false);
        }}
        title={sheetTitle}
      >
        {options.map((option) => (
          <TouchableOpacity
            key={option.label}
            onPress={() => {
              setSelectedValue(option.value);
              setOpen(false);
              onSelect(option.value);
            }}
          >
            <Typography>{option.label}</Typography>
          </TouchableOpacity>
        ))}
      </Sheet>

      <Pressable
        disabled={disabled ?? false}
        style={[
          styles.root,
          (disabled || loading) && { backgroundColor: COLORS.muted },
          fullWidth && { width: "100%" },
        ]}
        onPress={() => {
          setOpen(true);
        }}
      >
        <View style={styles.inputText}>
          <Typography
            color={disabled || loading ? COLORS.muted : COLORS.gray}
            letterSpacing={0.1}
            lineHeight={SPACING[5]}
            weight="normal"
            size="base"
          >
            {options.find((option) => option.value === selectedValue)?.label ??
              placeholder}
          </Typography>
          {required && (
            <Typography
              color={!disabled ? COLORS.error : COLORS.mutedForeground}
              size="base"
            >
              *
            </Typography>
          )}
        </View>
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.bgWhite} />
        ) : (
          <Ionicons
            name="chevron-down"
            size={24}
            color={COLORS.mutedForeground}
          />
        )}
      </Pressable>
      {!!error?.length && (
        <Typography color={COLORS.error} size="sm">
          {error}
        </Typography>
      )} */}
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    height: SPACING[14],
    borderRadius: SPACING.xs,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    gap: SPACING.sm,
    borderWidth: SPACING["1/4"],
    borderColor: COLORS.muted,
    paddingHorizontal: SPACING.md,
  },
  inputText: {
    display: "flex",
    flexDirection: "row",
  },
});
