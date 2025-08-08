import React from "react";
import { Stack } from "expo-router";

import { CreateChallengeProvider } from "@/providers/create-challenge";

const CreateChallengeLayout: React.FC = () => {
  return (
    <CreateChallengeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CreateChallengeProvider>
  );
};

export default CreateChallengeLayout;
