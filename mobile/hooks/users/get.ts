import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { fetchUser } from "@/app/services/user";
import { FullUserResponseDto } from "@/types/api/user";

type FindParam = {userId: number} | { email: string}

export const useGetUser = (param: FindParam, enabled: boolean = true) => {
  const isEmailParam = 'email' in param;
  
  const queryKey = isEmailParam 
    ? ["user", "email", param.email]
    : ["user", "id", param.userId];
  
  return useQuery<FullUserResponseDto, AxiosError>({
    queryKey,
    queryFn: () => fetchUser(param),
    enabled,
  });
};