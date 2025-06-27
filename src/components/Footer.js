// src/components/Footer.js - VERSIÓN OPTIMIZADA
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faLinkedinIn, 
  faInstagram,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Aquí iría la lógica para suscribir al newsletter
      console.log('Newsletter subscription:', email);
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white text-center">
              {t('footer_about')}
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed text-center">
              {t('footer_description')}
            </p>
            <div className="flex justify-center space-x-4 pt-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} className="text-sm" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors duration-300"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} className="text-sm" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedinIn} className="text-sm" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-300"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-sm" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                aria-label="YouTube"
              >
                <FontAwesomeIcon icon={faYoutube} className="text-sm" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 md:pl-8">
            <h4 className="text-lg font-semibold text-white">
              {t('footer_quick_links')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> {t('about')}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> {t('projects')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> {t('blog')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              {t('footer_contact_info')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Carrer del Telègraf, 18<br />
                  Horta-Guinardó, 08041<br />
                  Barcelona, {t('spain')}
                </span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="text-blue-400 mr-3" />
                <span className="text-gray-300 text-sm">+34 (632) 40-53-79</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-400 mr-3" />
                <span className="text-gray-300 text-sm">info@qbapv.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white text-center">
              {t('footer_newsletter')}
            </h4>
            <p className="text-gray-300 text-sm text-center">
              {t('footer_newsletter_description')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer_email_placeholder')}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                required
              />
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors duration-300 flex items-center space-x-2"
                  aria-label="Subscribe"
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="text-sm" />
                  <span>{t('submit')}</span>
                </button>
              </div>
              {subscribed && (
                <p className="text-green-400 text-sm animate-fade-in">
                  {t('footer_newsletter_success')}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2025 QbaPV. {t('footer_all_rights_reserved')}
            </p>
            <div className="flex flex-wrap justify-center space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                {t('footer_privacy')}
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                {t('footer_terms')}
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                {t('footer_cookies')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;