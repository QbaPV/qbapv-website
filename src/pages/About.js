// src/pages/About.js
import React from 'react';
import { Link } from 'react-router-dom';
import { faRocket } from '@fortawesome/free-solid-svg-icons'; // Icono de ejemplo
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/styles.css';
import Footer from '../components/Footer';
import Timeline from '../components/Timeline';
import SocialBar from '../components/SocialBar';
import imgCorpAbout from '../assets/images/imgCorp-about.jpg';
import imgMisnAbout from '../assets/images/imgMisn-about.jpg';
import imgVisnAbout from '../assets/images/imgVisn-about.jpg';
import imgVlrsAbout from '../assets/images/imgVlrs-about.jpg';
import imgEqpoAbout from '../assets/images/imgEqpo-about.jpg';

const About = () => {
    const { t } = useTranslation();

    return (
        <div className="about-container px-6 py-12 bg-gradient-to-br from-[#626361] to-[#54606c] min-h-screen flex flex-col justify-center relative z-10 text-center p-12 mt-50">
            <h1 className="text-4xl font-bold text-gray-900 shadow-black mb-6 animate-fade-in tracking-tight shadow-lg text-center" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.7)' }}>{t('about')}</h1>

            {/* Sección Quiénes somos */}
            <section className="py-12">
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center rounded-lg shadow-md shadow-black overflow-hidden transform transition duration-300 hover:scale-105 min-h-[400px]">
                    <div>
                        <h2 className="mt-6 mb-4 text-3xl font-bold text-gray-900 animate-fade-in text-center">{t('about_overview_title')}</h2>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_overview_description')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_overview_description_01')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_overview_description_02')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_overview_description_03')}</p>
                        <p className="mb-6 text-xl font-semibold text-gray-900 animate-fade-in text-center">{t('about_overview_description_04')}</p>
                        <Link 
                            to="/projects" 
                            className="bg-green-300 border-2 border-green-600 font-semibold text-black px-8 py-4 mt-2 mb-8 inline-flex items-center justify-center rounded-md shadow-md transition-transform transform hover:scale-105 hover:bg-green-200 hover:border-green-600 duration-300 w-auto"
                        >
                            <FontAwesomeIcon icon={faRocket} className="mr-2" /> 
                            {t('button_explore_project')}
                        </Link>                        
                    </div>
                    <div>
                        <img 
                            src={imgCorpAbout} 
                            alt="Imagen representativa de la empresa"
                            className="w-full h-auto rounded-lg shadow-lg shadow-md shadow-black animate-fade-in"
                        />
                    </div>
                </div>
            </section>

            {/* Sección Misión */}
            <section className="py-12">
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center rounded-lg shadow-md shadow-black overflow-hidden transform transition duration-300 hover:scale-105 min-h-[400px]">
                    <div>
                        <h2 className="mt-6 mb-4 text-3xl font-bold text-gray-900 animate-fade-in text-center">{t('about_mission_title')}</h2>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_mission_description_05')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_mission_description_06')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_mission_description_07')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_mission_description_08')}</p>
                        <p className="mb-6 text-lg text-gray-600 animate-fade-in text-justify">{t('about_mission_description_09')}</p>
                    </div>
                    <div>
                        <img 
                            src={imgMisnAbout} 
                            alt="Imagen de nuestra misión"
                            className="w-full h-auto rounded-lg shadow-lg shadow-md shadow-black animate-fade-in"
                        />
                    </div>
                </div>
            </section>

            {/* Sección Visión */}
            <section className="py-12">
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center rounded-lg shadow-md shadow-black overflow-hidden transform transition duration-300 hover:scale-105 min-h-[400px]">
                    <div>
                        <h2 className="mt-6 mb-4 text-3xl font-bold text-gray-900 animate-fade-in text-center">{t('about_vision_title')}</h2>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_vision_description_10')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_vision_description_11')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_vision_description_12')}</p>
                        <p className="mb-6 text-lg text-gray-600 animate-fade-in text-justify">{t('about_vision_description_13')}</p>
                    </div>
                    <div>
                        <img 
                            src={imgVisnAbout} 
                            alt="Imagen de nuestra visión"
                            className="w-full h-auto rounded-lg shadow-lg shadow-md shadow-black animate-fade-in"
                        />
                    </div>
                </div>
            </section>

            {/* Sección Valores */}
            <section className="py-12">
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center rounded-lg shadow-md shadow-black overflow-hidden transform transition duration-300 hover:scale-105 min-h-[400px]">
                    <div>
                        <h2 className="mt-6 mb-4 text-3xl font-bold text-gray-900 animate-fade-in text-center fas fa-handshake mr-2">{t('about_values_title')}</h2>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_values_description_14')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_values_description_15')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_values_description_16')}</p>
                        <p className="mb-6 text-lg text-gray-600 animate-fade-in text-justify">{t('about_values_description_17')}</p>
                    </div>
                    <div>
                        <img 
                            src={imgVlrsAbout} 
                            alt="Imagen de nuestros valores"
                            className="w-full h-auto rounded-lg shadow-lg shadow-md shadow-black animate-fade-in"
                        />
                    </div>
                </div>
            </section>

            {/* Sección Equipo */}
            <section className="py-12">
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center rounded-lg shadow-md shadow-black overflow-hidden transform transition duration-300 hover:scale-105 min-h-[400px]">
                    <div>
                        <h2 className="mt-6 mb-4 text-3xl font-bold text-gray-900 animate-fade-in text-center">{t('about_team_title')}</h2>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_team_description_18')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_team_description_19')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_team_description_20')}</p>
                        <p className="mb-6 text-lg text-gray-600 animate-fade-in text-justify">{t('about_team_description_21')}</p>
                    </div>
                    <div>
                        <img 
                            src={imgEqpoAbout} 
                            alt="Imagen de nuestro equipo"
                            className="w-full h-auto rounded-lg shadow-lg shadow-md shadow-black animate-fade-in"
                        />
                    </div>
                </div>
            </section>

            {/* Redes Sociales*/}
            <SocialBar />

            {/* Sección del Timeline */}
            <Timeline /> 

            {/* Footer */}
            <Footer />

        </div>
    );
};

export default About;
