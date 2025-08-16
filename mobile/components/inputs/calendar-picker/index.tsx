import { Pressable, View } from "react-native";
import { addYears, isAfter, isBefore, isSameDay } from "date-fns";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import BaseCalendarPicker from "react-native-calendar-picker";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react-native";

import { COLORS } from "@/constants/colors";
import { FONT_SIZE } from "@/constants/fonts";
import Typography from "@/components/typography";
import { SPACING } from "@/constants/spacings";

import { END_CONTAINER, START_CONTAINER } from "./constants";

const YEARS_THRESHOLD = 5;
export type CalendarChangedDate = "START_DATE" | "END_DATE" | "CLEAR";

interface CalendarPickerProps {
  onDateChange: (date: Date, type: CalendarChangedDate) => void;
  loading?: boolean;
  disabled?: boolean;
  selectedStartDate?: Date;
  selectedEndDate?: Date;
  minDate?: Date;
  maxDate?: Date;
}

export default function CalendarPicker({
  onDateChange,
  loading,
  disabled,
  selectedStartDate,
  selectedEndDate,
  minDate,
  maxDate,
}: CalendarPickerProps) {
  const { t } = useTranslation();

  const defaultMaxDate = useMemo(
    () => addYears(new Date(), YEARS_THRESHOLD),
    []
  );

  return (
    <View>
      <BaseCalendarPicker
        startFromMonday
        allowRangeSelection
        horizontal
        allowBackwardRangeSelect
        enableDateChange={!loading && !disabled}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        minDate={minDate ?? new Date()}
        maxDate={maxDate ?? defaultMaxDate}
        customDayHeaderStyles={() => ({
          textStyle: {
            fontSize: FONT_SIZE.lg,
          },
        })}
        customDatesStyles={(date) => {
          // START DATE
          if (selectedStartDate && isSameDay(date, selectedStartDate)) {
            return {
              containerStyle: START_CONTAINER,
            };
          }

          // END DATE
          if (selectedEndDate && isSameDay(date, selectedEndDate)) {
            return {
              containerStyle: END_CONTAINER,
            };
          }

          // RANGE IN BETWEEN DATES
          if (
            selectedStartDate &&
            selectedEndDate &&
            isAfter(date, selectedStartDate) &&
            isBefore(date, selectedEndDate)
          ) {
            return {
              containerStyle: {
                backgroundColor: `${COLORS.primary}50`,
                height: 40,
              },
            };
          }

          return {};
        }}
        selectedRangeStartStyle={START_CONTAINER}
        selectedRangeStartTextStyle={{ color: "white" }}
        selectedRangeEndTextStyle={{ color: "white" }}
        selectedRangeEndStyle={END_CONTAINER}
        selectedRangeStyle={{
          backgroundColor: `transparent`,
        }}
        onDateChange={onDateChange}
        previousComponent={<ChevronLeftIcon size={24} />}
        nextComponent={<ChevronRightIcon size={24} />}
        months={[
          t("calendar.months.jan"),
          t("calendar.months.feb"),
          t("calendar.months.mar"),
          t("calendar.months.apr"),
          t("calendar.months.may"),
          t("calendar.months.jun"),
          t("calendar.months.jul"),
          t("calendar.months.aug"),
          t("calendar.months.sep"),
          t("calendar.months.oct"),
          t("calendar.months.nov"),
          t("calendar.months.dec"),
        ]}
        weekdays={[
          t("calendar.weekdays.mon"),
          t("calendar.weekdays.tue"),
          t("calendar.weekdays.wed"),
          t("calendar.weekdays.thu"),
          t("calendar.weekdays.fri"),
          t("calendar.weekdays.sat"),
          t("calendar.weekdays.sun"),
        ]}
        selectMonthTitle={t("calendar.selectMonthTitle")}
        selectYearTitle={t("calendar.selectYearTitle")}
        dayLabelsWrapper={{
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
      />
      <Pressable onPress={() => onDateChange(new Date(), "CLEAR")}>
        <Typography
          style={{
            marginTop: SPACING[4],
            marginLeft: SPACING[4],
          }}
          color={COLORS.primary}
          weight="medium"
        >
          {t("common.clear")}
        </Typography>
      </Pressable>
    </View>
  );
}
