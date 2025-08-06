import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { getLocales } from "expo-localization";

import { api } from "@/config/axios";
import { FullUserResponseDto } from "@/types/api/user";

type FindParam = {userId: number} | { email: string}

export const useGetUser = (param: FindParam, enabled: boolean = true) => {
  const isEmailParam = 'email' in param;
  
  const queryKey = isEmailParam 
    ? ["user", "email", param.email]
    : ["user", "id", param.userId];
    
  const url = isEmailParam 
    ? `/users/email/${param.email}`
    : `/users/${param.userId}`;
  
  return useQuery<FullUserResponseDto, AxiosError>({
    queryKey,
    queryFn: async () => {
      const response = await api.get<FullUserResponseDto>(url, {
        headers: {
          lang: getLocales()[0].languageCode,
        },
      });
      return response.data;
    },
    enabled,
  });
};