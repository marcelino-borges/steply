import { COLORS } from "@/constants/colors";
import { FONT_SIZE } from "@/constants/fonts";
import { Feather } from "@expo/vector-icons";
import { addYears, isAfter, isBefore, isSameDay } from "date-fns";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import BaseCalendarPicker from "react-native-calendar-picker";
import { END_CONTAINER, START_CONTAINER } from "./constants";
import { View } from "react-native";
import Typography from "../typography";
import { SPACING } from "@/constants/spacings";

const YEARS_THRESHOLD = 5;
export type CalendarChangedDate = "START_DATE" | "END_DATE" | "CLEAR";

interface CalendarPickerProps {
  onDateChange: (date: Date, type: CalendarChangedDate) => void;
  loading?: boolean;
  disabled?: boolean;
  selectedStartDate?: Date;
  selectedEndDate?: Date;
}

export default function CalendarPicker({
  onDateChange,
  loading,
  disabled,
  selectedStartDate,
  selectedEndDate,
}: CalendarPickerProps) {
  const { t } = useTranslation();

  const maxDate = useMemo(() => addYears(new Date(), YEARS_THRESHOLD), []);

  return (
    <View>
      <BaseCalendarPicker
        startFromMonday={true}
        allowRangeSelection={true}
        enableDateChange={!loading && !disabled}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        minDate={new Date()}
        maxDate={maxDate}
        // todayBackgroundColor={`${COLORS.primary}10`}
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
        horizontal
        previousComponent={<Feather name="chevron-left" size={24} />}
        nextComponent={<Feather name="chevron-right" size={24} />}
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
    </View>
  );
}
