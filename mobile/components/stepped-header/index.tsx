import React from "react";
import { StyleSheet, View } from "react-native";
import { ArrowLeftIcon } from "lucide-react-native";

import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import CircularProgress from "@/components/circular-progress";
import Typography from "@/components/typography";
import { Href, useRouter } from "expo-router";

interface SteppedHeaderProps {
  /** The title of the header */
  title: string;
  /** The number that will be shown in the place of `{step}` in the string `{step}/{totalSteps}` */
  step?: number;
  /**
   * The number that will be shown in the place of `{totalSteps}` in the string `{step}/{totalSteps}`
   * @default 100
   */
  totalSteps?: number;
  /**
   * Color of the texts and icons
   * @default COLORS.black
   */
  foreground?: string;
  /**
   * If any path is provided, the back icon will be shown and the user will be
   * redirected to the given path when pressed, otherwise the default
   * `router.back()` will be used
   * */
  backTo?: Href;
  /**
   * If true, the back icon will be shown, otherwise it will not be shown
   * @default true
   */
  showBackIcon?: boolean;
  onPressBack?: VoidFunction;
}

const SteppedHeader: React.FC<SteppedHeaderProps> = ({
  title,
  step,
  totalSteps = 100,
  foreground = COLORS.contentBlack,
  backTo,
  showBackIcon = true,
  onPressBack,
}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {showBackIcon && (
        <ArrowLeftIcon
          size={24}
          color={foreground}
          onPress={
            onPressBack ??
            (() => (backTo ? router.push(backTo) : router.back()))
          }
        />
      )}
      <Typography size="base" weight="semibold" color={foreground}>
        {title}
      </Typography>
      {step !== undefined ? (
        <CircularProgress progress={step} total={totalSteps} />
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    paddingHorizontal: SPACING[8],
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default SteppedHeader;
