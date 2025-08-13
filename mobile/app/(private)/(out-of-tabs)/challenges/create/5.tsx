import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Toast } from "toastify-react-native";
import { useTranslation } from "react-i18next";
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

import SteppedHeader from "@/components/stepped-header";
import { COLORS } from "@/constants/colors";
import { SPACING } from "@/constants/spacings";
import Button from "@/components/button";
import { useCreateChallenge } from "@/hooks/challenges/create";
import TextfieldFree from "@/components/inputs/textfield-free";
import AttachButton from "@/components/attach-button";
import Typography from "@/components/typography";
import { RADIUS } from "@/constants/radius";

const CreateChallenge5: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const {
    selectedRewardType,
    reward,
    setReward,
    rewardImage,
    setRewardImage,
    rewardFiles,
    setRewardFiles,
    isPending: isCreatingChallange,
  } = useCreateChallenge();

  const [rewardName, setRewardName] = useState(reward?.name || "");
  const [rewardDescription, setRewardDescription] = useState(
    reward?.description || ""
  );

  const hasFilledForm = rewardName.length > 0;
  const isLoadingScreen = isCreatingChallange;

  const pickRewardImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.assets?.[0].mimeType) {
      Toast.error(t("files.invalidFile"));
      return;
    }

    if (!result.canceled) {
      setRewardImage({
        uri: result.assets[0].uri,
        mimeType: result.assets[0].mimeType,
      });
    }
  };

  const removeRewardImage = () => {
    setRewardImage(undefined);
  };

  const pickRewardDocuments = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      copyToCacheDirectory: true,
      multiple: true,
    });

    if (!result.canceled && result.assets) {
      const newFiles = result.assets.map((asset) => ({
        uri: asset.uri,
        mimeType: asset.mimeType || "application/octet-stream",
        name: asset.name,
      }));

      setRewardFiles([...(rewardFiles || []), ...newFiles]);
    }
  };

  const removeRewardFile = (fileUri: string) => {
    setRewardFiles(rewardFiles?.filter((file) => file.uri !== fileUri));
  };

  const handleContinue = async () => {
    if (!selectedRewardType) {
      return;
    }

    const rewardData = {
      name: rewardName,
      description: rewardDescription || undefined,
      rewardTypeId: selectedRewardType.id,
    };

    setReward(rewardData);
    router.push("/(private)/(out-of-tabs)/challenges/create/6");
  };

  const handleNoReward = () => {
    setReward(undefined);
    setRewardImage(undefined);
    setRewardFiles(undefined);
    router.push("/(private)/(out-of-tabs)/challenges/create/6");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <SteppedHeader
          title={t("challenge.reward")}
          foreground={COLORS.contentBlack}
          totalSteps={6}
          step={5}
        />
        <View style={styles.content}>
          <TextfieldFree
            fullWidth
            required
            placeholder={t("challenge.rewardNamePlaceholder")}
            value={rewardName}
            onChangeText={setRewardName}
          />
          <TextfieldFree
            fullWidth
            placeholder={t("challenge.rewardDescriptionPlaceholder")}
            value={rewardDescription}
            onChangeText={setRewardDescription}
            multiline
            numberOfLines={3}
          />

          <View style={styles.attachContainer}>
            <Typography size="base" letterSpacing={0.5}>
              {t("challenge.rewardImageLabel")}
            </Typography>
            <Typography size="xs" color={COLORS.gray}>
              {t("challenge.rewardImageSubLabel")}
            </Typography>
            {!rewardImage?.uri ? (
              <AttachButton leftIcon="image" onPress={pickRewardImage}>
                {t("challenge.addBannerFromLibrary")}
              </AttachButton>
            ) : (
              <View style={styles.fileCard}>
                <View style={styles.fileCardLeftContainer}>
                  <Image
                    source={{ uri: rewardImage.uri }}
                    style={styles.imagePreview}
                  />
                  <Typography size="base">
                    {t("challenge.selectedBanner")}
                  </Typography>
                </View>
                <Pressable onPress={removeRewardImage}>
                  <Feather
                    name="trash-2"
                    size={24}
                    color={COLORS.destructive}
                  />
                </Pressable>
              </View>
            )}
          </View>

          <View style={styles.attachContainer}>
            <Typography size="base" letterSpacing={0.5}>
              {t("challenge.rewardDocumentsLabel")}
            </Typography>
            <Typography size="xs" color={COLORS.gray}>
              {t("challenge.rewardDocumentsSubLabel")}
            </Typography>
            <AttachButton leftIcon="upload" onPress={pickRewardDocuments}>
              {t("challenge.addBannerFromLibrary")}
            </AttachButton>
            {rewardFiles?.map((file) => (
              <View key={file.uri} style={styles.fileCard}>
                <View style={styles.fileCardLeftContainer}>
                  <View style={styles.imagePreview}>
                    <Feather name="paperclip" size={20} />
                  </View>
                  <Typography size="sm" numberOfLines={1}>
                    {file.name}
                  </Typography>
                </View>
                <Pressable onPress={() => removeRewardFile(file.uri)}>
                  <Feather
                    name="trash-2"
                    size={24}
                    color={COLORS.destructive}
                  />
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Button
          variant="ghost"
          loading={isLoadingScreen}
          onPress={handleNoReward}
        >
          {t("challenge.noRewardButton")}
        </Button>
        <Button
          loading={isLoadingScreen}
          disabled={!hasFilledForm}
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
    gap: SPACING[2],
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: COLORS.mutedLight,
  },
  attachContainer: {
    display: "flex",
    gap: SPACING[2],
  },
  fileCard: {
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
  fileCardLeftContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  imagePreview: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateChallenge5;
