// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';

const resources = {
    en: {
        translation: translationEN
    },
    es: {
        translation: translationES
    }
};

i18n
    .use(initReactI18next) // Usamos el detector de lenguaje para detectar el idioma.
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('language') || 'es', // Usar el idioma de localStorage o español por defecto
        fallbackLng: 'es', // Idioma por defecto en caso de que falle
        interpolation: {
          escapeValue: false, // React ya se encarga de evitar inyecciones XSS
        }
    });

export default i18n;
