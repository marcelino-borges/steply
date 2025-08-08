import { z } from "zod";
import { intSchema } from "./primitives/number.schema";
import { dateSchema } from "./primitives/date.schema";
import { Lang } from "@/core/application/locales";

export const dbIdSchema = (lang: Lang) =>
  z.object({
    id: intSchema(lang),
  });

export const dbDatesSchema = (lang: Lang) =>
  z.object({
    createdAt: dateSchema(lang),
    updatedAt: dateSchema(lang),
  });

export const dbExclusiveFieldsSchema = (lang: Lang) =>
  dbDatesSchema(lang).merge(dbIdSchema(lang));
