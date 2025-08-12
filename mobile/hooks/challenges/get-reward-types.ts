import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { getLocales } from "expo-localization";

import { api } from "@/config/axios";
import { RewardTypeDto } from "@/types/api/reward-type";

export const useGetRewardTypes = () => {
  return useQuery<RewardTypeDto[], AxiosError>({
    queryKey: ["reward-types"],
    queryFn: async () => {
      const response = await api.get<RewardTypeDto[]>("/reward-types", {
        headers: {
          lang: getLocales()[0].languageCode,
        },
      });
      return response.data;
    },
  });
};