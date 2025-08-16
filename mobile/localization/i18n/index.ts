import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationPt from "./locales/pt-BR/translation.json";
import { getUserLocale } from "@/utils/locales";

const resources = {
  "pt-BR": { translation: translationPt },
};

const languageDetector = {
  type: "languageDetector",
  detect: (callback: any) => callback(getUserLocale()),
  init: () => {},
  cacheUserLanguage: () => {},
} as const;

i18n.use(initReactI18next).use(languageDetector).init({
  resources,
  fallbackLng: "pt-BR",
  initImmediate: false,
  lng: "pt-BR",
});

export default i18n;
