import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { getLocales } from "expo-localization";

import { api } from "@/config/axios";
import { ChallengeCheckInTypeDto } from "@/types/api/challenges";

export const useGetChallengeCheckInTypes = () => {
  return useQuery<ChallengeCheckInTypeDto[], AxiosError>({
    queryKey: ["challenge-checkin-types"],
    queryFn: async () => {
      const response = await api.get<ChallengeCheckInTypeDto[]>(
        "/challenge-checkin-types",
        {
          headers: {
            lang: getLocales()[0].languageCode,
          },
        }
      );
      return response.data;
    },
  });
};