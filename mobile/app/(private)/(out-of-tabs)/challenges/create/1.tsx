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
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "toastify-react-native";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { getCalendars } from "expo-localization";
import { differenceInCalendarDays, format } from "date-fns";
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
import { useFileStorage } from "@/hooks/s3";

const CreateChallenge1: React.FC = () => {
  const router = useRouter();
  const timezone = getCalendars()[0].timeZone ?? DEFAULT_TIMEZONE;
  const { t } = useTranslation();

  const [banner, setBanner] = useState<
    { uri: string; mimeType: string } | undefined
  >();
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

  const {
    setChallenge,
    challenge,
    createChallenge,
    isPending: isCreatingChallange,
  } = useCreateChallenge();
  const { uploadFile, deleteFile, isUploading, isDeleting } = useFileStorage();

  const hasFilledForm =
    challenge.title.length > 4 && challenge.description.length > 10;

  const isLoadingScree = isCreatingChallange || isUploading || isDeleting;

  const DaysBox = useCallback(() => {
    const daysDiff = differenceInCalendarDays(
      challenge.endAt,
      challenge.startAt
    );

    return (
      <View style={styles.daysBox}>
        <Typography size="xs" color={COLORS.gray} weight={500}>
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

  const handleCreateChallenge = async () => {
    if (challenge.startAt.getTime() > challenge.endAt.getTime()) {
      console.log(
        "------------- [ERROR] Challenge start date cannot be after end date"
      );
      Toast.error(t("challenge.startDateCannotBeAfterEnd"));
      return;
    }

    let bannerUrl = "";

    if (banner) {
      const { data, error } = await uploadFile(
        "challenges",
        banner.uri,
        banner.mimeType,
        `banner_${Date.now()}`
      );

      if (error) {
        console.log("------------- [ERROR] Upload banner failed", error);
        Toast.error(error);
        return;
      }

      if (data) {
        bannerUrl = data;
      }
    }

    try {
      await createChallenge?.({
        ...challenge,
        bannerUrl,
      });
      Toast.success(t("challenge.createSuccess"));
      router.replace("/(private)/(tabs)/home");
    } catch (error) {
      deleteFile(bannerUrl)
        .then(() => {
          console.log("-------------- [DEBUG] File deleted successfuly");
        })
        .catch((error) => {
          console.log("-------------- [ERROR] File deletion failed", error);
        });
      Toast.error(`${t("challenge.createError")}: ${(error as Error).message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
            disabled={isLoadingScree}
            placeholder={t("challenge.title")}
            value={challenge.title}
            onChangeText={(title: string) =>
              setChallenge({ ...challenge, title })
            }
          />
          <TextfieldFree
            fullWidth
            required
            disabled={isLoadingScree}
            placeholder={t("challenge.description")}
            value={challenge.description}
            onChangeText={(description: string) =>
              setChallenge({ ...challenge, description })
            }
          />
          <View
            style={styles.datePickerInput}
            onTouchEnd={() => {
              if (!isCreatingChallange && !isUploading && !isDeleting)
                setOpenStartDatePicker(true);
            }}
          >
            <TextfieldFree
              required
              readOnly
              disabled={isLoadingScree}
              placeholder={t("challenge.startAt")}
              value={format(challenge.startAt, "dd/MM/yyyy")}
            />
          </View>
          <View
            style={styles.datePickerInput}
            onTouchEnd={() => {
              if (!isCreatingChallange && !isUploading && !isDeleting)
                setOpenEndDatePicker(true);
            }}
          >
            <TextfieldFree
              required
              readOnly
              disabled={isLoadingScree}
              placeholder={t("challenge.endAt")}
              value={format(challenge.endAt, "dd/MM/yyyy")}
              rightElement={<DaysBox />}
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
              <AttachButton
                disabled={isLoadingScree}
                leftIcon={<Feather name="upload" size={24} />}
                onPress={pickBanner}
              >
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
                <Pressable onPress={removeBanner} disabled={isLoadingScree}>
                  <Feather
                    name="trash-2"
                    size={24}
                    color={
                      isLoadingScree ? COLORS.mutedForeground : COLORS.error
                    }
                  />
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Button
          loading={isLoadingScree}
          disabled={!hasFilledForm}
          onPress={handleCreateChallenge}
        >
          {isCreatingChallange ? t("common.creating") : t("common.next")}
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
  scrollView: {},
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
    width: "100%",
  },
  bannerCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING[2],
    borderWidth: 1,
    borderColor: COLORS.muted,
    borderRadius: SPACING.xs,
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
    borderColor: COLORS.muted,
    borderRadius: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
});

export default CreateChallenge1;
