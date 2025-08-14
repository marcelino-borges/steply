import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getLocales } from "expo-localization";

import { api } from "@/config/axios";
import { adaptAxiosErrorToApiErrorMessage } from "@/adapters/api-error";

interface AddUserActivitiesParams {
  userId: number;
  activityIds: number[];
}

export const useAddUserActivities = () => {
  const { t } = useTranslation();

  const { mutateAsync, isPending } = useMutation<
    void,
    AxiosError,
    AddUserActivitiesParams
  >({
    mutationFn: async ({ userId, activityIds }: AddUserActivitiesParams) => {
      try {
        await api.post(
          `/users/${userId}/activities`,
          { activityIds },
          {
            headers: {
              lang: getLocales()[0].languageCode,
            },
          }
        );
      } catch (error) {
        const errorMessage = adaptAxiosErrorToApiErrorMessage(
          error as AxiosError
        );
        console.log("------------- [ERROR] Add user activities failed", error);

        throw new Error(errorMessage ?? t("user.addActivitiesError"));
      }
    },
  });

  return { addActivities: mutateAsync, isAddingActivities: isPending };
};
