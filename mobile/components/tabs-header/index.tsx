import React from "react";
import { Pressable, View } from "react-native";
import { tabsHeaderStyles } from "./styles";
import Typography from "../typography";
import { COLORS } from "@/constants/colors";

interface Tab {
  id: string;
  label: string;
  onPress: VoidFunction;
}

interface TabsHeaderProps {
  tabLeft: Tab;
  tabRight: Tab;
  selectedId: string;
}

export default function TabsHeader({
  tabLeft,
  tabRight,
  selectedId,
}: TabsHeaderProps) {
  return (
    <View style={tabsHeaderStyles.root}>
      <Pressable
        key={
          tabLeft.label.replaceAll(" ", "_").toLowerCase() +
          `_${Math.round(Math.random() * 10000)}_${Date.now()}`
        }
        onPress={tabLeft.onPress}
        style={[
          tabsHeaderStyles.tabButton,
          selectedId === tabLeft.id && {
            backgroundColor: COLORS.primary,
          },
        ]}
      >
        <Typography
          weight={selectedId === tabLeft.id ? "semibold" : undefined}
          color={selectedId === tabLeft.id ? "white" : undefined}
        >
          {tabLeft.label}
        </Typography>
      </Pressable>

      <Pressable
        key={
          tabRight.label.replaceAll(" ", "_").toLowerCase() +
          `_${Math.round(Math.random() * 10000)}_${Date.now()}`
        }
        onPress={tabRight.onPress}
        style={[
          tabsHeaderStyles.tabButton,
          selectedId === tabRight.id && {
            backgroundColor: COLORS.primary,
          },
        ]}
      >
        <Typography
          weight={selectedId === tabRight.id ? "semibold" : undefined}
          color={selectedId === tabRight.id ? "white" : undefined}
        >
          {tabRight.label}
        </Typography>
      </Pressable>
    </View>
  );
}
