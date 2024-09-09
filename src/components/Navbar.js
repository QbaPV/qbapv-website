// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import logoNavbarEn from '../assets/logos/logo-navbar-en.png';
import logoNavbarEs from '../assets/logos/logo-navbar-es.png'; // Puedes cambiar las rutas si prefieres otra carpeta


const Navbar = () => {
  const { t, i18n } = useTranslation(); // Añadir `i18n` para obtener el idioma actual

  // Determinar la imagen del logo según el idioma actual
  const logoNavbar = i18n.language === 'es' ? logoNavbarEs : logoNavbarEn;

  return (
    <nav className="flex justify-between items-center bg-gray-900 bg-opacity-60 p-4 fixed top-0 left-0 w-full z-50"> {/* Barra fija, más transparente */}
      
      {/* Logo de la marca dinámico según el idioma */}
      <div className="ml-4">
        <img src={logoNavbar} alt="Logo" className="w-36 h-auto" /> {/* Ajustamos el tamaño de la imagen */}
      </div>

      <div className="container mx-auto flex justify-between items-center">
        {/* Menú de navegación */}
        <ul className="flex space-x-6 text-white justify-center flex-1">
          <li><Link to="/" className="text-black hover:text-green-400">{t('home')}</Link></li>
          <li><Link to="/about" className="text-black hover:text-green-400">{t('about')}</Link></li>
          <li><Link to="/projects" className="text-black hover:text-green-400">{t('projects')}</Link></li>
          <li><Link to="/contact" className="text-black hover:text-green-400">{t('contact')}</Link></li>
          <li><Link to="/blog" className="text-black hover:text-green-400">{t('blog')}</Link></li>
          <li><Link to="/register" className="text-black hover:text-green-400">{t('register')}</Link></li>
        </ul>

        {/* Selector de idiomas */}
        <div className="ml-auto">
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
