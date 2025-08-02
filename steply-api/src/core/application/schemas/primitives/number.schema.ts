import { z } from "zod";
import { Lang, t } from "@/core/application/locales";

export const numberSchema = (lang: Lang) =>
  z.coerce.number({
    invalid_type_error: t(lang).validations.invalidField,
    required_error: t(lang).validations.requiredField,
  });
export const intSchema = (lang: Lang) =>
  numberSchema(lang).int(t(lang).validations.invalidField);
