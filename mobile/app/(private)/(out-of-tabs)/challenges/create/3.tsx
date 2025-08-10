import React, { useCallback, useState } from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
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

const CreateChallenge3: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const timezone = getCalendars()[0].timeZone ?? DEFAULT_TIMEZONE;

  const {
    setChallenge,
    challenge,
    isPending: isCreatingChallange,
  } = useCreateChallenge();

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [start, setstart] = useState<Date | undefined>();
  const [end, setend] = useState<Date | undefined>();
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
    setOpenStartDatePicker(false);
  };

  const handleEndDate = (_event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setChallenge({ ...challenge, endAt: date });
    }
    setOpenEndDatePicker(false);
  };

  const onChangeCalendarPicker = (data: Date, type: CalendarChangedDate) => {};

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
            <View
              style={styles.datePickerInput}
              onTouchEnd={() => {
                setOpenStartDatePicker(true);
              }}
            >
              <TextfieldFree
                required
                readOnly
                placeholder={t("challenge.startAt")}
                value={formatDateByLocale(
                  getLocales()[0].languageCode ?? "en",
                  challenge.startAt
                )}
              />
              {openStartDatePicker && (
                <RNDateTimePicker
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "calendar"}
                  value={challenge.startAt}
                  minimumDate={new Date()}
                  onChange={handleStartDate}
                  timeZoneName={timezone}
                />
              )}
            </View>

            <View
              style={styles.datePickerInput}
              onTouchEnd={() => {
                setOpenEndDatePicker(true);
              }}
            >
              <TextfieldFree
                required
                readOnly
                placeholder={t("challenge.endAt")}
                value={formatDateByLocale(
                  getLocales()[0].languageCode ?? "en",
                  challenge.endAt
                )}
              />
              {openEndDatePicker && (
                <RNDateTimePicker
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "calendar"}
                  value={challenge.endAt}
                  onChange={handleEndDate}
                  minimumDate={challenge.startAt}
                  timeZoneName={timezone}
                />
              )}
            </View>
          </View>
          {/* /\ datePickersContainer View */}
          <View style={styles.calendarContainer}>
            <CalendarPicker
              onDateChange={(date, type) => {
                if (type === "CLEAR") {
                  setstart(undefined);
                  setend(undefined);
                  return;
                }

                if (type === "START_DATE") {
                  setstart(date);
                  setend(undefined);
                  return;
                }

                setend(date);
              }}
              selectedStartDate={start}
              selectedEndDate={end}
            />
          </View>
        </View>
        {/* /\ Content View */}
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
});

export default CreateChallenge3;
