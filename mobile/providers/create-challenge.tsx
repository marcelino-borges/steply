import React, { useState } from "react";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { api } from "@/config/axios";
import {
  FullChallengeDto,
  JoinMethod,
  NonExistingChallengeDto,
} from "@/types/api/challenges";
import { useTranslation } from "react-i18next";
import { getLocales } from "expo-localization";
import { adaptAxiosErrorToApiErrorMessage } from "@/adapters/api-error";
import { useFileStorage } from "@/hooks/s3";
import { Toast } from "toastify-react-native";
import { NonExistingActivityDto } from "@/types/api/activity";
import { RewardTypeDto } from "@/types/api/reward-type";
import { NonExistingRewardDto } from "@/types/api/reward";

const defaultChallenge: NonExistingChallengeDto = {
  title: "",
  description: "",
  startAt: new Date(),
  endAt: new Date(),
  joinMethod: JoinMethod.OPEN,
  bannerUrl: undefined,
  interactionIncrement: 1,
  isPublic: true,
  organizationId: 0,
  tags: [],
  checkInEndOfDay: false,
  multipleCheckIns: false,
  checkInTypeCode: 1,
};

interface CreateChallengeContextProps {
  challenge: NonExistingChallengeDto;
  createdChallenge?: FullChallengeDto;
  setChallenge: (newChallenge: NonExistingChallengeDto) => void;
  createChallenge?: () => Promise<FullChallengeDto>;
  isError: boolean;
  isPending: boolean;
  banner?: BannerProps;
  setBanner: (banner: BannerProps | undefined) => void;
  activities: NonExistingActivityDto[];
  setActivities: (activities: NonExistingActivityDto[]) => void;
  selectedRewardType?: RewardTypeDto;
  setSelectedRewardType: (rewardType: RewardTypeDto | undefined) => void;
  reward?: NonExistingRewardDto;
  setReward: (reward: NonExistingRewardDto | undefined) => void;
  rewardImage?: { uri: string; mimeType: string };
  setRewardImage: (
    image: { uri: string; mimeType: string } | undefined
  ) => void;
  rewardFiles?: { uri: string; mimeType: string; name: string }[];
  setRewardFiles: (
    files: { uri: string; mimeType: string; name: string }[] | undefined
  ) => void;
}

interface BannerProps {
  uri: string;
  mimeType: string;
}

export const CreateChallengeContext =
  React.createContext<CreateChallengeContextProps>({
    challenge: defaultChallenge,
    setChallenge: (_newChallenge: NonExistingChallengeDto) => {},
    createChallenge: undefined,
    isError: false,
    isPending: false,
    banner: undefined,
    setBanner: () => {},
    activities: [],
    setActivities: () => {},
    selectedRewardType: undefined,
    setSelectedRewardType: () => {},
    reward: undefined,
    setReward: () => {},
    rewardImage: undefined,
    setRewardImage: () => {},
    rewardFiles: undefined,
    setRewardFiles: () => {},
    createdChallenge: undefined,
  });

