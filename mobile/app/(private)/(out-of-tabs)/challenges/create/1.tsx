import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "toastify-react-native";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { getCalendars, getLocales } from "expo-localization";
import { differenceInCalendarDays } from "date-fns";
import { useTranslation } from "react-i18next";

import SteppedHeader from "@/components/stepped-header";
import Typography from "@/components/typography";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import Button from "@/components/button";
import TextfieldFree from "@/components/inputs/textfield-free";
import AttachButton from "@/components/attach-button";
import { useCreateChallenge } from "@/hooks/challenges/create";
import { DEFAULT_TIMEZONE } from "@/constants/timezone";
import TagsField from "@/components/inputs/tags";
import { formatDateByLocale } from "@/utils/string-masks";
import { RADIUS } from "@/constants/radius";
import { Trash2Icon } from "lucide-react-native";

const CreateChallenge1: React.FC = () => {
  const router = useRouter();
  const timezone = getCalendars()[0].timeZone ?? DEFAULT_TIMEZONE;
  const { t } = useTranslation();

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

  const { setChallenge, challenge, banner, setBanner } = useCreateChallenge();

  const hasFilledForm =
    challenge.title.length > 4 && challenge.description.length > 4;

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

  const pickBanner = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    console.log("result.assets?.[0]", result.assets?.[0]);

    if (!result.assets?.[0].mimeType) {
      Toast.error(t("files.invalidFile"));
      return;
    }

    if (!result.canceled) {
      setBanner({
        uri: result.assets[0].uri,
        mimeType: result.assets[0].mimeType,
      });
    }
  };

  const removeBanner = () => {
    setBanner(undefined);
    Toast.info(t("challenge.bannerRemoved"), "bottom");
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

  const handleContinue = async () => {
    if (challenge.startAt.getTime() > challenge.endAt.getTime()) {
      console.log(
        "------------- [ERROR] Challenge start date cannot be after end date"
      );
      Toast.error(t("challenge.startDateCannotBeAfterEnd"));
      return;
    }

    router.push("/(private)/(out-of-tabs)/challenges/create/2");
  };

  const handleAddTag = (tag: string) => {
    const updatedTags = [...challenge.tags, tag.toLowerCase()];
    setChallenge({
      ...challenge,
      tags: updatedTags,
    });
  };

  const handleRemoveTag = (tag: string) => {
    const updatedTags = challenge.tags.filter(
      (existingTag) => existingTag !== tag
    );
    setChallenge({
      ...challenge,
      tags: updatedTags,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <SteppedHeader
          title={t("challenge.details")}
          foreground={COLORS.contentBlack}
          totalSteps={6}
          step={1}
        />
        <View style={styles.content}>
          <TextfieldFree
            fullWidth
            required
            placeholder={t("challenge.title")}
            value={challenge.title}
            onChangeText={(title: string) =>
              setChallenge({ ...challenge, title })
            }
          />
          <TextfieldFree
            fullWidth
            required
            placeholder={t("challenge.description")}
            value={challenge.description}
            onChangeText={(description: string) =>
              setChallenge({ ...challenge, description })
            }
          />
          <TagsField
            tags={challenge.tags}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            placeholder="Hashtags"
          />
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
              rightElement={<DaysBox />}
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
          <View style={styles.bannerContainer}>
            <Typography size="base" letterSpacing={0.5}>
              {t("challenge.addBanner")}
            </Typography>
            <Typography size="xs" color={COLORS.gray}>
              {t("challenge.addBannerDescription")}
            </Typography>
            {!banner?.uri.length ? (
              <AttachButton leftIcon="upload" onPress={pickBanner}>
                {t("challenge.addBannerFromLibrary")}
              </AttachButton>
            ) : (
              <View style={styles.bannerCard}>
                <View style={styles.bannerCardLeftContainer}>
                  <Image
                    source={{ uri: banner.uri }}
                    style={styles.bannerImagePreview}
                  />
                  <Typography size="base">
                    {t("challenge.selectedBanner")}
                  </Typography>
                </View>
                <Pressable onPress={removeBanner}>
                  <Trash2Icon size={24} color={COLORS.destructive} />
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Button disabled={!hasFilledForm} onPress={handleContinue}>
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
    paddingBottom: SPACING[8],
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: SPACING[10],
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING[10],
  },
  datePickersContainer: {
    display: "flex",
    flexDirection: "row",
    gap: SPACING[2],
  },
  datePickerInput: {
    flex: 1,
  },
  bannerContainer: {
    display: "flex",
    gap: SPACING[2],
  },
  icon: {
    width: 46,
    height: 50,
    marginBottom: SPACING[10],
  },
  buttonView: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: COLORS.mutedLight,
  },
  bannerCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING[2],
    borderWidth: 2,
    borderColor: COLORS.inputBorder,
    borderRadius: RADIUS.xs,
    overflow: "hidden",
    paddingRight: SPACING.md,
  },
  bannerCardLeftContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  bannerImagePreview: {
    height: 48,
    width: 56,
  },
  daysBox: {
    borderWidth: SPACING["1/4"],
    borderColor: COLORS.inputBorder,
    borderRadius: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
});

export default CreateChallenge1;
