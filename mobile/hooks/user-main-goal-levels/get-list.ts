import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { getLocales } from "expo-localization";

import { api } from "@/config/axios";
import { UserMainGoalLevelDto } from "@/types/api/user-main-goal-level";

export const useGetUserMainGoalLevelsList = () => {
  const lang = getLocales()[0].languageCode;

  return useQuery<UserMainGoalLevelDto[], AxiosError>({
    queryKey: ["user-main-goal-levels"],
    queryFn: async () => {
      const response = await api.get<UserMainGoalLevelDto[]>(
        "/user-main-goal-levels",
        {
          headers: {
            lang,
          },
        }
      );
      return response.data;
    },
  });
};
