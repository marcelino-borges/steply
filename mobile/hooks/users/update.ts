import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { api } from "@/config/axios";
import { FullUserResponseDto, UpdateUserRequestDto } from "@/types/api/user";
import { adaptAxiosErrorToApiErrorMessage } from "@/adapters/api-error";
import { getUserLocale } from "@/utils/locales";

export const useUpdateUser = () => {
  const { t } = useTranslation();

  const { mutateAsync, isPending } = useMutation<
    FullUserResponseDto,
    AxiosError,
    UpdateUserRequestDto
  >({
    mutationFn: async (userData: UpdateUserRequestDto) => {
      try {
        const { id, ...updateData } = userData;
        const response = await api.patch<FullUserResponseDto>(
          `/users/${id}`,
          updateData,
          {
            headers: {
              lang: getUserLocale(),
            },
          }
        );
        return response.data;
      } catch (error) {
        const errorMessage = adaptAxiosErrorToApiErrorMessage(
          error as AxiosError
        );
        console.log(
          "------------- [ERROR] User update failed",
          JSON.stringify(error, null, 2)
        );

        throw new Error(errorMessage ?? t("user.updateError"));
      }
    },
  });

  return { updateUser: mutateAsync, isUpdating: isPending };
};
