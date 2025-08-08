import { ApiError } from "@/types/api/api-error";
import { AxiosError } from "axios";

export const adaptAxiosErrorToApiErrorMessage = (axiosError: AxiosError) => {
  return (axiosError.response?.data as ApiError)?.message ?? null;
};
