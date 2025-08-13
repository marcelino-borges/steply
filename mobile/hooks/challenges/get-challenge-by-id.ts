import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { getLocales } from "expo-localization";

import { api } from "@/config/axios";
import { FullChallengeDto } from "@/types/api/challenges";

export const useGetChallengeById = (challengeId: number | undefined) => {
  return useQuery<FullChallengeDto, AxiosError>({
    queryKey: ["challenge", challengeId],
    queryFn: async () => {
      if (!challengeId) {
        throw new Error("Challenge ID is required");
      }

      const response = await api.get<FullChallengeDto>(
        `/challenges/${challengeId}`,
        {
          headers: {
            lang: getLocales()[0].languageCode,
          },
        }
      );
      return response.data;
    },
    enabled: !!challengeId,
  });
};