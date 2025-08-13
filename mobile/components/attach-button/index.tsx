import React from "react";
import { TouchableOpacity, View } from "react-native";

import Typography from "../typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { attachButtonStyles } from "./styles";
import { ChevronRightIcon, LucideIcon } from "lucide-react-native";

interface AttachButtonProps {
  children: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onPress: VoidFunction;
  leftIcon: LucideIcon;
}

const AttachButton: React.FC<AttachButtonProps> = ({
  children,
  disabled = false,
  fullWidth = true,
  leftIcon: LeftIcon,
  onPress,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled ?? false}
      style={[attachButtonStyles.container, fullWidth && { width: "100%" }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[attachButtonStyles.labelIcon]}>
        <LeftIcon size={24} color={COLORS.contentBlack} />
        <Typography
          color={COLORS.contentBlack}
          letterSpacing={0.1}
          lineHeight={SPACING[5]}
          weight="normal"
        >
          {children}
        </Typography>
      </View>
      <ChevronRightIcon size={16} />
    </TouchableOpacity>
  );
};

export default AttachButton;
