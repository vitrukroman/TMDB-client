import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const resources = require("./localization.json");

i18n
.use(initReactI18next)
.init({
  lng: "uk",
  debug: true,
  resources,

  interpolation: {
    escapeValue: false,
  },
});
