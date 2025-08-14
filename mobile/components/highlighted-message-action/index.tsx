import { ReactNode } from "react";
import { SafeAreaView, View } from "react-native";
import Button from "@/components/buttons/button";
import { COLORS } from "@/constants/colors";
import { styles } from "./styles";

interface ActionProps {
  label: ReactNode;
  onPress: () => void;
  rightElement?: ReactNode;
  loading?: boolean;
  variant?: "contained" | "outlined" | "ghost";
  color?: "primary" | "secondary" | "primaryInverted";
  customStyle?: {
    color?: keyof typeof COLORS;
    borderColor?: string;
    backgroundColor?: string;
  };
}

interface HighlightedMessageActionProps {
  icon?: ReactNode;
  content: ReactNode;
  primaryAction: ActionProps;
  secondaryAction?: ActionProps;
  variant?: "default" | "inverted";
}

export default function HighlightedMessageAction({
  icon,
  content,
  primaryAction,
  secondaryAction,
  variant = "default",
}: HighlightedMessageActionProps) {
  const isInverted = variant === "inverted";

  return (
    <SafeAreaView style={[styles.container, isInverted && styles.containerInverted]}>
      <View style={styles.content}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        {content}
      </View>
      <View style={styles.buttonView}>
        {secondaryAction && (
          <Button
            variant={secondaryAction.variant || "ghost"}
            color={secondaryAction.color || (isInverted ? "primary" : "primaryInverted")}
            boldFont={false}
            onPress={secondaryAction.onPress}
            loading={secondaryAction.loading}
            customStyle={secondaryAction.customStyle}
            rightElement={secondaryAction.rightElement}
          >
            {secondaryAction.label}
          </Button>
        )}
        <Button
          variant={primaryAction.variant || "contained"}
          color={primaryAction.color || (isInverted ? "primary" : "primaryInverted")}
          onPress={primaryAction.onPress}
          loading={primaryAction.loading}
          customStyle={primaryAction.customStyle}
          rightElement={primaryAction.rightElement}
        >
          {primaryAction.label}
        </Button>
      </View>
    </SafeAreaView>
  );
}