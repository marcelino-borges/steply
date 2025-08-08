import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { getLocales } from "expo-localization";

import { api } from "@/config/axios";
import { UserGoalDto } from "@/types/api/user-goal";

export const useGetUserGoalsList = () => {
  return useQuery<UserGoalDto[], AxiosError>({
    queryKey: ["user-goals"],
    queryFn: async () => {
      const response = await api.get<UserGoalDto[]>("/user-goals", {
        headers: {
          lang: getLocales()[0].languageCode,
        },
      });
      return response.data;
    },
  });
};