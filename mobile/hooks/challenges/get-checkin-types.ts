import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/config/axios";
import { ChallengeCheckInTypeDto } from "@/types/api/challenges";
import { getUserLocale } from "@/utils/locales";

export const useGetChallengeCheckInTypes = () => {
  return useQuery<ChallengeCheckInTypeDto[], AxiosError>({
    queryKey: ["challenge-checkin-types"],
    queryFn: async () => {
      const response = await api.get<ChallengeCheckInTypeDto[]>(
        "/challenge-checkin-types",
        {
          headers: {
            lang: getUserLocale(),
          },
        }
      );
      return response.data;
    },
  });
};
