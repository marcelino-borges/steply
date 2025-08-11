import React, { useCallback, useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
  TouchableOpacity,
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
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { DEFAULT_TIMEZONE } from "@/constants/timezone";
import CalendarPicker, {
  CalendarChangedDate,
} from "@/components/calendar-picker";
import { differenceInCalendarDays } from "date-fns";
import Typography from "@/components/typography";
import { NonExistingActivityDto } from "@/types/api/activity";
import { Feather } from "@expo/vector-icons";
import TabsHeader from "@/components/tabs-header";
import { useGetSuggestedActivities } from "@/hooks/suggestions/get-activities";
import { ChallengeCheckInTypeCode } from "@/types/api/challenges";
import ChallengeActivityCard from "@/components/challenge-activity-card";
import DebouncedTextfieldSearch from "@/components/inputs/debounced-search";
import CheckboxGroup from "@/components/checkbox-group";

enum AddActivityTab {
  GENERAL,
  MY_ACTIVITIES,
}

const CreateChallenge3: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const timezone = getCalendars()[0].timeZone ?? DEFAULT_TIMEZONE;

  const {
    setChallenge,
    challenge,
    isPending: isCreatingChallange,
    activities,
    setActivities,
  } = useCreateChallenge();

  const {
    data: suggestedActivities,
    isFetching: isFetchingSuggestedActivities,
  } = useGetSuggestedActivities();

  const [start, setStart] = useState<Date | undefined>();
  const [end, setEnd] = useState<Date | undefined>();
  const [openAddActivity, setOpenAddActivity] = useState(false);
  const [addActivityTab, setAddActivityTab] = useState(AddActivityTab.GENERAL);
  const [newActivity, setNewActivity] = useState<NonExistingActivityDto>();
  const [searchText, setSearchText] = useState("");

  const hasFilledForm =
    challenge.title.length > 4 && challenge.description.length > 10;

  const isLoadingScreen = isCreatingChallange;

  const filteredSuggestedActivities = useMemo(() => {
    if (!suggestedActivities) return [];
    if (!searchText.trim()) return suggestedActivities;

    const searchLower = searchText.toLowerCase();
    return suggestedActivities.filter((activity) => {
      const titleMatch = activity.title.toLowerCase().includes(searchLower);
      const descriptionMatch =
        activity.description?.toLowerCase().includes(searchLower) ?? false;
      return titleMatch || descriptionMatch;
    });
  }, [suggestedActivities, searchText]);

  // Calculate selected activity IDs based on current activities in context
  const selectedActivityValues = useMemo(() => {
    return filteredSuggestedActivities
      .filter((activity) =>
        activities.some(
          (selectedActivity) => selectedActivity.title === activity.title
        )
      )
      .map((activity) => activity.id.toString());
  }, [filteredSuggestedActivities, activities]);

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

  const handleToggleActivity = (value: string) => {
    const activityId = parseInt(value);
    const selectedActivity = filteredSuggestedActivities.find(
      (activity) => activity.id === activityId
    );

    if (!selectedActivity) return;

    const isAlreadySelected = activities.some(
      (activity) => activity.title === selectedActivity.title
    );

    if (isAlreadySelected) {
      // Remover atividade
      setActivities(
        activities.filter(
          (activity) => activity.title !== selectedActivity.title
        )
      );
    } else {
      // Adicionar atividade
      const newActivity: NonExistingActivityDto = {
        title: selectedActivity.title,
        description: selectedActivity.description,
        startAt: start || new Date(),
        endAt: end || new Date(),
      };
      setActivities([...activities, newActivity]);
    }
  };

  if (openAddActivity) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.scrollContent}>
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
                  id: AddActivityTab.GENERAL.toString(),
                  label: t("challenge.generalActivities"),
                }}
                tabRight={{
                  id: AddActivityTab.MY_ACTIVITIES.toString(),
                  label: t("challenge.myActivities"),
                }}
                selectedId={addActivityTab.toString()}
                onChangeTab={(tabId) =>
                  setAddActivityTab(Number(tabId) as AddActivityTab)
                }
              />
              {addActivityTab === AddActivityTab.GENERAL && (
                <View style={{ gap: SPACING[10] }}>
                  <DebouncedTextfieldSearch
                    onChangeText={setSearchText}
                    placeholder={t("challenge.searchActivities")}
                  />

                  {isFetchingSuggestedActivities ? (
                    <Typography>{t("common.loading")}</Typography>
                  ) : (
                    <View style={{ marginTop: SPACING[4] }}>
                      <CheckboxGroup
                        items={filteredSuggestedActivities.map((item) => ({
                          label: item.title,
                          subLabel: item.description ?? undefined,
                          value: item.id.toString(),
                        }))}
                        onToggle={handleToggleActivity}
                        variant="outline"
                        selectedValues={selectedActivityValues}
                      />

                      {filteredSuggestedActivities.length === 0 &&
                        searchText.trim() && (
                          <Typography color={COLORS.gray}>
                            {t("challenge.noActivitiesFound")}
                          </Typography>
                        )}
                    </View>
                  )}
                </View>
              )}
              {addActivityTab === AddActivityTab.MY_ACTIVITIES && <View></View>}
            </View>
          </ScrollView>

          {/* Botões fixos na parte inferior */}
          <View style={styles.fixedButtonsContainer}>
            <Button
              variant="ghost"
              color="primary"
              onPress={() => {
                // TODO: Implementar criação de atividade personalizada
              }}
            >
              {t("challenge.createActivity")}
            </Button>
            <Button
              onPress={() => {
                // TODO: Implementar adição das atividades selecionadas
                setOpenAddActivity(false);
              }}
            >
              {t("challenge.addActivities", { count: activities.length })}
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const showCalendar =
    challenge.checkInTypeCode ===
    ChallengeCheckInTypeCode.DAILY_DIFFERENT_ACTIVITIES;

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
          {showCalendar && (
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
          )}
          {showCalendar && (
            <View style={styles.calendarContainer}>
              <CalendarPicker
                onDateChange={onChangeCalendarPicker}
                selectedStartDate={start}
                selectedEndDate={end}
              />
            </View>
          )}
          <View
            style={{
              marginTop: showCalendar ? SPACING[10] : undefined,
            }}
          >
            <View style={styles.addActivityButton}>
              <Typography>{t("challenge.activities")}</Typography>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setOpenAddActivity(true)}
              >
                <Feather name="plus-circle" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            <View>
              {activities.map((activity, index) => (
                <ChallengeActivityCard
                  key={`${activity.title.replaceAll(" ", "_").toLowerCase()}_${activity.description?.replaceAll(" ", "_").toLowerCase() ?? "act"}_${Math.round(Math.random() * 10000)}`}
                  activity={activity}
                  isLastInList={index === activities.length - 1}
                  onEdit={() => {}}
                  onRemove={() => {}}
                />
              ))}
            </View>
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
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: SPACING[10],
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING[10],
    paddingBottom: SPACING[16],
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
  addActivityButton: {
    flexDirection: "row",
    gap: SPACING[2],
    alignItems: "center",
    marginBottom: SPACING[6],
  },
  modalContainer: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  fixedButtonsContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING[4],
    paddingTop: SPACING[4],
    backgroundColor: COLORS.bgWhite,
    borderTopWidth: 1,
    borderTopColor: COLORS.inputBorder,
    gap: SPACING[4],
  },
});

export default CreateChallenge3;
