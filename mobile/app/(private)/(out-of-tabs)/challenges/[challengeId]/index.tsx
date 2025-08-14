import ChallengeDetailsHeader from "@/components/headers/challenge-details-header";
import TabsHeader from "@/components/headers/tabs-header";
import Typography from "@/components/typography";
import { COLORS } from "@/constants/colors";
import { RADIUS } from "@/constants/radius";
import { SPACING } from "@/constants/spacings";
import { useGetChallengeSummary } from "@/hooks/challenges";
import { useGetChallengeById } from "@/hooks/challenges/get-challenge-by-id";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StatusBar, StyleSheet, useWindowDimensions, View } from "react-native";

enum ChallengeDetailsTab {
  LEFT = "left",
  MIDDLE = "middle",
  RIGHT = "right",
}

export default function ChallengeDetails() {
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const cardSize = (width - SPACING.md * 2 - SPACING[2]) / 2;

  const challengeIdNumber = Number(challengeId);
  const { data: fullChallenge, isLoading: isLoadingChallenge } =
    useGetChallengeById(challengeIdNumber);
  const {
    data: summary,
    isLoading: isLoadingSummary,
    error,
  } = useGetChallengeSummary(challengeIdNumber);

  const [selectedTab, setselectedTab] = useState<ChallengeDetailsTab>(
    ChallengeDetailsTab.LEFT
  );

  const SummaryCard = ({
    title,
    content,
    size,
  }: {
    title: string;
    content: string;
    size: number;
  }) => (
    <View style={[styles.summaryCard, { width: size, height: size }]}>
      <Typography size="sm">{title}</Typography>
      <Typography size="lg" weight="semibold">
        {content}
      </Typography>
    </View>
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ChallengeDetailsHeader />
      <View style={styles.tabsHeader}>
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
      <View style={styles.content}>
        {selectedTab === ChallengeDetailsTab.LEFT && summary && (
          <>
            <View style={styles.summaryRow}>
              <SummaryCard
                title={t("challenge.participants")}
                content={String(summary.participantCount)}
                size={cardSize}
              />
              <SummaryCard
                title={t("challenge.mediasCount")}
                content={String(summary.mediaCount)}
                size={cardSize}
              />
            </View>
            <View style={styles.summaryRow}>
              <SummaryCard
                title={t("challenge.checkInsToday")}
                content={String(summary.checkInsToday)}
                size={cardSize}
              />
              <SummaryCard
                title={t("challenge.checkInsTotal")}
                content={String(summary.checkInsTotal)}
                size={cardSize}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: SPACING[10],
  },
  tabsHeader: {
    paddingHorizontal: SPACING.md,
  },
  content: {
    paddingHorizontal: SPACING.md,
    gap: SPACING[2],
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING[6],
    borderRadius: RADIUS[2],
  },
  summaryRow: {
    flexDirection: "row",
    gap: SPACING[2],
  },
});
