// src/components/Navbar.js - VERSIÓN CON GOOGLE ANALYTICS
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes } from 'react-icons/fa';
import LanguageSelector from './LanguageSelector';
// Importar todos los logos 3D por idioma
import logoNavbarEn from '../assets/logos/logo-navbar-en-3d.svg';
import logoNavbarEs from '../assets/logos/logo-navbar-es-3d.svg';
import logoNavbarPt from '../assets/logos/logo-navbar-pt-3d.svg';
import logoNavbarFr from '../assets/logos/logo-navbar-fr-3d.svg';
import logoNavbarDe from '../assets/logos/logo-navbar-de-3d.svg';
import logoNavbarIt from '../assets/logos/logo-navbar-it-3d.svg';
import { GAEvents } from '../config/analytics';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Mapeo de logos por idioma
  const logoMap = {
    es: logoNavbarEs,
    en: logoNavbarEn,
    pt: logoNavbarPt,
    fr: logoNavbarFr,
    de: logoNavbarDe,
    it: logoNavbarIt
  };

  // Determinar el logo según el idioma actual
  const logoNavbar = logoMap[i18n.language] || logoNavbarEn;

  // Efecto de scroll para cambiar la apariencia del navbar
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: '/', key: 'home' },
    { path: '/about', key: 'about' },
    { path: '/projects', key: 'projects' },
    { path: '/contact', key: 'contact' },
    { path: '/blog', key: 'blog' },
    { path: '/register', key: 'register' },
  ];

  const isActiveLink = (path) => location.pathname === path;

  // Función para manejar clicks en el menú con tracking
  const handleMenuClick = (menuItem) => {
    GAEvents.clickMenu(menuItem);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-950 bg-opacity-95 backdrop-blur-sm shadow-lg' 
          : 'bg-gray-950 bg-opacity-70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center"
              onClick={() => handleMenuClick('logo')}
            >
              <img 
                src={logoNavbar} 
                alt="QBAPV Logo" 
                className="h-12 w-auto md:h-14 transition-transform duration-200 hover:scale-105" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.path}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActiveLink(item.path)
                        ? 'text-yellow-400 border-b-2 border-yellow-400'
                        : 'text-yellow-600 hover:text-yellow-300'
                    }`}
                    onClick={() => handleMenuClick(item.key)}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Language Selector */}
          <div className="hidden md:block">
            <LanguageSelector />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSelector />
            <button
              onClick={toggleMenu}
              className="text-yellow-600 hover:text-yellow-300 focus:outline-none focus:text-yellow-300 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 bg-opacity-95 rounded-lg mt-2">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActiveLink(item.path)
                    ? 'text-yellow-400 bg-gray-800'
                    : 'text-yellow-600 hover:text-yellow-300 hover:bg-gray-800'
                }`}
                onClick={() => handleMenuClick(item.key)}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
