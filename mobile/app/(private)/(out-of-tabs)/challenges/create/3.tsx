import React, { useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Toast } from "toastify-react-native";
import { useTranslation } from "react-i18next";

import SteppedHeader from "@/components/stepped-header";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import Button from "@/components/buttons/button";
import { useCreateChallenge } from "@/hooks/challenges/create";
import TextfieldFree from "@/components/inputs/textfield-free";
import TextArea from "@/components/inputs/textarea";
import { formatDateByLocale } from "@/utils/string-masks";
import { getLocales } from "expo-localization";
import CalendarPicker, {
  CalendarChangedDate,
} from "@/components/inputs/calendar-picker";
import Typography from "@/components/typography";
import { NonExistingActivityDto } from "@/types/api/activity";
import BottomSheet from "@/components/sheet";
import TabsHeader from "@/components/headers/tabs-header";
import { useGetChallengesSuggestedActivities } from "@/hooks/suggestions/get-activities";
import { useGetUserActivities } from "@/hooks/users/get-activities";
import { useUser } from "@/store/user";
import { ChallengeCheckInTypeCode } from "@/types/api/challenges";
import ChallengeActivityCard from "@/components/challenge-activity-card";
import DebouncedTextfieldSearch from "@/components/inputs/debounced-search";
import CheckboxGroup from "@/components/inputs/checkbox-group";
import { CirclePlusIcon } from "lucide-react-native";

enum AddActivityTab {
  GENERAL,
  MY_ACTIVITIES,
}

const MAX_DESCRIPTION_LENGTH = 2048;

