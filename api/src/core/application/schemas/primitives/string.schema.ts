import { z } from "zod";
import { Lang, t } from "@/core/application/locales";

export const stringSchema = (lang: Lang) =>
  z.string({
    invalid_type_error: t(lang).validations.invalidField,
    required_error: t(lang).validations.requiredField,
  });
