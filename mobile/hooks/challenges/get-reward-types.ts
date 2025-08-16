import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/config/axios";
import { RewardTypeDto } from "@/types/api/reward-type";
import { getUserLocale } from "@/utils/locales";

export const useGetRewardTypes = () => {
  return useQuery<RewardTypeDto[], AxiosError>({
    queryKey: ["reward-types"],
    queryFn: async () => {
      const response = await api.get<RewardTypeDto[]>("/reward-types", {
        headers: {
          lang: getUserLocale(),
        },
      });
      return response.data;
    },
  });
};
