import * as z from "zod";

import { JoinMethod } from "@/core/domain/entities/challenge.entity";
import { Lang, t } from "@/core/application/locales";
import { stringSchema } from "./primitives/string.schema";
import { dateSchema } from "./primitives/date.schema";
import { intSchema } from "./primitives/number.schema";
import { booleanSchema } from "./primitives/boolean.schema";
import { dbIdSchema } from "./db-exclusive-fields.schema";
import { enumSchema } from "./primitives/enum.schema";

export const createChallengeSchema = (lang: Lang) =>
  z.object({
    title: stringSchema(lang),
    description: stringSchema(lang),
    startAt: dateSchema(lang),
    endAt: dateSchema(lang),
    isPublic: booleanSchema(lang),
    joinMethod: enumSchema(lang, JoinMethod),
    organizationId: intSchema(lang),
    bannerUrl: stringSchema(lang).optional(),
    rewardId: intSchema(lang).optional(),
    interactionIncrement: intSchema(lang).optional().default(1),
    tags: z.array(stringSchema(lang)).default([]),
    checkInEndOfDay: booleanSchema(lang),
    multipleCheckIns: booleanSchema(lang),
    checkInTypeCode: intSchema(lang),
  });

export const updateChallengeSchema = (lang: Lang) =>
  createChallengeSchema(lang)
    .merge(
      z.object({
        bannerUrl: stringSchema(lang).nullable(),
      }),
    )
    .merge(dbIdSchema(lang));

export const challengeIdParamsSchema = (lang: Lang) =>
  z.object({
    challengeId: intSchema(lang),
  });

export const queryChallengesSchema = (lang: Lang) =>
  z
    .object({
      pageSize: intSchema(lang).optional(),
      pageNumber: intSchema(lang).optional(),
      org: intSchema(lang).optional(),
      search: stringSchema(lang).optional(),
    })
    .optional();

export const userInteractChallengeSchema = (lang: Lang) =>
  z
    .object({
      videoUrl: stringSchema(lang).optional(),
      imageUrl: stringSchema(lang).optional(),
      text: stringSchema(lang).optional(),
      location: stringSchema(lang).optional(),
      userId: intSchema(lang),
    })
    .refine(
      ({ videoUrl, imageUrl, text, location }) =>
        videoUrl! && !imageUrl && !text && !location,
      t(lang).validations.interactChallengeOptionalProps,
    );
