import { Switch as SwitchNative, View } from "react-native";
import { switchStyles } from "./styles";
import Typography from "../typography";
import { COLORS } from "@/constants/colors";

interface SwitchProps {
  checked: boolean;
  onChange: (newState: boolean) => void;
  label: string;
  subLabel?: string;
}

export default function Switch({
  checked,
  onChange,
  label,
  subLabel,
}: SwitchProps) {
  return (
    <View style={switchStyles.root}>
      <View style={switchStyles.textContainer}>
        <Typography numberOfLines={0} weight="medium">
          {label}
        </Typography>
        {!!subLabel?.length && (
          <Typography color={COLORS.gray} numberOfLines={0}>
            {subLabel}
          </Typography>
        )}
      </View>
      <SwitchNative
        trackColor={{
          false: COLORS.muted,
          true: `${COLORS.inputBorder}`,
        }}
        thumbColor={checked ? COLORS.primary : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onChange}
        value={checked}
        style={switchStyles.switch}
      />
    </View>
  );
}
