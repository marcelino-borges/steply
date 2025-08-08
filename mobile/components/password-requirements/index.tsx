import * as React from "react";
import { View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useTranslation } from "react-i18next";
import Typography from "../typography";
import { COLORS } from "@/constants/colors";
import { styles } from "./styles";

interface PasswordRequirementProps {
  text: string;
  isValid: boolean;
}

const PasswordRequirement: React.FC<PasswordRequirementProps> = ({ text, isValid }) => (
  <View style={styles.requirementRow}>
    <Feather 
      name={isValid ? "check" : "x"} 
      size={16} 
      color={isValid ? COLORS.success : COLORS.error} 
    />
    <Typography 
      size="sm" 
      color={isValid ? COLORS.success : COLORS.error}
    >
      {text}
    </Typography>
  </View>
);

interface PasswordRequirementsProps {
  password: string;
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ password }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <PasswordRequirement
        text={t("forms.passwordRequirements.minLength")}
        isValid={/^.{8,}$/.test(password)}
      />
      <PasswordRequirement
        text={t("forms.passwordRequirements.upperLowerCase")}
        isValid={/^(?=.*[a-z])(?=.*[A-Z])/.test(password)}
      />
      <PasswordRequirement
        text={t("forms.passwordRequirements.specialChar")}
        isValid={/[~#@%&$!*_\-?.]/.test(password)}
      />
      <PasswordRequirement
        text={t("forms.passwordRequirements.number")}
        isValid={/\d/.test(password)}
      />
    </View>
  );
};

export default PasswordRequirements;