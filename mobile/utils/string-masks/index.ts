import { Mask } from "@react-input/mask";
import { format } from "date-fns";

export const phoneMask = new Mask({
  mask: "(__) _____-____",
  replacement: { _: /\d/ },
});

export const formatDateByLocale = (locale: string, date: Date) => {
  const mask: Record<string, string> = {
    en: "dd/MM/yyyy",
    pt: "MM/dd/yyyy",
  };

  return format(date, mask[locale]);
};
