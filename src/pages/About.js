// src/pages/About.js - VERSIÓN CORREGIDA CON ESTÉTICA CONSISTENTE + SEO
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FaRocket, 
  FaBullseye, 
  FaHandshake, 
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaLightbulb,
  FaGlobeAmericas,
  FaTrophy,
  FaClock,
  FaAward
} from 'react-icons/fa';
import SEOHead from '../components/SEOHead';

// Componentes
import Timeline from '../components/Timeline';
import SocialBar from '../components/SocialBar';

// Imágenes
import imgCorpAbout from '../assets/images/imgCorp-about.jpg';
import imgMisnAbout from '../assets/images/imgMisn-about.jpg';
import imgVisnAbout from '../assets/images/imgVisn-about.jpg';
import imgVlrsAbout from '../assets/images/imgVlrs-about.jpg';
import imgEqpoAbout from '../assets/images/imgEqpo-about.jpg';

const About = () => {
  const { t } = useTranslation();
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});

  // Intersection Observer para animaciones
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observar todas las secciones
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Función para asignar refs
  const setRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  // Datos de logros para mostrar en la sección hero
  const achievements = [
    { icon: <FaTrophy />, value: '50+', label: t('stats_projects') },
    { icon: <FaUsers />, value: '1000+', label: t('stats_users') },
    { icon: <FaGlobeAmericas />, value: '25+', label: t('stats_countries') },
    { icon: <FaAward />, value: '98%', label: t('stats_satisfaction') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <SEOHead 
        page="about"
        path="/about"
      />
      {/* Hero Section Mejorada */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-90"></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        {/* Patrón decorativo */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            {t('about')}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-12 animate-fade-in-up animation-delay-200">
            {t('about_overview_description')}
          </p>

          {/* Logros */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                <div className="text-3xl text-white mb-2">{achievement.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">{achievement.value}</div>
                <div className="text-sm text-gray-200">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Quiénes Somos - CORREGIDA */}
      <section 
        id="overview"
        ref={setRef('overview')}
        className={`py-20 transition-all duration-1000 ${
          visibleSections.overview ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-6">
                <FaShieldAlt className="text-4xl text-blue-600 mr-4" />
                <h2 className="text-4xl font-bold text-gray-900">{t('about_overview_title')}</h2>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <p className="text-lg leading-relaxed">{t('about_overview_description_01')}</p>
                <p className="text-lg leading-relaxed">{t('about_overview_description_02')}</p>
                <p className="text-lg leading-relaxed">{t('about_overview_description_03')}</p>
              </div>

              {/* Frase destacada como en el diseño original */}
              <p className="mt-6 mb-8 text-2xl font-bold text-gray-900 text-center">
                {t('about_overview_description_04')}!
              </p>

              <div className="text-center">
                <Link 
                  to="/projects" 
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                >
                  <FaRocket className="mr-3" /> 
                  {t('button_explore_project')}
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg transform rotate-3"></div>
                <img 
                  src={imgCorpAbout} 
                  alt={t('about_overview_title')}
                  className="relative rounded-lg shadow-2xl transform hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Misión - SIN PUNTOS */}
      <section 
        id="mission"
        ref={setRef('mission')}
        className={`py-20 bg-gray-50 transition-all duration-1000 ${
          visibleSections.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg transform -rotate-3"></div>
                <img 
                  src={imgMisnAbout} 
                  alt={t('about_mission_title')}
                  className="relative rounded-lg shadow-2xl transform hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <FaBullseye className="text-4xl text-green-600 mr-4" />
                <h2 className="text-4xl font-bold text-gray-900">{t('about_mission_title')}</h2>
              </div>
              
              <div className="space-y-4 text-gray-600">
                {[5, 6, 7, 8, 9].map(num => (
                  <p key={num} className="text-lg leading-relaxed">
                    {t(`about_mission_description_0${num}`)}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Visión - LAYOUT CORREGIDO */}
      <section 
        id="vision"
        ref={setRef('vision')}
        className={`py-20 transition-all duration-1000 ${
          visibleSections.vision ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-6">
                <FaLightbulb className="text-4xl text-yellow-600 mr-4" />
                <h2 className="text-4xl font-bold text-gray-900">{t('about_vision_title')}</h2>
              </div>
              
              <div className="space-y-4 text-gray-600">
                {[10, 11, 12, 13].map((num) => (
                  <p key={num} className="text-lg leading-relaxed">
                    {t(`about_vision_description_${num}`)}
                  </p>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg transform rotate-3"></div>
                <img 
                  src={imgVisnAbout} 
                  alt={t('about_vision_title')}
                  className="relative rounded-lg shadow-2xl transform hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Valores - ESTILO CONSISTENTE */}
      <section 
        id="values"
        ref={setRef('values')}
        className={`py-20 bg-gray-50 transition-all duration-1000 ${
          visibleSections.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg transform -rotate-3"></div>
                <img 
                  src={imgVlrsAbout} 
                  alt={t('about_values_title')}
                  className="relative rounded-lg shadow-2xl transform hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <FaHandshake className="text-4xl text-purple-600 mr-4" />
                <h2 className="text-4xl font-bold text-gray-900">{t('about_values_title')}</h2>
              </div>
              
              <div className="space-y-4 text-gray-600">
                {[14, 15, 16, 17].map((num) => (
                  <p key={num} className="text-lg leading-relaxed">
                    {t(`about_values_description_${num}`)}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Equipo - LAYOUT CORREGIDO */}
      <section 
        id="team"
        ref={setRef('team')}
        className={`py-20 transition-all duration-1000 ${
          visibleSections.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-6">
                <FaUsers className="text-4xl text-indigo-600 mr-4" />
                <h2 className="text-4xl font-bold text-gray-900">{t('about_team_title')}</h2>
              </div>
              
              <div className="space-y-4 text-gray-600">
                {[18, 19, 20, 21].map(num => (
                  <p key={num} className="text-lg leading-relaxed">
                    {t(`about_team_description_${num}`)}
                  </p>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-lg transform rotate-3"></div>
                <img 
                  src={imgEqpoAbout} 
                  alt={t('about_team_title')}
                  className="relative rounded-lg shadow-2xl transform hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section - CON FONDO MEJORADO */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Timeline />
        </div>
      </section>

      {/* Social Bar */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SocialBar />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('cta_title')}
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            {t('cta_description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/projects"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              {t('cta_button_projects')}
            </Link>
            <Link 
              to="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
            >
              {t('cta_button_contact')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;