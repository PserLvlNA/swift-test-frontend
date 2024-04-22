import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import HttpApi from "i18next-http-backend"

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

export const supportLang = {
    en: "EN",
    th: "TH"
}

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    lng: "th",
    fallbackLng: "th",
    supportedLngs: Object.keys(supportLang),
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;