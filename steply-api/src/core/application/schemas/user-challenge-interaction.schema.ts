import { Lang } from "@/core/application/locales";
import { intSchema } from "@/core/application/schemas/primitives/number.schema";
import * as z from "zod";

export const userChallengeInteractionSchema = (lang: Lang) =>
  z.object({
    userId: intSchema(lang),
    challengeId: intSchema(lang),
  });
