// src/i18n.js - VERSIÓN OPTIMIZADA
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import translationPT from './locales/pt/translation.json';
import translationFR from './locales/fr/translation.json';
import translationDE from './locales/de/translation.json';
import translationIT from './locales/it/translation.json';

// Configuración de recursos de idiomas
const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  },
  pt: {
    translation: translationPT
  },
  fr: {
    translation: translationFR
  },
  de: {
    translation: translationDE
  },
  it: {
    translation: translationIT
  }
};

// Configuración del detector de idioma
const detectionOptions = {
  // Orden de detección: localStorage, detector del navegador, fallback
  order: ['localStorage', 'navigator', 'htmlTag'],
  
  // Caches que usar
  caches: ['localStorage'],
  
  // Clave para localStorage
  lookupLocalStorage: 'language',
  
  // No detectar desde cookies para mayor privacidad
  lookupCookie: false,
  
  // Detectar desde query string si es necesario
  lookupQuerystring: 'lng',
  
  // Detectar desde path si es necesario
  lookupFromPathIndex: 0,
  
  // Solo detectar códigos de idioma válidos
  checkWhitelist: true
};

// Función mejorada para obtener el idioma inicial
const getInitialLanguage = () => {
  // 1. Intentar obtener del localStorage primero
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && resources[savedLanguage]) {
    return savedLanguage;
  }
  
  // 2. Detectar del navegador con más inteligencia
  const browserLang = navigator.language || navigator.userLanguage;
  const primaryLang = browserLang.split('-')[0].toLowerCase();
  
  // Mapeo de variantes de idiomas
  const languageMap = {
    'en': 'en',
    'es': 'es',
    'pt': 'pt',
    'fr': 'fr',
    'de': 'de',
    'it': 'it',
    // Variantes específicas
    'pt-br': 'pt',
    'pt-pt': 'pt',
    'en-us': 'en',
    'en-gb': 'en',
    'es-mx': 'es',
    'es-ar': 'es',
    'fr-ca': 'fr',
    'de-at': 'de',
    'de-ch': 'de'
  };
  
  // Buscar en el mapeo
  const mappedLang = languageMap[browserLang.toLowerCase()] || languageMap[primaryLang];
  
  if (mappedLang && resources[mappedLang]) {
    // Guardar la preferencia detectada
    localStorage.setItem('language', mappedLang);
    return mappedLang;
  }
  
  // 3. Fallback basado en la región geográfica (si está disponible)
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timezone) {
    if (timezone.includes('Europe')) {
      if (timezone.includes('London')) return 'en';
      if (timezone.includes('Paris')) return 'fr';
      if (timezone.includes('Berlin')) return 'de';
      if (timezone.includes('Rome')) return 'it';
      if (timezone.includes('Madrid') || timezone.includes('Barcelona')) return 'es';
      if (timezone.includes('Lisbon')) return 'pt';
    }
    if (timezone.includes('America')) {
      if (timezone.includes('Brazil')) return 'pt';
      if (timezone.includes('New_York') || timezone.includes('Los_Angeles')) return 'en';
      // Mayoría de América Latina
      return 'es';
    }
  }
  
  // 4. Fallback final al español
  return 'es';
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    
    // Configuración de idioma
    lng: getInitialLanguage(),
    fallbackLng: 'es',
    
    // Idiomas permitidos
    whitelist: ['en', 'es', 'pt', 'fr', 'de', 'it'],
    
    // Configuración del detector
    detection: detectionOptions,
    
    // Configuración de interpolación
    interpolation: {
      escapeValue: false, // React ya maneja XSS
      formatSeparator: ',',
      format: function(value, format, lng) {
        if (format === 'uppercase') return value.toUpperCase();
        if (format === 'lowercase') return value.toLowerCase();
        if (format === 'capitalize') return value.charAt(0).toUpperCase() + value.slice(1);
        return value;
      }
    },
    
    // Configuración de carga de recursos
    load: 'languageOnly', // Solo cargar códigos de idioma (es, en) no regionales (es-ES, en-US)
    
    // Configuración de debug (solo en desarrollo)
    debug: process.env.NODE_ENV === 'development',
    
    // Configuración de namespace
    defaultNS: 'translation',
    ns: ['translation'],
    
    // Configuración de pluralización
    pluralSeparator: '_',
    contextSeparator: '_',
    
    // Configuración de salvado
    saveMissing: process.env.NODE_ENV === 'development',
    saveMissingTo: 'current',
    
    // Configuración de React
    react: {
      useSuspense: false, // Evitar problemas con SSR
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em', 'span']
    }
  });

// Evento personalizado cuando cambia el idioma
i18n.on('languageChanged', (lng) => {
  // Guardar en localStorage
  localStorage.setItem('language', lng);
  
  // Actualizar atributo html lang
  document.documentElement.lang = lng;
  
  // Actualizar dirección del texto si es necesario (para idiomas RTL futuros)
  document.documentElement.dir = lng === 'ar' || lng === 'he' ? 'rtl' : 'ltr';
  
  // Disparar evento personalizado para otros componentes
  window.dispatchEvent(new CustomEvent('languageChanged', { 
    detail: { language: lng, timestamp: Date.now() } 
  }));
});

// Configurar idioma inicial en el HTML
document.documentElement.lang = i18n.language;

export default i18n;