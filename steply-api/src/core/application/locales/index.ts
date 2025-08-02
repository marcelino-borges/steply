import { enMessages } from "./en.locale";
import { ptMessages } from "./pt.locale";

export type Dictionary = typeof ptMessages;
export type Lang = keyof typeof locales;

const locales = {
  pt: ptMessages,
  en: enMessages,
} as const;

export const t = (lang: Lang) => {
  const [langPrefix] = lang.split("-");
  const dic = locales[langPrefix] as Dictionary | undefined;

  return dic ?? locales.en;
};
