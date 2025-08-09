import React from "react";
import { Pressable, View } from "react-native";
import { challengeTagStyles } from "./styles";
import Typography from "../typography";
import { COLORS } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";

interface ChallengeTagProps {
  name: string;
  onRemove: (name: string) => void;
}

export default function ChallengeTag({ name, onRemove }: ChallengeTagProps) {
  return (
    <View style={challengeTagStyles.root}>
      <Typography
        color={COLORS.primary}
        size="sm"
        numberOfLines={1}
        style={challengeTagStyles.tagName}
      >
        #{name}
      </Typography>
      <Pressable onPress={() => onRemove(name)}>
        <Feather name="x" color={COLORS.primary} size={18} />
      </Pressable>
    </View>
  );
}
