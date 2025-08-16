import { LOCALES_MAP } from "@/constants/locales";
import { DEFAULT_TIMEZONE } from "@/constants/timezone";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { getCalendars, getLocales } from "expo-localization";

export const getUserLocale = () => {
  return getLocales()[0].languageCode ?? "en";
};

export const getUserTimezone = () => {
  return getCalendars()[0].timeZone ?? DEFAULT_TIMEZONE;
};

export const getDateFnsLocale = () => {
  const languageCode = getUserLocale();

  if (!languageCode) return enUS;

  return LOCALES_MAP[languageCode];
};

export const formatDateByLocale = (date: Date) => {
  return format(date, "dd/MM/yyyy", {
    locale: getDateFnsLocale(),
  });
};
