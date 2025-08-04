import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getLocales } from "expo-localization";

import { api } from "@/config/axios";
import { FullUserResponseDto, SignUpRequestDto } from "@/types/api/user";
import { adaptAxiosErrorToApiErrorMessage } from "@/adapters/api-error";

export const useCreateUser = () => {
  const { t } = useTranslation();

  return useMutation<FullUserResponseDto, AxiosError, SignUpRequestDto>({
    mutationFn: async (signupData: SignUpRequestDto) => {
      try {
        const response = await api.post<FullUserResponseDto>(
          "/users",
          signupData,
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
        console.log("------------- [ERROR] User signup failed", error);

        throw new Error(errorMessage ?? t("auth.signupError"));
      }
    },
  });
};
