// src/pages/About.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/styles.css';
import imgCorpAbout from '../assets/images/imgCorp-about.jpg';
import imgMisnAbout from '../assets/images/imgMisn-about.jpg';
import imgVisnAbout from '../assets/images/imgVisn-about.jpg';
import imgVlrsAbout from '../assets/images/imgVlrs-about.jpg';
import imgEqpoAbout from '../assets/images/imgEqpo-about.jpg';

const About = () => {
    const { t } = useTranslation();

    return (
        <div className="about-container px-6 py-12 bg-gradient-to-br from-gray-300 to-gray-700 min-h-screen flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 shadow-black mb-6 animate-fade-in tracking-tight shadow-lg text-center" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.7)' }}>{t('about')}</h1>

            {/* Sección Quiénes somos */}
            <section className="py-12">
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col min-h-[450px]">
                    <div>
                        <h2 className="mt-6 mb-4 text-3xl font-bold text-gray-900 animate-fade-in text-center">{t('about_overview_title')}</h2>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_overview_description')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_overview_description_01')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_overview_description_02')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_overview_description_03')}</p>
                        <p className="mb-6 text-xl font-semibold text-gray-900 animate-fade-in text-center">{t('about_overview_description_04')}</p>
                    </div>
                    <div>
                        <img 
                            src={imgCorpAbout} 
                            alt="Imagen representativa de la empresa"
                            className="w-full h-auto rounded-lg shadow-lg animate-fade-in"
                        />
                    </div>
                </div>
            </section>

            {/* Sección Misión */}
            <section className="py-12">
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col min-h-[450px]">
                    <div>
                        <h2 className="mt-6 mb-4 text-3xl font-bold text-gray-900 animate-fade-in text-center">{t('about_mission_title')}</h2>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_mission_description_05')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_mission_description_06')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_mission_description_07')}</p>
                        <p className="mb-6 text-lg text-gray-600 animate-fade-in text-justify">{t('about_mission_description_08')}</p>
                    </div>
                    <div>
                        <img 
                            src={imgMisnAbout} 
                            alt="Imagen de nuestra misión"
                            className="w-full h-auto rounded-lg shadow-lg animate-fade-in"
                        />
                    </div>
                </div>
            </section>

            {/* Sección Visión */}
            <section className="py-12">
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col min-h-[450px]">
                    <div>
                        <h2 className="mt-6 mb-4 text-3xl font-bold text-gray-900 animate-fade-in text-center">{t('about_vision_title')}</h2>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_vision_description_10')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_vision_description_11')}</p>
                        <p className="mb-6 text-lg text-gray-600 animate-fade-in text-justify">{t('about_vision_description_13')}</p>
                    </div>
                    <div>
                        <img 
                            src={imgVisnAbout} 
                            alt="Imagen de nuestra visión"
                            className="w-full h-auto rounded-lg shadow-lg animate-fade-in"
                        />
                    </div>
                </div>
            </section>

            {/* Sección Valores */}
            <section className="py-12">
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col min-h-[450px]">
                    <div>
                        <h2 className="mt-6 mb-4 text-3xl font-bold text-gray-900 animate-fade-in text-center">{t('about_values_title')}</h2>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_values_description_14')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_values_description_15')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_values_description_16')}</p>
                        <p className="mb-6 text-lg text-gray-600 animate-fade-in text-justify">{t('about_values_description_17')}</p>
                    </div>
                    <div>
                        <img 
                            src={imgVlrsAbout} 
                            alt="Imagen de nuestros valores"
                            className="w-full h-auto rounded-lg shadow-lg animate-fade-in"
                        />
                    </div>
                </div>
            </section>

            {/* Sección Equipo */}
            <section className="py-12">
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col min-h-[450px]">
                    <div>
                        <h2 className="mt-6 mb-4 text-3xl font-bold text-gray-900 animate-fade-in text-center">{t('about_team_title')}</h2>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_team_description_18')}</p>
                        <p className="mb-2 text-lg text-gray-600 animate-fade-in text-justify">{t('about_team_description_19')}</p>
                        <p className="mb-6 text-lg text-gray-600 animate-fade-in text-justify">{t('about_team_description_21')}</p>
                    </div>
                    <div>
                        <img 
                            src={imgEqpoAbout} 
                            alt="Imagen de nuestro equipo"
                            className="w-full h-auto rounded-lg shadow-lg animate-fade-in"
                        />
                    </div>
                </div>
            </section>

			<footer className="bg-gray-900 text-white py-8 mt-20">
				<div className="max-w-7xl mx-auto px-4">
					<div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-8">
						<div className="mb-4 md:mb-0">
							<h5 className="mx-72 text-lg font-bold">{t('footer_about')}</h5>
							<p className="text-gray-400 mt-2">{t('footer_description')}</p>
						</div>
						<div className="mb-4 md:mb-0">
							<h5 className="text-lg font-bold">{t('footer_links')}</h5>
							<ul className="mt-2 space-y-2">
								<li><a href="/" className="text-gray-400 hover:text-white">{t('footer_home_link')}</a></li>
								<li><a href="/projects" className="text-gray-400 hover:text-white">{t('footer_projects_link')}</a></li>
								<li><a href="/contact" className="text-gray-400 hover:text-white">{t('footer_contact_link')}</a></li>
								</ul>
						</div>
						<div>
							<h5 className="text-lg font-bold">{t('footer_follow_us')}</h5>
							<div className="mt-2 flex space-x-4">
								<a href="#" className="text-gray-400 hover:text-white mx-2">Facebook</a>
								<a href="#" className="text-gray-400 hover:text-white mx-2">Twitter</a>
								<a href="#" className="text-gray-400 hover:text-white mx-2">LinkedIn</a>
							</div>
						</div>
					</div>
                    <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-8 mt-6">
                        <div className="flex justify-center md:justify-end space-x-4">
                            <a href="#" className="text-sm text-gray-400 hover:text-white">{t('footer_privacy')}</a>
							<span className="text-gray-400">|</span>
                            <a href="#" className="text-sm text-gray-400 hover:text-white">{t('footer_terms')}</a>
							<span className="text-gray-400">|</span>
							<a href="#" className="text-sm text-gray-400 hover:text-white">{t('footer_cookies')}</a>
                        </div>
                    </div>
					<p className="text-center text-gray-500 text-sm mt-2">
						&copy; {new Date().getFullYear()}
						{t('footer_copyright')}
					</p>
				</div>
			</footer>
        </div>
    );
};

export default About;
