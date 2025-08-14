import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { getLocales } from "expo-localization";

import { api } from "@/config/axios";
import { SuggestedActivityDto } from "@/types/api/suggested-activity";

export const useGetChallengesSuggestedActivities = () => {
  const lang = getLocales()[0].languageCode;

  const { data, isLoading } = useQuery<SuggestedActivityDto[], AxiosError>({
    queryKey: ["suggested-activities"],
    queryFn: async () => {
      const response = await api.get<SuggestedActivityDto[]>(
        "/suggestions/activities",
        {
          headers: {
            lang,
          },
        }
      );
      return response.data;
    },
  });

  return {
    suggestedActivities: data,
    isLoadingActivities: isLoading,
  };
};
