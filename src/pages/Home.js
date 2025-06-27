// src/pages/Home.js - VERSIÓN OPTIMIZADA
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRocket, 
  faBookOpen, 
  faChartLine,
  faUsers,
  faAward,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';

// Importar imágenes
import forexHome from '../assets/images/forex-home.jpg';
import criptoHome from '../assets/images/cripto-home.jpg';
import freebitcoinHome from '../assets/images/freebitcoin-home.jpg';

const Home = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState({});
  const statsRef = useRef(null);
  const [counters, setCounters] = useState({
    projects: 0,
    users: 0,
    countries: 0,
    satisfaction: 0
  });

  // Intersection Observer para animaciones
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observar elementos
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Animación de contadores
  useEffect(() => {
    const observerStats = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observerStats.observe(statsRef.current);
    }

    return () => observerStats.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;

    const targets = {
      projects: 50,
      users: 1000,
      countries: 15,
      satisfaction: 98
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        projects: Math.floor(targets.projects * progress),
        users: Math.floor(targets.users * progress),
        countries: Math.floor(targets.countries * progress),
        satisfaction: Math.floor(targets.satisfaction * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h1 
            id="hero-title"
            className={`text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 animate-on-scroll transition-all duration-1000 ${
              isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {t('welcome')}
          </h1>

          <h2 
            id="hero-subtitle"
            className={`text-2xl md:text-3xl text-gray-300 mb-8 animate-on-scroll transition-all duration-1000 delay-200 ${
              isVisible['hero-subtitle'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {t('home_description_01')}
          </h2>

          <div 
            id="hero-description"
            className={`max-w-3xl mx-auto space-y-4 mb-10 animate-on-scroll transition-all duration-1000 delay-300 ${
              isVisible['hero-description'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-lg md:text-xl text-gray-200">
              {t('home_description_02')} <span className="font-semibold text-blue-400">{t('home_description_03')}</span>
            </p>
            <p className="text-lg md:text-xl text-gray-200">
              {t('home_description_04')}
            </p>
            <p className="text-lg md:text-xl text-gray-200">
              {t('home_description_05')} <span className="font-semibold text-blue-400">{t('home_description_06')}</span>
            </p>
          </div>

          <p 
            id="hero-cta-text"
            className={`text-2xl font-bold text-yellow-400 mb-10 animate-on-scroll transition-all duration-1000 delay-400 ${
              isVisible['hero-cta-text'] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            {t('home_description_07')}
          </p>

          <Link 
            to="/projects"
            id="hero-cta-button"
            className={`inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-on-scroll ${
              isVisible['hero-cta-button'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <FontAwesomeIcon icon={faRocket} className="mr-3 text-xl" />
            {t('button_explore_project')}
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <FontAwesomeIcon icon={faChartLine} className="text-4xl text-blue-600 mb-4" />
              <div className="text-4xl font-bold text-gray-900">{counters.projects}+</div>
              <div className="text-gray-600 mt-2">{t('stats_projects')}</div>
            </div>
            <div className="text-center">
              <FontAwesomeIcon icon={faUsers} className="text-4xl text-green-600 mb-4" />
              <div className="text-4xl font-bold text-gray-900">{counters.users}+</div>
              <div className="text-gray-600 mt-2">{t('stats_users')}</div>
            </div>
            <div className="text-center">
              <FontAwesomeIcon icon={faGlobe} className="text-4xl text-purple-600 mb-4" />
              <div className="text-4xl font-bold text-gray-900">{counters.countries}+</div>
              <div className="text-gray-600 mt-2">{t('stats_countries')}</div>
            </div>
            <div className="text-center">
              <FontAwesomeIcon icon={faAward} className="text-4xl text-yellow-600 mb-4" />
              <div className="text-4xl font-bold text-gray-900">{counters.satisfaction}%</div>
              <div className="text-gray-600 mt-2">{t('stats_satisfaction')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="projects-header"
            className={`text-center mb-16 animate-on-scroll transition-all duration-1000 ${
              isVisible['projects-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('featured_projects')}
            </h2>
            <p className="text-xl text-gray-600 mb-2">
              {t('featured_projects_1')}
            </p>
            <p className="text-xl text-blue-600 font-semibold">
              {t('featured_projects_2')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Project 1 - Forex */}
            <div 
              id="project-1"
              className={`group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-on-scroll ${
                isVisible['project-1'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={forexHome} 
                  alt={t('project_1')} 
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {t('project_1_title')}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {t('project_1_description')}
                </p>
                <Link 
                  to="/projects/forex"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
                  {t('button_learn_more')}
                </Link>
              </div>
            </div>

            {/* Project 2 - Crypto */}
            <div 
              id="project-2"
              className={`group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-on-scroll delay-100 ${
                isVisible['project-2'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={criptoHome} 
                  alt={t('project_2')} 
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {t('project_2_title')}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {t('project_2_description')}
                </p>
                <Link 
                  to="/projects/cripto"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transform hover:scale-105 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
                  {t('button_learn_more')}
                </Link>
              </div>
            </div>

            {/* Project 3 - FreeBitcoin */}
            <div 
              id="project-3"
              className={`group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-on-scroll delay-200 ${
                isVisible['project-3'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={freebitcoinHome} 
                  alt={t('project_3')} 
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {t('project_3_title')}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {t('project_3_description')}
                </p>
                <Link 
                  to="/projects/freebitcoin"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
                  {t('button_learn_more')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            id="testimonials-title"
            className={`text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16 animate-on-scroll transition-all duration-1000 ${
              isVisible['testimonials-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {t('testimonials_title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div 
              id="testimonial-1"
              className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-on-scroll ${
                isVisible['testimonial-1'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center mb-6">
                <img
                  className="w-16 h-16 rounded-full object-cover"
                  src="https://i.pravatar.cc/150?img=1"
                  alt={t('person_1_name')}
                />
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">{t('person_1_name')}</h3>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{t('person_1_testimonial')}"</p>
            </div>

            {/* Testimonial 2 */}
            <div 
              id="testimonial-2"
              className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-on-scroll delay-100 ${
                isVisible['testimonial-2'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center mb-6">
                <img
                  className="w-16 h-16 rounded-full object-cover"
                  src="https://i.pravatar.cc/150?img=2"
                  alt={t('person_2_name')}
                />
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">{t('person_2_name')}</h3>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{t('person_2_testimonial')}"</p>
            </div>

            {/* Testimonial 3 */}
            <div 
              id="testimonial-3"
              className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-on-scroll delay-200 ${
                isVisible['testimonial-3'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center mb-6">
                <img
                  className="w-16 h-16 rounded-full object-cover"
                  src="https://i.pravatar.cc/150?img=3"
                  alt={t('person_3_name')}
                />
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">{t('person_3_name')}</h3>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{t('person_3_testimonial')}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div 
          id="cta-section"
          className={`max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-on-scroll transition-all duration-1000 ${
            isVisible['cta-section'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('cta_title')}
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            {t('cta_description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/projects"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faRocket} className="mr-2" />
              {t('cta_button_projects')}
            </Link>
            <Link 
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
            >
              {t('cta_button_contact')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;