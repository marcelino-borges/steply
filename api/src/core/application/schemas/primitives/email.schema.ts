import { Lang, t } from "@/core/application/locales";
import { stringSchema } from "./string.schema";

export const emailSchema = (lang: Lang) =>
  stringSchema(lang).email(t(lang).validations.invalidField);
