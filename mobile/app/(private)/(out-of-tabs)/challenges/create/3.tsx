import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Toast } from "toastify-react-native";
import { useTranslation } from "react-i18next";

import SteppedHeader from "@/components/stepped-header";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import Button from "@/components/button";
import { useCreateChallenge } from "@/hooks/challenges/create";
import TextfieldFree from "@/components/inputs/textfield-free";
import { formatDateByLocale } from "@/utils/string-masks";
import { getCalendars, getLocales } from "expo-localization";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { DEFAULT_TIMEZONE } from "@/constants/timezone";
import CalendarPicker, {
  CalendarChangedDate,
} from "@/components/calendar-picker";
import { differenceInCalendarDays } from "date-fns";
import Typography from "@/components/typography";
import { NonExistingActivityDto } from "@/types/api/activity";
import BottomSheet from "@/components/sheet";
import { Feather } from "@expo/vector-icons";
import TabsHeader from "@/components/tabs-header";

const CreateChallenge3: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const timezone = getCalendars()[0].timeZone ?? DEFAULT_TIMEZONE;

  const {
    setChallenge,
    challenge,
    isPending: isCreatingChallange,
  } = useCreateChallenge();

  const [start, setStart] = useState<Date | undefined>();
  const [end, setEnd] = useState<Date | undefined>();
  const [openAddActivity, setOpenAddActivity] = useState(false);
  const [addActivityTab, setAddActivityTab] = useState("1");
  const [newActivity, setNewActivity] = useState<NonExistingActivityDto>();

  const hasFilledForm =
    challenge.title.length > 4 && challenge.description.length > 10;

  const isLoadingScreen = isCreatingChallange;

  const DaysBox = useCallback(() => {
    const daysDiff = differenceInCalendarDays(
      challenge.endAt,
      challenge.startAt
    );

    return (
      <View style={styles.daysBox}>
        <Typography size="xs" color={COLORS.contentBlack} weight="semibold">
          {`${daysDiff} ${t("common.days", {
            count: daysDiff,
          })}`}
        </Typography>
      </View>
    );
  }, [challenge.endAt, challenge.startAt, t]);

  const handleContinue = async () => {
    if (challenge.startAt.getTime() > challenge.endAt.getTime()) {
      console.log(
        "------------- [ERROR] Challenge start date cannot be after end date"
      );
      Toast.error(t("challenge.startDateCannotBeAfterEnd"));
      return;
    }

    router.push("/(private)/(out-of-tabs)/challenges/create/4");
  };

  const handleStartDate = (_event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setChallenge({ ...challenge, startAt: date });
    }
  };

  const handleEndDate = (_event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setChallenge({ ...challenge, endAt: date });
    }
  };

  const onChangeCalendarPicker = (date: Date, type: CalendarChangedDate) => {
    if (type === "CLEAR") {
      setStart(undefined);
      setEnd(undefined);
      return;
    }

    if (type === "START_DATE") {
      setStart(date);
      setEnd(undefined);
      return;
    }

    setEnd(date);

    // Just for giving the user the visual of the end date being selected
    setTimeout(() => {
      setOpenAddActivity(true);
    }, 250);
  };

  const clearPickedDates = () => {
    setStart(undefined);
    setEnd(undefined);
  };

  if (openAddActivity) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <SteppedHeader
            title={t("challenge.searchActivities")}
            foreground={COLORS.contentBlack}
            totalSteps={6}
            step={3}
            onPressBack={() => {
              clearPickedDates();
              setOpenAddActivity(false);
            }}
          />

          <View style={styles.content}>
            <TabsHeader
              tabLeft={{
                id: "1",
                label: "Geral",
                onPress: () => {
                  setAddActivityTab("1");
                },
              }}
              tabRight={{
                id: "2",
                label: "Minhas Atividades",
                onPress: () => {
                  setAddActivityTab("2");
                },
              }}
              selectedId={addActivityTab}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <SteppedHeader
          title={t("challenge.activities")}
          foreground={COLORS.contentBlack}
          totalSteps={6}
          step={3}
        />
        <View style={styles.content}>
          <View style={styles.datePickersContainer}>
            <View style={styles.datePickerInput}>
              <TextfieldFree
                required
                readOnly
                placeholder={t("challenge.startAt")}
                value={formatDateByLocale(
                  getLocales()[0].languageCode ?? "en",
                  challenge.startAt
                )}
              />
            </View>

            <View style={styles.datePickerInput}>
              <TextfieldFree
                required
                readOnly
                placeholder={t("challenge.endAt")}
                value={formatDateByLocale(
                  getLocales()[0].languageCode ?? "en",
                  challenge.endAt
                )}
              />
            </View>
          </View>
          <View style={styles.calendarContainer}>
            <CalendarPicker
              onDateChange={onChangeCalendarPicker}
              selectedStartDate={start}
              selectedEndDate={end}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Button
          loading={isLoadingScreen}
          disabled={!hasFilledForm}
          onPress={handleContinue}
        >
          {t("common.next")}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgWhite,
    color: COLORS.contentBlack,
    flex: 1,
    paddingBottom: SPACING[8],
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: SPACING[10],
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING[10],
  },
  buttonView: {
    paddingHorizontal: SPACING.md,
    width: "100%",
  },
  datePickersContainer: {
    display: "flex",
    flexDirection: "row",
    gap: SPACING[2],
  },
  datePickerInput: {
    flex: 1,
  },
  calendarContainer: {
    flex: 1,
  },
  daysBox: {
    borderWidth: SPACING["1/4"],
    borderColor: COLORS.inputBorder,
    borderRadius: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  bottomSheetButton: {
    flexDirection: "row",
    gap: SPACING[4],
    alignItems: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateChallenge3;
