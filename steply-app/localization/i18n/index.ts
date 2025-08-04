import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import translationPt from "./locales/pt-BR/translation.json";

const resources = {
  "pt-BR": { translation: translationPt },
};

const languageDetector = {
  type: "languageDetector",
  detect: (callback: any) => callback(getLocales()[0].languageCode),
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