export const CreateChallengeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { t } = useTranslation();

  const { uploadFile, deleteFile, isUploading, isDeleting } = useFileStorage();

  const [banner, setBanner] = useState<BannerProps | undefined>();
  const [activities, setActivities] = useState<NonExistingActivityDto[]>([]);
  const [selectedRewardType, setSelectedRewardType] = useState<
    RewardTypeDto | undefined
  >(undefined);
  const [reward, setReward] = useState<NonExistingRewardDto | undefined>(
    undefined
  );
  const [rewardImage, setRewardImage] = useState<
    { uri: string; mimeType: string } | undefined
  >(undefined);
  const [rewardFiles, setRewardFiles] = useState<
    { uri: string; mimeType: string; name: string }[] | undefined
  >(undefined);

  const [challenge, setChallenge] =
    useState<NonExistingChallengeDto>(defaultChallenge);

  const [createdChallenge, setCreatedChallenge] = useState<FullChallengeDto>();

  const {
    mutateAsync: createChallenge,
    isError,
    isPending: isCreatingChallenge,
  } = useMutation<FullChallengeDto, AxiosError, NonExistingChallengeDto>({
    mutationFn: async (_newChallenge: NonExistingChallengeDto) => {
      try {
        const response = await api.post<FullChallengeDto>(
          "/challenges",
          _newChallenge,
          {
            headers: {
              lang: getLocales()[0].languageCode,
            },
          }
        );
        return response.data;
      } catch (error) {
        const errorMessage = adaptAxiosErrorToApiErrorMessage(
          error as AxiosError
        );
        console.log("------------- [ERROR] Create challenge failed", error);

        throw new Error(errorMessage ?? t("challenge.createError"));
      }
    },
  });

  const uploadChallengeFiles = async () => {
    const uploadPromises: Promise<
      { error: string; data: null } | { data: string; error: null }
    >[] = [];

    // Upload banner
    if (banner) {
      uploadPromises.push(
        uploadFile(
          "challenges",
          banner.uri,
          banner.mimeType,
          `banner_${Date.now()}`
        )
      );
    }

    // Upload reward image
    if (rewardImage) {
      uploadPromises.push(
        uploadFile(
          "rewards",
          rewardImage.uri,
          rewardImage.mimeType,
          `reward_image_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
        )
      );
    }

    // Upload reward files
    if (rewardFiles && rewardFiles.length > 0) {
      rewardFiles.forEach((file, index) => {
        const fileExtension = file.name.split(".").pop() || "";
        uploadPromises.push(
          uploadFile(
            "rewards",
            file.uri,
            file.mimeType,
            `reward_file_${Date.now()}_${index}_${Math.random().toString(36).substring(2, 11)}.${fileExtension}`
          )
        );
      });
    }

    // Upload all files in parallel
    const uploadResults = await Promise.all(uploadPromises);

    let bannerUrl = "";
    let rewardImageUrl = "";
    const rewardFilesUrls: string[] = [];
    const uploadedFiles: string[] = [];

    let resultIndex = 0;

    // Process banner result
    if (banner) {
      const bannerResult = uploadResults[resultIndex++];
      if (bannerResult.error) {
        throw new Error(bannerResult.error);
      }
      if (bannerResult.data) {
        bannerUrl = bannerResult.data;
        uploadedFiles.push(bannerUrl);
      }
    }

    // Process reward image result
    if (rewardImage) {
      const imageResult = uploadResults[resultIndex++];
      if (imageResult.error) {
        throw new Error(imageResult.error);
      }
      if (imageResult.data) {
        rewardImageUrl = imageResult.data;
        uploadedFiles.push(rewardImageUrl);
      }
    }

    // Process reward files results
    if (rewardFiles && rewardFiles.length > 0) {
      for (let i = 0; i < rewardFiles.length; i++) {
        const fileResult = uploadResults[resultIndex++];
        if (fileResult.error) {
          throw new Error(fileResult.error);
        }
        if (fileResult.data) {
          rewardFilesUrls.push(fileResult.data);
          uploadedFiles.push(fileResult.data);
        }
      }
    }

    return {
      bannerUrl,
      rewardImageUrl,
      rewardFilesUrls,
      uploadedFiles, // for cleanup on error
    };
  };

  const clearAllStates = () => {
    setChallenge(defaultChallenge);
    setBanner(undefined);
    setActivities([]);
    setSelectedRewardType(undefined);
    setReward(undefined);
    setRewardImage(undefined);
    setRewardFiles(undefined);
  };

  const handleCreateChallenge = async () => {
    let uploadedFiles: string[] = [];

    try {
      const {
        bannerUrl,
        rewardImageUrl,
        rewardFilesUrls,
        uploadedFiles: files,
      } = await uploadChallengeFiles();

      uploadedFiles = files;

      // Prepare reward data if exists
      let rewardData = undefined;
      if (reward && selectedRewardType) {
        rewardData = {
          ...reward,
          rewardTypeId: selectedRewardType.id,
          imageUrl: rewardImageUrl || undefined,
          filesUrls: rewardFilesUrls.length > 0 ? rewardFilesUrls : undefined,
        };
      }

      const challengeCreated = await createChallenge({
        ...challenge,
        bannerUrl,
        reward: rewardData,
      });

      setCreatedChallenge(challengeCreated);
      clearAllStates();

      Toast.success(t("challenge.createSuccess"));
      return challengeCreated;
    } catch (error) {
      // Clean up uploaded files on error
      const deletePromises = uploadedFiles.map((fileUrl) =>
        deleteFile(fileUrl).catch((deleteError) =>
          console.log(
            "-------------- [ERROR] File deletion failed",
            deleteError
          )
        )
      );

      await Promise.all(deletePromises);
      Toast.error(`${t("challenge.createError")}: ${(error as Error).message}`);
      throw error;
    }
  };

  return (
    <CreateChallengeContext.Provider
      value={{
        challenge,
        setChallenge,
        createChallenge: handleCreateChallenge,
        isError,
        isPending: isCreatingChallenge || isUploading || isDeleting,
        banner,
        setBanner,
        activities,
        setActivities,
        selectedRewardType,
        setSelectedRewardType,
        reward,
        setReward,
        rewardImage,
        setRewardImage,
        rewardFiles,
        setRewardFiles,
        createdChallenge,
      }}
    >
      {children}
    </CreateChallengeContext.Provider>
  );
};
