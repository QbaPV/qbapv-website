// src/pages/Home.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/styles.css';
import backgroundImage from '../assets/images/your-background.jpg'; // Asegúrate de reemplazar esto con tu imagen

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="relative bg-cover bg-center min-h-screen flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}>
            {/* Overlay para mejorar la legibilidad del texto */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Contenido principal sobre la imagen */}
            <div className="relative z-10 text-center p-12">
                <h1 className="text-5xl font-extrabold text-gray-900  shadow-black mb-10 animate-fade-in tracking-tight shadow-lg" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.7)' }}>
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
                <p className="text-2xl font-semibold text-[#DAA520] shadow-black mb-10 animate-fade-in delay-100 leading-relaxed" style={{ textShadow: '3px 2px 3px rgba(0, 0, 0, 2)' }}>
                    {t('home_description_07')}
                </p>

                <button className="bg-blue-600 text-[#bcd4e6] px-8 py-4 rounded-full shadow-lg transition-transform transform hover:scale-110 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 duration-300">
				  {t('button_explore_project')}
				</button>
			</div>

            {/* Sección de estadísticas */}
            <div className="flex flex-col items-center mt-16 w-full max-w-4xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('projects_title')}</h2>
                    <p className="text-lg text-gray-600">{t('projects_subtitle')}</p>
                </div>

                {/* Ajuste de las estadísticas */}
                <div className="flex justify-between items-center w-full">
                    <div className="text-center p-4">
                        <h3 className="text-5xl font-bold text-blue-600">150+</h3>
                        <p className="text-gray-700">{t('completed_projects')}</p>
                    </div>
                    <div className="text-center p-4">
                        <h3 className="text-5xl font-bold text-blue-600">5K+</h3>
                        <p className="text-gray-700">{t('satisfied_clients')}</p>
                    </div>
                    <div className="text-center p-4">
                        <h3 className="text-5xl font-bold text-blue-600">10</h3>
                        <p className="text-gray-700">{t('years_experience')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

