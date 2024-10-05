// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons'; // Icono de ejemplo
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import '../styles/styles.css';
import Footer from '../components/Footer';
import backgroundImage from '../assets/images/your-background.jpg';
import forexHome from '../assets/images/forex-home.jpg';
import criptoHome from '../assets/images/cripto-home.jpg';
import freebitcoinHome from '../assets/images/freebitcoin-home.jpg';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="px-6 py-12 bg-gradient-to-br from-[#626361] to-[#54606c] min-h-screen flex flex-col justify-center relative z-10 text-center p-12 mt-50">

    {/*    <div className="relative bg-cover bg-center min-h-screen flex flex-col items-center justify-center"
            style={{ 
                backgroundImage: `url(${backgroundImage})`, 
                backgroundAttachment: 'fixed' 
            }}> */}

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
                <Link 
                    to="/projects" 
                    className="bg-blue-300 border-2 border-blue-600 font-semibold text-black px-8 py-4 mt-2 mb-8 inline-flex items-center justify-center rounded-md shadow-lg shadow-black transition-transform transform hover:scale-105 hover:bg-blue-200 hover:border-blue-600 duration-300 w-auto"
                >
                    <FontAwesomeIcon icon={faRocket} className="mr-2" /> 
                    {t('button_explore_project')}
                </Link>                        
            </div>

            {/* Sección de estadísticas */}
            <div className="relative z-10 text-center p-12 mt-50">
                <h1 className="text-4xl font-bold text-gray-900 shadow-black mb-10 animate-fade-in tracking-tight shadow-lg" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.7)' }}>
                    {t('featured_projects')}
                </h1>
                <h2 className="text-3xl text-[#f5f5f5] mb-2 animate-fade-in delay-100 tracking-wide">
                    {t('featured_projects_1')}
                </h2> 
                <h2 className="text-3xl text-[#bcd4e6] mb-20 animate-fade-in delay-100 tracking-wide">
                    {t('featured_projects_2')}
                </h2>             

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 md:mb-20 animate-fade-in">
                    {/* Proyecto 1 */}
                    <div className="bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg shadow-lg shadow-black overflow-hidden transform transition duration-300 hover:scale-105">
                        <img src={forexHome} alt={t('project_1')} className="w-full h-32 md:h-48 object-cover shadow-2xl hover:shadow-2xl transition-shadow duration-300" />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                {t('project_1_title')}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {t('project_1_description')}
                            </p>
                            <Link 
                                to="/projects/forex" 
                                className="bg-blue-300 border-2 border-blue-600 font-semibold text-black px-4 py-2 mt-2 mb-8 inline-flex items-center justify-center rounded-full shadow-lg shadow-black transition-transform transform hover:scale-105 hover:bg-blue-200 hover:border-blue-600 duration-300 w-auto"
                            >
                                <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
                                {t('button_learn_more')}
                            </Link>
                        </div>
                    </div>

                    {/* Proyecto 2 */}
                    <div className="bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg shadow-lg shadow-black overflow-hidden transform transition duration-300 hover:scale-105">
                        <img src={criptoHome} alt={t('project_2')} className="w-full h-32 md:h-48 object-cover shadow-2xl hover:shadow-2xl transition-shadow duration-300" />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                {t('project_2_title')}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {t('project_2_description')}
                            </p>
                            <Link 
                                to="/projects/cripto" 
                                className="bg-blue-300 border-2 border-blue-600 font-semibold text-black px-4 py-2 mt-2 mb-8 inline-flex items-center justify-center rounded-full shadow-lg shadow-black transition-transform transform hover:scale-105 hover:bg-blue-200 hover:border-blue-600 duration-300 w-auto"
                            >
                                <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
                                {t('button_learn_more')}
                            </Link>
                        </div>
                    </div>

                    {/* Proyecto 3 */}
                    <div className="bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg shadow-lg shadow-black overflow-hidden transform transition duration-300 hover:scale-105">
                        <img src={freebitcoinHome} alt={t('project_3')} className="w-full h-32 md:h-48 object-cover shadow-2xl hover:shadow-2xl transition-shadow duration-300" />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                {t('project_3_title')}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {t('project_3_description')}
                            </p>
                            <Link 
                                to="/projects/freebitcoin" 
                                className="bg-blue-300 border-2 border-blue-600 font-semibold text-black px-4 py-2 mt-2 mb-8 inline-flex items-center justify-center rounded-full shadow-lg shadow-black transition-transform transform hover:scale-105 hover:bg-blue-200 hover:border-blue-600 duration-300 w-auto"
                            >
                                <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
                                {t('button_learn_more')}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Sección de testimonios */}
                <section className="bg-gradient-to-br from-gray-200 to-[#54606c] py-10 mt-20 animate-fade-in">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-900 shadow-black mb-10 animate-fade-in tracking-tight shadow-lg" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.7)' }}>{t('testimonials_title')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white shadow-lg shadow-black p-6 rounded-lg">
                                <img
                                    className="w-16 h-16 rounded-full mx-auto mb-4"
                                    src="https://via.placeholder.com/150"
                                    alt="Testimonial 1"
                                />
                                <h3 className="text-xl font-bold text-center">{t('person_1_name')}</h3>
                                <p className="mt-4 text-gray-600 text-center">
                                    {t('person_1_testimonial')}
                                </p>
                            </div>
                            <div className="bg-white shadow-lg shadow-black p-6 rounded-lg">
                                <img
                                    className="w-16 h-16 rounded-full mx-auto mb-4"
                                    src="https://via.placeholder.com/150"
                                    alt="Testimonial 2"
                                />
                                <h3 className="text-xl font-bold text-center">{t('person_2_name')}</h3>
                                <p className="mt-4 text-gray-600 text-center">
                                    {t('person_2_testimonial')}
                                </p>
                            </div>
                            <div className="bg-white shadow-lg shadow-black p-6 rounded-lg">
                                <img
                                    className="w-16 h-16 rounded-full mx-auto mb-4"
                                    src="https://via.placeholder.com/150"
                                    alt="Testimonial 3"
                                />
                                <h3 className="text-xl font-bold text-center">{t('person_3_name')}</h3>
                                <p className="mt-4 text-gray-600 text-center">
                                    {t('person_3_testimonial')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                

				{/* Footer */}
				<Footer />
				
			</div>
        </div>
       
    );
};

export default Home;
