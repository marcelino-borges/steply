import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/config/axios";
import { UserMainGoalLevelDto } from "@/types/api/user-main-goal-level";
import { getUserLocale } from "@/utils/locales";

export const useGetUserMainGoalLevelsList = () => {
  return useQuery<UserMainGoalLevelDto[], AxiosError>({
    queryKey: ["user-main-goal-levels"],
    queryFn: async () => {
      const response = await api.get<UserMainGoalLevelDto[]>(
        "/user-main-goal-levels",
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