const CreateChallenge3: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { height } = useWindowDimensions();

  const {
    challenge,
    isPending: isCreatingChallange,
    activities,
    setActivities,
  } = useCreateChallenge();

  const { suggestedActivities, isLoadingActivities } =
    useGetChallengesSuggestedActivities();

  const { user } = useUser();
  const { data: userActivities, isFetching: isFetchingUserActivities } =
    useGetUserActivities(user?.id || 0);

  const [start, setStart] = useState<Date | undefined>();
  const [end, setEnd] = useState<Date | undefined>();
  const [openAddActivity, setOpenAddActivity] = useState(false);
  const [addActivityTab, setAddActivityTab] = useState(AddActivityTab.GENERAL);
  const [searchText, setSearchText] = useState("");
  const [isCreateActivitySheetOpen, setIsCreateActivitySheetOpen] =
    useState(false);
  const [customActivityTitle, setCustomActivityTitle] = useState("");
  const [customActivityDescription, setCustomActivityDescription] =
    useState("");
  const [tempSelectedActivityIds, setTempSelectedActivityIds] = useState<
    string[]
  >([]);

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

  const filteredUserActivities = useMemo(() => {
    if (!userActivities) return [];
    if (!searchText.trim()) return userActivities;

    const searchLower = searchText.toLowerCase();
    return userActivities.filter((activity) => {
      const titleMatch = activity.title.toLowerCase().includes(searchLower);
      const descriptionMatch =
        activity.description?.toLowerCase().includes(searchLower) ?? false;
      return titleMatch || descriptionMatch;
    });
  }, [userActivities, searchText]);

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

    setTimeout(() => {
      setOpenAddActivity(true);
    }, 250);
  };

  const clearPickedDates = () => {
    setStart(undefined);
    setEnd(undefined);
  };

  const handleToggleActivity = (value: string) => {
    if (tempSelectedActivityIds.includes(value)) {
      setTempSelectedActivityIds(
        tempSelectedActivityIds.filter((id) => id !== value)
      );
    } else {
      setTempSelectedActivityIds([...tempSelectedActivityIds, value]);
    }
  };

  const handleAddCustomActivity = () => {
    if (!customActivityTitle.trim()) return;

    const newActivity: NonExistingActivityDto = {
      title: customActivityTitle.trim(),
      description: customActivityDescription.trim() || null,
      startAt: showCalendar ? start || challenge.startAt : challenge.startAt,
      endAt: showCalendar ? end || challenge.endAt : challenge.endAt,
    };

    setActivities([...activities, newActivity]);

    if (showCalendar) {
      setStart(undefined);
      setEnd(undefined);
    }

    setCustomActivityTitle("");
    setCustomActivityDescription("");
    setIsCreateActivitySheetOpen(false);
    setOpenAddActivity(false);
  };

  const handleRemoveActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const handleAddSelectedActivities = () => {
    const currentActivitiesList =
      addActivityTab === AddActivityTab.GENERAL
        ? filteredSuggestedActivities
        : filteredUserActivities;

    const selectedActivities = currentActivitiesList.filter((activity) =>
      tempSelectedActivityIds.includes(activity.id.toString())
    );

    const newActivities = selectedActivities.map((selectedActivity) => ({
      title: selectedActivity.title,
      description: selectedActivity.description,
      startAt: showCalendar ? start || challenge.startAt : challenge.startAt,
      endAt: showCalendar ? end || challenge.endAt : challenge.endAt,
    }));

    setActivities([...activities, ...newActivities]);

    if (showCalendar) {
      setStart(undefined);
      setEnd(undefined);
    }

    setTempSelectedActivityIds([]);
    setOpenAddActivity(false);
  };

  const showCalendar =
    challenge.checkInTypeCode ===
    ChallengeCheckInTypeCode.DAILY_DIFFERENT_ACTIVITIES;

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
                setTempSelectedActivityIds([]);
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

                  {isLoadingActivities ? (
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
                        selectedValues={tempSelectedActivityIds}
                      />

                      {!filteredSuggestedActivities.length &&
                        searchText.trim() && (
                          <Typography
                            color={COLORS.gray}
                            align="center"
                            size="sm"
                          >
                            {t("challenge.noSuggestedActivitiesFound")}
                          </Typography>
                        )}
                    </View>
                  )}
                </View>
              )}
              {addActivityTab === AddActivityTab.MY_ACTIVITIES && (
                <View style={{ flex: 1 }}>
                  {isFetchingUserActivities ? (
                    <View
                      style={{
                        height: 300,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography color={COLORS.gray}>
                        {t("common.loading")}
                      </Typography>
                    </View>
                  ) : (
                    <View style={{ flex: 1 }}>
                      {filteredUserActivities.length > 0 ? (
                        <CheckboxGroup
                          items={filteredUserActivities.map((activity) => ({
                            label: activity.title,
                            subLabel: activity.description ?? undefined,
                            value: activity.id.toString(),
                          }))}
                          onToggle={handleToggleActivity}
                          variant="outline"
                          selectedValues={tempSelectedActivityIds}
                          fullWidth
                        />
                      ) : (
                        <Typography
                          color={COLORS.gray}
                          align="center"
                          size="sm"
                        >
                          {t("challenge.noUserActivitiesFound")}
                        </Typography>
                      )}
                    </View>
                  )}
                </View>
              )}
            </View>
          </ScrollView>

          <View style={styles.fixedButtonsContainer}>
            <Button
              variant="ghost"
              color="primary"
              onPress={() => setIsCreateActivitySheetOpen(true)}
            >
              {t("challenge.createActivity")}
            </Button>
            <Button
              onPress={handleAddSelectedActivities}
              disabled={tempSelectedActivityIds.length === 0}
            >
              {t("challenge.addActivities", {
                count: tempSelectedActivityIds.length,
              })}
            </Button>
          </View>
        </View>

        <BottomSheet
          open={isCreateActivitySheetOpen}
          onOpenChange={(open) => {
            if (open) return;
            setIsCreateActivitySheetOpen(false);
            setCustomActivityTitle("");
            setCustomActivityDescription("");
          }}
          modalStyle={{ zIndex: 999 }}
        >
          <View style={styles.bottomSheetContent}>
            <View style={styles.formContainer}>
              <TextfieldFree
                placeholder={t("challenge.activityName")}
                value={customActivityTitle}
                onChangeText={setCustomActivityTitle}
                required
              />

              <TextArea
                placeholder={t("challenge.activityDescription")}
                value={customActivityDescription}
                onChangeText={setCustomActivityDescription}
                rows={3}
                maxHeight={height / 2}
                maxLength={MAX_DESCRIPTION_LENGTH}
              />
            </View>

            <View style={styles.bottomSheetButtonContainer}>
              <Button
                onPress={handleAddCustomActivity}
                disabled={!customActivityTitle.trim()}
              >
                {t("challenge.addActivity")}
              </Button>
            </View>
          </View>
        </BottomSheet>
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
                <CirclePlusIcon size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            <View>
              {!activities.length && (
                <Typography italic size="sm" color={COLORS.muted}>
                  {t("challenge.addActivityBeforeContinue")}
                </Typography>
              )}
              {!!activities.length &&
                activities.map((activity, index) => (
                  <ChallengeActivityCard
                    key={`${activity.title.replaceAll(" ", "_").toLowerCase()}_${activity.description?.replaceAll(" ", "_").toLowerCase() ?? "act"}_${Math.round(Math.random() * 10000)}`}
                    activity={activity}
                    isLastInList={index === activities.length - 1}
                    onEdit={() => {
                      setOpenAddActivity(true);
                      setIsCreateActivitySheetOpen(true);
                      setCustomActivityTitle(activity.title);
                      setCustomActivityDescription(activity.description ?? "");
                    }}
                    onRemove={() => handleRemoveActivity(index)}
                  />
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Button
          loading={isLoadingScreen}
          disabled={!activities.length}
          onPress={handleContinue}
        >
          {t("common.continue")}
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
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: COLORS.mutedLight,
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
  bottomSheetContent: {
    width: "100%",
  },
  bottomSheetTitle: {
    textAlign: "center",
  },
  formContainer: {
    gap: SPACING[4],
  },
  bottomSheetButtonContainer: {
    marginTop: SPACING[4],
  },
});

export default CreateChallenge3;
