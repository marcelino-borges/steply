import { isClerkAPIResponseError } from "@clerk/clerk-expo";

export const handleClerkErrorMessage = (
  error: unknown,
  t: (key: string) => string
) => {
  if (!isClerkAPIResponseError(error)) return (error as Error).message;

  const code = error.errors[0].code;

  return t(`errors.clerk.${code}`) ?? "Erro do provedor de identidade";
};
