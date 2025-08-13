import React from "react";
import Typography from "../typography";
import { Pressable, StatusBar, StyleSheet, View } from "react-native";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { ArrowDownToLineIcon, ArrowLeftIcon } from "lucide-react-native";
import { useRouter } from "expo-router";

interface ChallengeDetailsHeaderProps {}

export default function ChallengeDetailsHeader({}: ChallengeDetailsHeaderProps) {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={challengeDetailsHeaderStyles.root}>
      <Pressable
        style={challengeDetailsHeaderStyles.leftContainer}
        onPress={handleBackPress}
      >
        <ArrowLeftIcon size={24} color={COLORS.white} strokeWidth={1} />
      </Pressable>
      <View style={challengeDetailsHeaderStyles.titleContainer}>
        <Typography color={COLORS.white}>ChallengeDetailsHeader</Typography>
      </View>
      <View style={challengeDetailsHeaderStyles.rightContainer}>
        <Pressable style={challengeDetailsHeaderStyles.downloadPressable}>
          <ArrowDownToLineIcon size={24} color={COLORS.white} strokeWidth={1} />
        </Pressable>
      </View>
    </View>
  );
}

const CHALLENGES_DETAILS_HEADER_HEIGHT = 44;

const challengeDetailsHeaderStyles = StyleSheet.create({
  root: {
    height: CHALLENGES_DETAILS_HEADER_HEIGHT + (StatusBar.currentHeight ?? 0),
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: SPACING[10],
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    flexDirection: "row",
  },
  leftContainer: {
    flexGrow: 0,
    justifyContent: "center",
  },
  titleContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    flexGrow: 0,
    flexDirection: "row",
  },
  downloadPressable: {
    justifyContent: "center",
    alignItems: "center",
  },
});
