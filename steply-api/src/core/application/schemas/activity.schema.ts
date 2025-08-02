import * as z from "zod";

import { dbIdSchema } from "@/core/application/schemas/db-exclusive-fields.schema";
import { Lang } from "@/core/application/locales";
import { stringSchema } from "./primitives/string.schema";
import { dateSchema } from "./primitives/date.schema";
import { intSchema } from "./primitives/number.schema";

export const createActivitySchema = (lang: Lang) =>
  z.object({
    title: stringSchema(lang),
    description: stringSchema(lang).optional(),
    startAt: dateSchema(lang),
    endAt: dateSchema(lang),
  });

export const updateActivitySchema = (lang: Lang) =>
  createActivitySchema(lang)
    .omit({
      description: true,
    })
    .merge(
      z.object({
        description: stringSchema(lang).nullable(),
      }),
    )
    .merge(dbIdSchema(lang));

export const activityByIdSchema = (lang: Lang) =>
  z.object({
    activityId: intSchema(lang),
    challengeId: intSchema(lang),
  });

export const queryActivitiesSchema = (lang: Lang) =>
  z.object({
    challengeId: intSchema(lang).optional(),
    searchActivity: stringSchema(lang).optional(),
    searchChallenge: stringSchema(lang).optional(),
    startAt: dateSchema(lang).optional(),
    endAt: dateSchema(lang).optional(),
    pageNumber: intSchema(lang).optional(),
    pageSize: intSchema(lang).optional(),
  });
