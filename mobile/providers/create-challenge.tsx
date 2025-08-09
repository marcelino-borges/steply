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

const defaultChallenge: NonExistingChallengeDto = {
  title: "",
  description: "",
  startAt: new Date(),
  endAt: new Date(),
  joinMethod: JoinMethod.OPEN,
  bannerUrl: undefined,
  rewardId: undefined,
  interactionIncrement: 1,
  isPublic: true,
  organizationId: 0,
};

interface CreateChallengeContextProps {
  challenge: NonExistingChallengeDto;
  setChallenge: (newChallenge: NonExistingChallengeDto) => void;
  createChallenge?: () => Promise<FullChallengeDto>;
  isError: boolean;
  isPending: boolean;
  banner?: BannerProps;
  setBanner: (banner: BannerProps | undefined) => void;
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
  });

export const CreateChallengeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { t } = useTranslation();

  const { uploadFile, deleteFile, isUploading, isDeleting } = useFileStorage();

  const [banner, setBanner] = useState<BannerProps | undefined>();

  const [challenge, setChallenge] =
    useState<NonExistingChallengeDto>(defaultChallenge);

  const { mutateAsync, isError, isPending } = useMutation<
    FullChallengeDto,
    AxiosError,
    NonExistingChallengeDto
  >({
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

  const handleCreateChallenge = async () => {
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
        throw new Error(error);
      }

      if (data) {
        bannerUrl = data;
      }
    }

    try {
      const challengeCreated = await mutateAsync({
        ...challenge,
        bannerUrl,
      });
      Toast.success(t("challenge.createSuccess"));

      return challengeCreated;
    } catch (error) {
      deleteFile(bannerUrl)
        .then(() => {
          console.log("-------------- [DEBUG] File deleted successfuly");
        })
        .catch((error) => {
          console.log("-------------- [ERROR] File deletion failed", error);
        });
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
        isPending: isPending || isUploading || isDeleting,
        banner,
        setBanner,
      }}
    >
      {children}
    </CreateChallengeContext.Provider>
  );
};
