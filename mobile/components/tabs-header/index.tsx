import React, { useEffect, useRef, useState } from "react";
import { Pressable, View, Animated } from "react-native";
import { tabsHeaderStyles } from "./styles";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import { getFontFamily } from "@/utils/fonts";

interface Tab {
  id: string;
  label: string;
}

interface TabButtonProps {
  tab: Tab;
  isSelected: boolean;
  onPress: (tabId: string) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ tab, isSelected, onPress }) => {
  const colorValue = useRef(new Animated.Value(isSelected ? 1 : 0)).current;
  const opacityValue = useRef(new Animated.Value(isSelected ? 1 : 0.7)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(colorValue, {
        toValue: isSelected ? 1 : 0,
        duration: 200,
        delay: 100,
        useNativeDriver: false,
      }),
      Animated.timing(opacityValue, {
        toValue: isSelected ? 1 : 0.7,
        duration: 200,
        delay: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isSelected, colorValue, opacityValue]);

  const animatedTextColor = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.contentBlack, COLORS.white],
  });

  return (
    <Pressable
      key={
        tab.label.replaceAll(" ", "_").toLowerCase() +
        `_${Math.round(Math.random() * 10000)}_${Date.now()}`
      }
      onPress={() => onPress(tab.id)}
      style={tabsHeaderStyles.tabButton}
    >
      <Animated.Text
        style={[
          {
            fontSize: 14,
            color: animatedTextColor,
            opacity: opacityValue,
            fontFamily: getFontFamily(
              isSelected ? "semibold" : "medium",
              false
            ),
          },
        ]}
      >
        {tab.label}
      </Animated.Text>
    </Pressable>
  );
};

interface TabsHeaderProps {
  tabLeft: Tab;
  tabMiddle?: Tab;
  tabRight: Tab;
  selectedId: string;
  onChangeTab: (tabId: string) => void;
}

export default function TabsHeader({
  tabLeft,
  tabMiddle,
  tabRight,
  selectedId,
  onChangeTab,
}: TabsHeaderProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);

  const tabs = [tabLeft, tabMiddle, tabRight].filter(Boolean) as Tab[];
  const selectedIndex = tabs.findIndex((tab) => tab.id === selectedId);
  const tabWidth = containerWidth / tabs.length;

  useEffect(() => {
    if (selectedIndex !== -1 && containerWidth > 0) {
      const targetX = selectedIndex * tabWidth;

      Animated.timing(translateX, {
        toValue: targetX,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  }, [selectedId, selectedIndex, containerWidth, tabWidth, translateX]);

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  return (
    <View style={tabsHeaderStyles.root} onLayout={handleLayout}>
      {containerWidth > 0 && (
        <Animated.View
          style={[
            {
              position: "absolute",
              top: SPACING[2],
              left: selectedIndex === 0 ? SPACING[2] : 0,
              bottom: SPACING[2],
              width:
                selectedIndex === tabs.length - 1
                  ? tabWidth - SPACING[2]
                  : tabWidth,
              backgroundColor: COLORS.primary,
              borderRadius: tabsHeaderStyles.tabButton.borderRadius,
              transform: [{ translateX }],
            },
          ]}
        />
      )}

      <TabButton
        tab={tabLeft}
        isSelected={selectedId === tabLeft.id}
        onPress={onChangeTab}
      />

      {tabMiddle && (
        <TabButton
          tab={tabMiddle}
          isSelected={selectedId === tabMiddle.id}
          onPress={onChangeTab}
        />
      )}

      <TabButton
        tab={tabRight}
        isSelected={selectedId === tabRight.id}
        onPress={onChangeTab}
      />
    </View>
  );
}
