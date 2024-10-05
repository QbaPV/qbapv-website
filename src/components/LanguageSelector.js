// src/components/LanguageSelector.js
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import spainFlag from '../assets/flags/spain-flag.png';
import usaFlag from '../assets/flags/usa-flag.png';
import { FaChevronDown } from 'react-icons/fa'; // Necesitas instalar react-icons si no lo tienes ya

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [showMenu, setShowMenu] = useState(false);

    const languages = [
        { code: 'es', name: 'Español', flag: spainFlag },
        { code: 'en', name: 'English', flag: usaFlag },
        // Aquí puedes añadir más idiomas en el futuro
    ];

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang); // Corregido a 'lang'
        setShowMenu(false); // Ocultar el menú al seleccionar un idioma
    };

    return (
        <div className="relative">
            <button onClick={toggleMenu} className="flex items-center space-x-1 text-[#DAA520] hover:text-green-400">
                <img src={currentLanguage.flag} alt={currentLanguage.name} className="w-4 h-4" /> {/* Ajustar tamaño de la bandera */}
                <span className="text-sm">{currentLanguage.code.toUpperCase()}</span> {/* Tamaño del texto */}
                <FaChevronDown className="ml-1" />
            </button>

            {showMenu && (
                <div className="absolute right-0 mt-2 w-28 bg-white shadow-md rounded-md z-10"> {/* Reducir el ancho del menú */}
                    {languages.map(lang => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className="flex items-center w-full px-2 py-1 hover:bg-gray-100"
                        >
                            <img src={lang.flag} alt={lang.name} className="w-4 h-4 mr-2" /> {/* Bandera más pequeña */}
                            <span className="text-sm">{lang.name}</span> {/* Reducir tamaño del texto */}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
