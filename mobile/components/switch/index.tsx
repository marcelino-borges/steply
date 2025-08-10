import { Switch as SwitchNative, View } from "react-native";
import { switchStyles } from "./styles";
import Typography from "../typography";
import { COLORS } from "@/constants/colors";

interface SwitchProps {
  checked: boolean;
  onChange: (newState: boolean) => void;
  label: string;
  subLabel?: string;
  disabled?: boolean;
}

export default function Switch({
  checked,
  onChange,
  label,
  subLabel,
  disabled,
}: SwitchProps) {
  const shouldBeMuted = disabled || !checked;

  return (
    <View style={switchStyles.root}>
      <View style={switchStyles.textContainer}>
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
      <SwitchNative
        trackColor={{
          false: COLORS.muted,
          true: shouldBeMuted ? COLORS.muted : `${COLORS.inputBorder}`,
        }}
        thumbColor={disabled || !checked ? "#f4f3f4" : COLORS.primary}
        ios_backgroundColor={COLORS.muted}
        onValueChange={onChange}
        value={checked}
        style={switchStyles.switch}
        disabled={disabled}
      />
    </View>
  );
}
