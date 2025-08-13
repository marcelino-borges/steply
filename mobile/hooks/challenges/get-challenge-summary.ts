import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { getLocales } from "expo-localization";

import { api } from "@/config/axios";
import { ChallengeSummaryDto } from "@/types/api/challenges";

export const useGetChallengeSummary = (challengeId: number | undefined) => {
  return useQuery<ChallengeSummaryDto, AxiosError>({
    queryKey: ["challenge-summary", challengeId],
    queryFn: async () => {
      if (!challengeId) {
        throw new Error("Challenge ID is required");
      }

      const response = await api.get<ChallengeSummaryDto>(
        `/challenges/${challengeId}/summary`,
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