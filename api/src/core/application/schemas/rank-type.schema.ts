import * as z from "zod";

import { dbIdSchema } from "@/core/application/schemas/db-exclusive-fields.schema";
import { stringSchema } from "./primitives/string.schema";
import { intSchema } from "./primitives/number.schema";
import { Lang } from "@/core/application/locales";

export const createRankTypeSchema = (lang: Lang) =>
  z.object({
    title: stringSchema(lang),
    description: stringSchema(lang).optional(),
    minCheckIns: intSchema(lang),
    rank: intSchema(lang),
  });

export const deleteRankTypeParamsSchema = (lang: Lang) =>
  z.object({
    rankTypeId: intSchema(lang),
    challengeId: intSchema(lang),
  });

export const createRankTypeParamsSchema = (lang: Lang) =>
  z.object({
    challengeId: intSchema(lang),
  });

export const updateRankTypeSchema = (lang: Lang) =>
  createRankTypeSchema(lang).merge(dbIdSchema(lang));
