import React, { ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import Typography from "../typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { attachButtonStyles } from "./styles";

interface AttachButtonProps {
  children: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onPress: VoidFunction;
  leftIcon: ReactNode;
}

const AttachButton: React.FC<AttachButtonProps> = ({
  children,
  disabled = false,
  fullWidth = true,
  leftIcon,
  onPress,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled ?? false}
      style={[attachButtonStyles.container, fullWidth ? { width: "100%" } : {}]}
      onPress={onPress}
    >
      <View style={[attachButtonStyles.labelIcon]}>
        {leftIcon}
        <Typography
          color={COLORS.contentBlack}
          letterSpacing={0.1}
          lineHeight={SPACING[5]}
          weight="normal"
        >
          {children}
        </Typography>
      </View>
      <AntDesign name="caretright" />
    </TouchableOpacity>
  );
};

export default AttachButton;
