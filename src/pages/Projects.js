// src/pages/Projects.js - VERSIÓN MODERNA
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FaChartLine, 
  FaBitcoin, 
  FaCoins,
  FaFilter,
  FaArrowRight,
  FaCheckCircle,
  FaUsers,
  FaClock,
  FaDollarSign,
  FaRocket,
  FaShieldAlt,
  FaTrophy
} from 'react-icons/fa';

// Importar imágenes
import forexImg from '../assets/images/forex-home.jpg';
import criptoImg from '../assets/images/cripto-home.jpg';
import freebitcoinImg from '../assets/images/freebitcoin-home.jpg';

const Projects = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});

  // Datos de proyectos
  const projectsData = [
    {
      id: 'forex',
      category: 'trading',
      title: t('project_1_title'),
      shortTitle: t('project_1'),
      description: t('project_1_description'),
      image: forexImg,
      icon: <FaChartLine />,
      color: 'blue',
      investmentLevel: 'high',
      riskLevel: 'medium',
      features: [
        'Señales profesionales en MQL5',
        'Análisis técnico avanzado',
        'Gestión de riesgo automatizada',
        'Soporte 24/5'
      ],
      stats: {
        users: '500+',
        avgReturn: '15-25%',
        minInvestment: '$5,000'
      }
    },
    {
      id: 'crypto',
      category: 'crypto',
      title: t('project_2_title'),
      shortTitle: t('project_2'),
      description: t('project_2_description'),
      image: criptoImg,
      icon: <FaBitcoin />,
      color: 'purple',
      investmentLevel: 'medium',
      riskLevel: 'high',
      features: [
        'Bots automatizados',
        'Integración con exchanges',
        'Estrategias personalizables',
        'Análisis en tiempo real'
      ],
      stats: {
        users: '1,000+',
        avgReturn: '20-40%',
        minInvestment: '$1,000'
      }
    },
    {
      id: 'freebitcoin',
      category: 'passive',
      title: t('project_3_title'),
      shortTitle: t('project_3'),
      description: t('project_3_description'),
      image: freebitcoinImg,
      icon: <FaCoins />,
      color: 'green',
      investmentLevel: 'low',
      riskLevel: 'low',
      features: [
        'Sin inversión mínima',
        'Ganancias pasivas',
        'Múltiples estrategias',
        'Retiros flexibles'
      ],
      stats: {
        users: '2,000+',
        avgReturn: '5-15%',
        minInvestment: '$0'
      }
    }
  ];

  // Categorías para filtros
  const categories = [
    { id: 'all', name: 'Todos', icon: <FaFilter /> },
    { id: 'trading', name: 'Trading', icon: <FaChartLine /> },
    { id: 'crypto', name: 'Cripto', icon: <FaBitcoin /> },
    { id: 'passive', name: 'Pasivos', icon: <FaCoins /> }
  ];

  // Filtrar proyectos
  const filteredProjects = selectedCategory === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === selectedCategory);

  // Intersection Observer
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

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  // Función para obtener color según el nivel
  const getColorByLevel = (level) => {
    switch(level) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Función para obtener color del proyecto
  const getProjectColor = (color) => {
    switch(color) {
      case 'blue': return 'from-blue-600 to-blue-700';
      case 'purple': return 'from-purple-600 to-purple-700';
      case 'green': return 'from-green-600 to-green-700';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            {t('projects')}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-4 animate-fade-in-up animation-delay-200">
            {t('featured_projects_1')}
          </p>
          <p className="text-2xl text-yellow-300 font-semibold animate-fade-in-up animation-delay-300">
            {t('featured_projects_2')}
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Proyectos */}
      <section 
        id="projects-grid"
        ref={setRef('projects-grid')}
        className={`py-20 transition-all duration-1000 ${
          visibleSections['projects-grid'] ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-fade-in-up flex flex-col h-full`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Imagen del proyecto */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${getProjectColor(project.color)} opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-center justify-center`}>
                    <div className="text-white text-6xl transform scale-0 group-hover:scale-100 transition-transform duration-500">
                      {project.icon}
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {project.shortTitle}
                    </h3>
                    <div className={`text-3xl ${project.color === 'blue' ? 'text-blue-600' : project.color === 'purple' ? 'text-purple-600' : 'text-green-600'}`}>
                      {project.icon}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <FaUsers className="text-2xl text-gray-400 mx-auto mb-1" />
                      <p className="text-sm text-gray-500">Usuarios</p>
                      <p className="font-bold text-gray-900">{project.stats.users}</p>
                    </div>
                    <div className="text-center">
                      <FaTrophy className="text-2xl text-gray-400 mx-auto mb-1" />
                      <p className="text-sm text-gray-500">Retorno</p>
                      <p className="font-bold text-gray-900">{project.stats.avgReturn}</p>
                    </div>
                    <div className="text-center">
                      <FaDollarSign className="text-2xl text-gray-400 mx-auto mb-1" />
                      <p className="text-sm text-gray-500">Mínimo</p>
                      <p className="font-bold text-gray-900">{project.stats.minInvestment}</p>
                    </div>
                  </div>

                  {/* Niveles */}
                  <div className="flex gap-2 mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getColorByLevel(project.investmentLevel)}`}>
                      Inversión {project.investmentLevel === 'high' ? 'Alta' : project.investmentLevel === 'medium' ? 'Media' : 'Baja'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getColorByLevel(project.riskLevel)}`}>
                      Riesgo {project.riskLevel === 'high' ? 'Alto' : project.riskLevel === 'medium' ? 'Medio' : 'Bajo'}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto pt-4">
                    <Link
                      to={`/projects/${project.id}`}
                      className={`w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r ${getProjectColor(project.color)} text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group`}
                    >
                      {t('more_information')}
                      <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaRocket className="text-6xl text-yellow-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('cta_title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('cta_description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-full hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              {t('cta_button_contact')}
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold rounded-full hover:bg-yellow-400 hover:text-gray-900 transform hover:scale-105 transition-all duration-300"
            >
              {t('register')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;