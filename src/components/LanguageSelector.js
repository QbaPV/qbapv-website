// src/components/LanguageSelector.js - VERSIÓN CON GOOGLE ANALYTICS
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronDown, FaGlobe } from 'react-icons/fa';
import { GAEvents } from '../config/analytics';
import spainFlag from '../assets/flags/spain-flag.png';
import usaFlag from '../assets/flags/usa-flag.png';
import brazilFlag from '../assets/flags/brazil-flag.svg';
import franceFlag from '../assets/flags/france-flag.svg';
import germanyFlag from '../assets/flags/germany-flag.svg';
import italyFlag from '../assets/flags/italy-flag.svg';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { 
      code: 'es', 
      name: 'Español', 
      nativeName: 'Español',
      flag: spainFlag 
    },
    { 
      code: 'en', 
      name: 'English', 
      nativeName: 'English',
      flag: usaFlag 
    },
    { 
      code: 'pt', 
      name: 'Portuguese', 
      nativeName: 'Português',
      flag: brazilFlag
    },
    { 
      code: 'fr', 
      name: 'French', 
      nativeName: 'Français',
      flag: franceFlag
    },
    { 
      code: 'de', 
      name: 'German', 
      nativeName: 'Deutsch',
      flag: germanyFlag
    },
    { 
      code: 'it', 
      name: 'Italian', 
      nativeName: 'Italiano',
      flag: italyFlag
    },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  // Solo mostrar el idioma que NO está activo
  const availableLanguages = languages.filter(lang => lang.code !== i18n.language);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cerrar dropdown con Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (langCode) => {
    if (langCode !== i18n.language) {
      i18n.changeLanguage(langCode);
      localStorage.setItem('language', langCode);
      
      // Trackear cambio de idioma en Google Analytics
      GAEvents.changeLanguage(langCode);
      
      // Disparar evento personalizado para notificar el cambio
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: langCode } 
      }));
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-800 bg-opacity-50 hover:bg-opacity-70 text-yellow-600 hover:text-yellow-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select language"
      >
        <div className="flex items-center space-x-2">
          <img 
            src={currentLanguage.flag} 
            alt={`${currentLanguage.name} flag`}
            className="w-5 h-4 object-cover rounded-sm shadow-sm"
          />
          <span className="text-sm font-medium hidden sm:inline">
            {currentLanguage.code.toUpperCase()}
          </span>
          <FaGlobe className="sm:hidden" size={16} />
        </div>
        <FaChevronDown 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          size={12}
        />
      </button>

      {/* Dropdown Menu - COMPLETAMENTE LIMPIO */}
      <div className={`absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden transition-all duration-200 ${
        isOpen 
          ? 'opacity-100 transform scale-100 translate-y-0' 
          : 'opacity-0 transform scale-95 -translate-y-2 pointer-events-none'
      }`}>
        {/* Solo idiomas disponibles (no el actual) */}
        <div className="py-1">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="w-full flex items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors duration-150 group"
              role="menuitem"
            >
              <img 
                src={lang.flag} 
                alt={`${lang.name} flag`}
                className="w-5 h-4 object-cover rounded-sm mr-3 shadow-sm"
              />
              <div className="flex-1">
                <div className="text-sm font-medium group-hover:text-gray-900">
                  {lang.nativeName}
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {/* Footer mejorado con traducción dinámica */}
        <div className="px-3 py-2 border-t border-gray-100 bg-gray-50">
          <div className="text-xs text-gray-500 text-center">
            {languages.length} {t('languages_available')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
