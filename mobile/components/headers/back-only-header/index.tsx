import React from "react";
import { Pressable, View } from "react-native";
import { backOnlyHeaderStyles } from "./styles";
import { Href, useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";

interface BackOnlyHeaderProps {
  backTo?: Href;
}

export default function BackOnlyHeader({ backTo }: BackOnlyHeaderProps) {
  const router = useRouter();

  return (
    <View style={backOnlyHeaderStyles.headerContainer}>
      <Pressable
        onPress={() => (backTo ? router.replace(backTo) : router.back())}
      >
        <ArrowLeftIcon strokeWidth={1} />
      </Pressable>
    </View>
  );
}
