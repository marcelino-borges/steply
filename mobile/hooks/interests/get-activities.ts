import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { getLocales } from "expo-localization";

import { api } from "@/config/axios";
import { InterestActivityDto } from "@/types/api/interest-activity";

export const useGetInterestActivities = () => {
  const lang = getLocales()[0].languageCode;

  const { data, isLoading } = useQuery<InterestActivityDto[], AxiosError>({
    queryKey: ["interest-activities"],
    queryFn: async () => {
      const response = await api.get<InterestActivityDto[]>(
        "/interests/activities",
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
    activities: data,
    isLoadingActivities: isLoading,
  };
};
