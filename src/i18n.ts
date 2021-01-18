import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en/translation.json';
import bg from './locales/bg/translation.json';
import { initReactI18next } from 'react-i18next';
import moment from 'moment';

const options = {
  // order and from where user language should be detected
  order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
}

const resources = {
  en: {
    translation: en
  },
  bg: {
    translation: bg
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: resources,
    detection: options,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
      format: function (value, format) {
        if (value instanceof Date) return moment(value).format(format);
        return value;
      }

    },
  });

export default i18n;