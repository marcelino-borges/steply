import { z } from "zod";
import { Lang, t } from "@/core/application/locales";

export const booleanSchema = (lang: Lang) =>
  z.boolean({
    invalid_type_error: t(lang).validations.invalidField,
    required_error: t(lang).validations.requiredField,
  });
