import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/config/axios";
import { UserGoalDto } from "@/types/api/user-goal";
import { getUserLocale } from "@/utils/locales";

export const useGetUserGoalsList = () => {
  return useQuery<UserGoalDto[], AxiosError>({
    queryKey: ["user-goals"],
    queryFn: async () => {
      const response = await api.get<UserGoalDto[]>("/user-goals", {
        headers: {
          lang: getUserLocale(),
        },
      });
      return response.data;
    },
  });
};
