import ChallengeDetailsHeader from "@/components/challenge-details-header";
import TabsHeader from "@/components/tabs-header";
import Typography from "@/components/typography";
import { SPACING } from "@/constants/spacings";
import { useGetChallengeById } from "@/hooks/challenges/get-challenge-by-id";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StatusBar, StyleSheet, View } from "react-native";

enum ChallengeDetailsTab {
  LEFT = "left",
  MIDDLE = "middle",
  RIGHT = "right",
}

export default function ChallengeDetails() {
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();
  const { t } = useTranslation();

  const { data: fullChallenge, isFetching } = useGetChallengeById(
    Number(challengeId)
  );

  const [selectedTab, setselectedTab] = useState<ChallengeDetailsTab>(
    ChallengeDetailsTab.LEFT
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ChallengeDetailsHeader />
      <View style={styles.content}>
        <TabsHeader
          tabLeft={{
            id: ChallengeDetailsTab.LEFT,
            label: t("challenge.summary"),
          }}
          tabMiddle={{
            id: ChallengeDetailsTab.MIDDLE,
            label: t("challenge.participants"),
          }}
          tabRight={{
            id: ChallengeDetailsTab.RIGHT,
            label: t("challenge.engagement"),
          }}
          selectedId={selectedTab}
          onChangeTab={(tabId) => {
            setselectedTab(tabId as ChallengeDetailsTab);
          }}
        />
      </View>
      <Typography>challengeId: {challengeId}</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: SPACING[10],
  },
  content: {
    paddingHorizontal: SPACING.md,
  },
});
