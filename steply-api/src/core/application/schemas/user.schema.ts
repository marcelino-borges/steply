import * as z from "zod";

import { Lang, t } from "@/core/application/locales";
import { dbIdSchema } from "@/core/application/schemas/db-exclusive-fields.schema";
import { emailSchema } from "@/core/application/schemas/primitives/email.schema";
import { intSchema } from "@/core/application/schemas/primitives/number.schema";
import { stringSchema } from "@/core/application/schemas/primitives/string.schema";
import { booleanSchema } from "@/core/application/schemas/primitives/boolean.schema";

export const createUserBodySchema = (lang: Lang) =>
  z.object({
    name: stringSchema(lang),
    email: emailSchema(lang),
    phone: stringSchema(lang),
    street: stringSchema(lang).optional(),
    city: stringSchema(lang).optional(),
    state: stringSchema(lang).optional(),
    bio: stringSchema(lang).nullish().default(null),
    neighborhood: stringSchema(lang).optional(),
    addressNumber: stringSchema(lang).optional(),
    postalCode: stringSchema(lang).optional(),
    pictureUrl: stringSchema(lang).nullish().default(""),
    organizationId: intSchema(lang).nullish().default(null),
    countryId: intSchema(lang),
    acceptsCommunication: booleanSchema(lang),
    wantsAccountPersonalization: booleanSchema(lang).optional().default(false),
    genderId: intSchema(lang).nullish().default(0),
    goalId: intSchema(lang).nullish(),
    mainGoalLevelId: intSchema(lang).nullish(),
    nextRegistrationStep: intSchema(lang).optional().default(0),
  });

export const userIdParamsSchema = (lang: Lang) =>
  z.object({
    userId: z.coerce
      .number({
        invalid_type_error: t(lang).validations.invalidField,
        required_error: t(lang).validations.requiredField,
      })
      .int(t(lang).validations.invalidField),
  });

export const updateUserSchema = (lang: Lang) =>
  createUserBodySchema(lang)
    .omit({ organizationId: true })
    .merge(z.object({ organizationId: intSchema(lang).nullable() }))
    .merge(dbIdSchema(lang));
