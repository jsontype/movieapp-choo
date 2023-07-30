import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "./locales/en"
import ko from "./locales/ko"
import ja from "./locales/ja"

i18n.use(initReactI18next).init({
  resources: {
    en,
    ko,
    ja,
  },
  lng: "ko",
  // lng: navigator.language, // 언어 디텍터를 사용한 경우
  interpolation: {
    escapevalue: false,
  },
})

export default i18n
