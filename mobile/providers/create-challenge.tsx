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
  setChallenge: (_newChallenge: NonExistingChallengeDto) => void;
  createChallenge?: (
    _newChallenge: NonExistingChallengeDto
  ) => Promise<FullChallengeDto>;
  isError: boolean;
  isPending: boolean;
}

export const CreateChallengeContext =
  React.createContext<CreateChallengeContextProps>({
    challenge: defaultChallenge,
    setChallenge: (_newChallenge: NonExistingChallengeDto) => {},
    createChallenge: undefined,
    isError: false,
    isPending: false,
  });

export const CreateChallengeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [challenge, setChallenge] =
    useState<NonExistingChallengeDto>(defaultChallenge);
  const { t } = useTranslation();

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

  return (
    <CreateChallengeContext.Provider
      value={{
        challenge,
        setChallenge,
        createChallenge: mutateAsync,
        isError,
        isPending,
      }}
    >
      {children}
    </CreateChallengeContext.Provider>
  );
};
