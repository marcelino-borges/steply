import Typography from "@/components/typography";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function ChallengeDetails() {
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();

  return <Typography>challengeId: {challengeId}</Typography>;
}
