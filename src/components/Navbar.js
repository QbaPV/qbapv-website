// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const { t } = useTranslation(); // Añadir esto para obtener la función `t`

  return (
    <nav>
      <ul>
        <li><Link to="/">{t('home')}</Link></li>
        <li><Link to="/about">{t('about')}</Link></li>
        <li><Link to="/projects">{t('projects')}</Link></li>
        <li><Link to="/contact">{t('contact')}</Link></li>
		<li><Link to="/blog">{t('blog')}</Link></li> {/* Nuevo enlace al blog */}
		<li><Link to="/register">{t('register')}</Link></li>
      </ul>
      <LanguageSelector />
    </nav>
  );
};

export default Navbar;
