import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/config/axios";
import { ActivityDto } from "@/types/api/activity";

export const useGetUserActivities = (userId: number) => {
  return useQuery<ActivityDto[], AxiosError>({
    queryKey: ["user-activities", userId],
    queryFn: async () => {
      const response = await api.get<ActivityDto[]>(
        `/users/${userId}/activities`
      );
      return response.data;
    },
    enabled: !!userId,
  });
};