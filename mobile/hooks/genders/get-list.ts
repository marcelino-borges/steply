import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { getLocales } from "expo-localization";

import { api } from "@/config/axios";
import { GenderDto } from "@/types/api/gender";

export const useGetGendersList = () => {
  return useQuery<GenderDto[], AxiosError>({
    queryKey: ["genders"],
    queryFn: async () => {
      const response = await api.get<GenderDto[]>("/genders", {
        headers: {
          lang: getLocales()[0].languageCode,
        },
      });
      return response.data;
    },
  });
};