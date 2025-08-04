import { useContext } from "react";

import { CreateChallengeContext } from "@/providers/create-challenge";

export const useCreateChallenge = () => {
  const context = useContext(CreateChallengeContext);

  if (!context) {
    throw new Error(
      "useLocalization must be used within a LocalizationProvider"
    );
  }

  return context;
};
