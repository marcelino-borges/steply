import { z } from "zod";

import { Lang } from "@/core/application/locales";
import { intSchema } from "@/core/application/schemas/primitives/number.schema";

export const joinChallengeSchema = (lang: Lang) =>
  z.object({
    userId: intSchema(lang),
  });
