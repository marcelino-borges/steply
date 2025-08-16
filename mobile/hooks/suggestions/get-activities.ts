import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/config/axios";
import { SuggestedActivityDto } from "@/types/api/suggested-activity";
import { getUserLocale } from "@/utils/locales";

export const useGetChallengesSuggestedActivities = () => {
  const { data, isLoading } = useQuery<SuggestedActivityDto[], AxiosError>({
    queryKey: ["suggested-activities"],
    queryFn: async () => {
      const response = await api.get<SuggestedActivityDto[]>(
        "/suggestions/activities",
        {
          headers: {
            lang: getUserLocale(),
          },
        }
      );
      return response.data;
    },
  });

  return {
    suggestedActivities: data,
    isLoadingSuggestedActivities: isLoading,
  };
};
