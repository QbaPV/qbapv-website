// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const { t } = useTranslation(); // Añadir esto para obtener la función `t`

  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Menú de navegación */}
        <ul className="flex space-x-6 text-white justify-center flex-1">
          <li><Link to="/">{t('home')}</Link></li>
          <li><Link to="/about">{t('about')}</Link></li>
          <li><Link to="/projects">{t('projects')}</Link></li>
          <li><Link to="/contact">{t('contact')}</Link></li>
          <li><Link to="/blog">{t('blog')}</Link></li>
          <li><Link to="/register">{t('register')}</Link></li>
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


