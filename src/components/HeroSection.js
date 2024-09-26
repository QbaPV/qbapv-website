// src/components/HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/styles.css';
import backgroundImage from '../assets/images/your-background.jpg';

const HeroSection = () => {
    const { t } = useTranslation();

    return (
        <div className="relative bg-cover bg-center min-h-screen flex flex-col items-center justify-center"
            style={{ 
                backgroundImage: `url(${backgroundImage})`, 
                backgroundAttachment: 'fixed' 
            }}>

            {/* Overlay para mejorar la legibilidad del texto */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Contenido principal sobre la imagen */}
            <div className="relative z-10 text-center p-12">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 shadow-black mb-10 animate-fade-in tracking-tight shadow-lg" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.7)' }}>
                    {t('welcome')}
                </h1>

                <h2 className="text-3xl text-[#f5f5f5] mb-6 animate-fade-in delay-100 tracking-wide">
                    {t('home_description_01')}
                </h2>
                
                <p className="text-xl text-[#f5f5f5] mb-4 animate-fade-in delay-100 leading-relaxed">
                    {t('home_description_02')} <span className="font-semibold text-[#bcd4e6]">{t('home_description_03')}</span>
                </p>

                <p className="text-xl text-[#f5f5f5] mb-4 animate-fade-in delay-100 leading-relaxed">
                    {t('home_description_04')}
                </p>

                <p className="text-xl text-[#f5f5f5] mb-4 animate-fade-in delay-100 leading-relaxed">
                    {t('home_description_05')} <span className="font-semibold text-[#bcd4e6]">{t('home_description_06')}</span>
                </p>

                {/* Estilo dorado y sombra negra */}
                <p className="text-xl font-semibold text-[#DAA520] shadow-black mb-8 md:mb-20 animate-fade-in delay-100 leading-relaxed" style={{ textShadow: '3px 2px 3px rgba(0, 0, 0, 2)' }}>
                    {t('home_description_07')}
                </p>

                <Link to="/projects" className="bg-blue-600 text-[#f5f5f5] px-8 py-4 rounded-full shadow-lg transition-transform transform hover:scale-110 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 duration-300">
                    {t('button_explore_project')}
                </Link>

            </div>
        </div>
    );
};

export default HeroSection;