import * as z from "zod";

import { dbIdSchema } from "@/core/application/schemas/db-exclusive-fields.schema";
import { stringSchema } from "./primitives/string.schema";
import { intSchema } from "./primitives/number.schema";
import { Lang } from "@/core/application/locales";

export const createRewardSchema = (lang: Lang) =>
  z.object({
    rewardTypeId: intSchema(lang),
    deliveryDetails: stringSchema(lang).optional(),
    name: stringSchema(lang),
    description: stringSchema(lang).optional(),
    imageUrl: stringSchema(lang).optional(),
    filesUrls: z.array(stringSchema(lang)).optional().default([]),
  });

export const updateRewardSchema = (lang: Lang) =>
  createRewardSchema(lang)
    .omit({ deliveryDetails: true, description: true, imageUrl: true })
    .merge(
      z.object({
        deliveryDetails: stringSchema(lang).nullable(),
        description: stringSchema(lang).nullable(),
        imageUrl: stringSchema(lang).nullable().optional(),
      }),
    )
    .merge(dbIdSchema(lang));

export const rewardByIdSchema = (lang: Lang) =>
  z.object({
    rewardId: intSchema(lang),
    challengeId: intSchema(lang),
  });
