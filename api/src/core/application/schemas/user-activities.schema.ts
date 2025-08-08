import * as z from "zod";
import { Lang, t } from "@/core/application/locales";
import { intSchema } from "./primitives/number.schema";

export const userActivitiesBodySchema = (lang: Lang) =>
  z.object({
    activityIds: z.array(intSchema(lang)),
  });

export const userActivityParamsSchema = (lang: Lang) =>
  z.object({
    userId: z.coerce
      .number({
        invalid_type_error: t(lang).validations.invalidField,
        required_error: t(lang).validations.requiredField,
      })
      .int(t(lang).validations.invalidField),
  });
