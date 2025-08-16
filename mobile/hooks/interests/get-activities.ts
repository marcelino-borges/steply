import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/config/axios";
import { InterestActivityDto } from "@/types/api/interest-activity";
import { getUserLocale } from "@/utils/locales";

export const useGetInterestActivities = () => {
  const { data, isLoading } = useQuery<InterestActivityDto[], AxiosError>({
    queryKey: ["interest-activities"],
    queryFn: async () => {
      const response = await api.get<InterestActivityDto[]>(
        "/interests/activities",
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
    activities: data,
    isLoadingActivities: isLoading,
  };
};
