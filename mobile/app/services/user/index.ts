import { getLocales } from "expo-localization";
import { api } from "@/config/axios";
import { FullUserResponseDto } from "@/types/api/user";

type FindParam = { userId: number } | { email: string };

export const fetchUser = async (param: FindParam): Promise<FullUserResponseDto> => {
  const isEmailParam = 'email' in param;
  
  const url = isEmailParam 
    ? `/users/email/${param.email}`
    : `/users/${param.userId}`;
  
  const response = await api.get<FullUserResponseDto>(url, {
    headers: {
      lang: getLocales()[0].languageCode,
    },
  });
  
  return response.data;
};