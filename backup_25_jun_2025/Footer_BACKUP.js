// BACKUP - src/components/Footer.js - 25 de junio 2025
// Este es el Footer actual ANTES de las optimizaciones

import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-gray-900 text-white py-8 mt-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-8">
                    <div className="mb-4 md:mb-0">
                        <h5 className="text-lg font-bold">{t('footer_about')}</h5>
                        <p className="text-gray-400 mt-2">{t('footer_description')}</p>
                    </div>
                    <div>
                        <h5 className="text-lg font-bold">{t('footer_follow_us')}</h5>
                        <div className="mt-2 flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white mx-2">Facebook</a>
                            <a href="#" className="text-gray-400 hover:text-white mx-2">Twitter</a>
                            <a href="#" className="text-gray-400 hover:text-white mx-2">LinkedIn</a>
                        </div>
                    </div>
                    <div className="mb-4 md:mb-0">
                        <h5 className="text-lg font-bold text-left">{t('footer_links')}</h5>
                        <ul className="mt-2 space-y-2 text-left">
                            <li><a href="/" className="text-gray-400 hover:text-white">{t('footer_home_link')}</a></li>
                            <li><a href="/about" className="text-gray-400 hover:text-white">{t('footer_about_link')}</a></li>
                            <li><a href="/projects" className="text-gray-400 hover:text-white">{t('footer_projects_link')}</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-white">{t('footer_contact_link')}</a></li>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-center space-x-4 mt-6">
                    <a href="#" className="text-sm text-gray-400 hover:text-white">{t('footer_privacy')}</a>
                    <span className="text-gray-400">|</span>
                    <a href="#" className="text-sm text-gray-400 hover:text-white">{t('footer_terms')}</a>
                    <span className="text-gray-400">|</span>
                    <a href="#" className="text-sm text-gray-400 hover:text-white">{t('footer_cookies')}</a>
                </div>
                <p className="text-center text-gray-500 text-sm mt-2">
                    {t('footer_copyright')}
                </p>
            </div>
        </footer>
    );
};

export default Footer;