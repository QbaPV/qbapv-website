// src/pages/Blog.js - VERSIÓN CORREGIDA
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Importar imágenes existentes
import forexImg from '../assets/images/forex-home.jpg';
import criptoImg from '../assets/images/cripto-home.jpg';
import freebitcoinImg from '../assets/images/freebitcoin-home.jpg';

const Blog = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});
  
  const postsPerPage = 6;

  // Datos de ejemplo para el blog
  const blogPosts = [
    {
      id: 1,
      title: {
        es: 'Estrategias Avanzadas de Trading para 2025',
        en: 'Advanced Trading Strategies for 2025',
        pt: 'Estratégias Avançadas de Trading para 2025',
        fr: 'Stratégies de Trading Avancées pour 2025',
        de: 'Fortgeschrittene Trading-Strategien für 2025',
        it: 'Strategie di Trading Avanzate per il 2025'
      },
      excerpt: {
        es: 'Descubre las técnicas más efectivas para maximizar tus ganancias en el mercado financiero actual.',
        en: 'Discover the most effective techniques to maximize your profits in the current financial market.',
        pt: 'Descubra as técnicas mais eficazes para maximizar seus lucros no mercado financeiro atual.',
        fr: 'Découvrez les techniques les plus efficaces pour maximiser vos profits sur le marché financier actuel.',
        de: 'Entdecken Sie die effektivsten Techniken, um Ihre Gewinne auf dem aktuellen Finanzmarkt zu maximieren.',
        it: 'Scopri le tecniche più efficaci per massimizzare i tuoi profitti nel mercato finanziario attuale.'
      },
      category: 'trading',
      author: 'QbaPV Team',
      date: '2025-06-25',
      readTime: '8 min',
      views: 1247,
      image: forexImg,
      tags: ['trading', 'estrategias', 'finanzas']
    },
    {
      id: 2,
      title: {
        es: 'El Futuro de las Criptomonedas en 2025',
        en: 'The Future of Cryptocurrencies in 2025',
        pt: 'O Futuro das Criptomoedas em 2025',
        fr: 'L\'Avenir des Cryptomonnaies en 2025',
        de: 'Die Zukunft der Kryptowährungen in 2025',
        it: 'Il Futuro delle Criptovalute nel 2025'
      },
      excerpt: {
        es: 'Análisis profundo de las tendencias cripto y las oportunidades de inversión emergentes.',
        en: 'Deep analysis of crypto trends and emerging investment opportunities.',
        pt: 'Análise profunda das tendências cripto e oportunidades de investimento emergentes.',
        fr: 'Analyse approfondie des tendances crypto et des opportunités d\'investissement émergentes.',
        de: 'Tiefgreifende Analyse von Krypto-Trends und aufkommenden Investitionsmöglichkeiten.',
        it: 'Analisi approfondita delle tendenze crypto e delle opportunità di investimento emergenti.'
      },
      category: 'crypto',
      author: 'QbaPV Team',
      date: '2025-06-24',
      readTime: '12 min',
      views: 2156,
      image: criptoImg,
      tags: ['crypto', 'bitcoin', 'inversión']
    },
    {
      id: 3,
      title: {
        es: 'Inversiones Pasivas: Construye Riqueza Mientras Duermes',
        en: 'Passive Investments: Build Wealth While You Sleep',
        pt: 'Investimentos Passivos: Construa Riqueza Enquanto Dorme',
        fr: 'Investissements Passifs: Construisez de la Richesse Pendant Votre Sommeil',
        de: 'Passive Investitionen: Bauen Sie Vermögen auf, während Sie schlafen',
        it: 'Investimenti Passivi: Costruisci Ricchezza Mentre Dormi'
      },
      excerpt: {
        es: 'Aprende cómo generar ingresos pasivos consistentes con estrategias probadas y de bajo riesgo.',
        en: 'Learn how to generate consistent passive income with proven, low-risk strategies.',
        pt: 'Aprenda como gerar renda passiva consistente com estratégias comprovadas e de baixo risco.',
        fr: 'Apprenez à générer des revenus passifs cohérents avec des stratégies éprouvées et à faible risque.',
        de: 'Lernen Sie, wie Sie mit bewährten, risikoarmen Strategien konsistente passive Einkommen generieren.',
        it: 'Impara come generare reddito passivo consistente con strategie provate e a basso rischio.'
      },
      category: 'investment',
      author: 'QbaPV Team',
      date: '2025-06-23',
      readTime: '10 min',
      views: 1876,
      image: freebitcoinImg,
      tags: ['pasivo', 'inversión', 'riqueza']
    },
    {
      id: 4,
      title: {
        es: 'Análisis del Mercado: Tendencias Q3 2025',
        en: 'Market Analysis: Q3 2025 Trends',
        pt: 'Análise do Mercado: Tendências Q3 2025',
        fr: 'Analyse du Marché: Tendances Q3 2025',
        de: 'Marktanalyse: Q3 2025 Trends',
        it: 'Analisi del Mercato: Tendenze Q3 2025'
      },
      excerpt: {
        es: 'Un vistazo detallado a los movimientos del mercado y las oportunidades para el tercer trimestre.',
        en: 'A detailed look at market movements and opportunities for the third quarter.',
        pt: 'Um olhar detalhado sobre os movimentos do mercado e oportunidades para o terceiro trimestre.',
        fr: 'Un regard détaillé sur les mouvements du marché et les opportunités pour le troisième trimestre.',
        de: 'Ein detaillierter Blick auf Marktbewegungen und Chancen für das dritte Quartal.',
        it: 'Uno sguardo dettagliato ai movimenti del mercato e alle opportunità per il terzo trimestre.'
      },
      category: 'analysis',
      author: 'QbaPV Team',
      date: '2025-06-22',
      readTime: '15 min',
      views: 3245,
      image: forexImg,
      tags: ['análisis', 'mercado', 'tendencias']
    },
    {
      id: 5,
      title: {
        es: 'Gestión de Riesgo en Inversiones de Alto Rendimiento',
        en: 'Risk Management in High-Yield Investments',
        pt: 'Gestão de Risco em Investimentos de Alto Rendimento',
        fr: 'Gestion des Risques dans les Investissements à Haut Rendement',
        de: 'Risikomanagement bei hochrentablen Investitionen',
        it: 'Gestione del Rischio negli Investimenti ad Alto Rendimento'
      },
      excerpt: {
        es: 'Estrategias esenciales para proteger tu capital mientras buscas rendimientos superiores.',
        en: 'Essential strategies to protect your capital while seeking superior returns.',
        pt: 'Estratégias essenciais para proteger seu capital enquanto busca retornos superiores.',
        fr: 'Stratégies essentielles pour protéger votre capital tout en recherchant des rendements supérieurs.',
        de: 'Wesentliche Strategien zum Schutz Ihres Kapitals bei der Suche nach höheren Renditen.',
        it: 'Strategie essenziali per proteggere il tuo capitale mentre cerchi rendimenti superiori.'
      },
      category: 'education',
      author: 'QbaPV Team',
      date: '2025-06-21',
      readTime: '11 min',
      views: 1654,
      image: criptoImg,
      tags: ['riesgo', 'gestión', 'educación']
    },
    {
      id: 6,
      title: {
        es: 'Tecnología Blockchain: Más Allá de las Criptomonedas',
        en: 'Blockchain Technology: Beyond Cryptocurrencies',
        pt: 'Tecnologia Blockchain: Além das Criptomoedas',
        fr: 'Technologie Blockchain: Au-delà des Cryptomonnaies',
        de: 'Blockchain-Technologie: Jenseits von Kryptowährungen',
        it: 'Tecnologia Blockchain: Oltre le Criptovalute'
      },
      excerpt: {
        es: 'Explora las aplicaciones revolucionarias de blockchain en diversos sectores e industrias.',
        en: 'Explore the revolutionary applications of blockchain across various sectors and industries.',
        pt: 'Explore as aplicações revolucionárias do blockchain em vários setores e indústrias.',
        fr: 'Explorez les applications révolutionnaires de la blockchain dans divers secteurs et industries.',
        de: 'Erkunden Sie die revolutionären Anwendungen von Blockchain in verschiedenen Sektoren und Industrien.',
        it: 'Esplora le applicazioni rivoluzionarie della blockchain in vari settori e industrie.'
      },
      category: 'technology',
      author: 'QbaPV Team',
      date: '2025-06-20',
      readTime: '9 min',
      views: 987,
      image: freebitcoinImg,
      tags: ['blockchain', 'tecnología', 'innovación']
    }
  ];

  // Categorías simplificadas
  const categories = [
    { id: 'all', name: { es: 'Todos', en: 'All', pt: 'Todos', fr: 'Tous', de: 'Alle', it: 'Tutti' } },
    { id: 'trading', name: { es: 'Trading', en: 'Trading', pt: 'Trading', fr: 'Trading', de: 'Trading', it: 'Trading' } },
    { id: 'crypto', name: { es: 'Cripto', en: 'Crypto', pt: 'Cripto', fr: 'Crypto', de: 'Krypto', it: 'Cripto' } },
    { id: 'investment', name: { es: 'Inversión', en: 'Investment', pt: 'Investimento', fr: 'Investissement', de: 'Investition', it: 'Investimento' } },
    { id: 'analysis', name: { es: 'Análisis', en: 'Analysis', pt: 'Análise', fr: 'Analyse', de: 'Analyse', it: 'Analisi' } },
    { id: 'education', name: { es: 'Educación', en: 'Education', pt: 'Educação', fr: 'Éducation', de: 'Bildung', it: 'Educazione' } },
    { id: 'technology', name: { es: 'Tecnología', en: 'Technology', pt: 'Tecnologia', fr: 'Technologie', de: 'Technologie', it: 'Tecnologia' } }
  ];

  // Filtrar posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title[i18n.language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt[i18n.language].toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Paginación
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  // Reset pagination cuando cambian filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-600 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl text-white mx-auto mb-6">📰</div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t('blog')}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-4">
            Descubre insights, estrategias y análisis profundos del mundo financiero
          </p>
          <p className="text-2xl text-yellow-300 font-semibold">
            Conocimiento que transforma inversiones
          </p>
        </div>
      </section>

      {/* Buscador y Filtros */}
      <section className="py-8 bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Buscador */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</div>
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Filtros por categoría */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name[i18n.language]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Artículos */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post, index) => (
              <article
                key={post.id}
                className="group bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full"
              >
                {/* Imagen */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title[i18n.language]}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Metadata overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center">
                        👁️ {post.views}
                      </span>
                      <span className="flex items-center">
                        ⏱️ {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Metadata */}
                  <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      👤 {post.author}
                    </div>
                    <div className="flex items-center">
                      📅 {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Título */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {post.title[i18n.language]}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 flex-grow">
                    {post.excerpt[i18n.language]}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 text-xs bg-purple-100 text-purple-600 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More Button */}
                  <div className="mt-auto">
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Leer más →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Mensaje si no hay resultados */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl text-gray-300 mx-auto mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                No se encontraron artículos
              </h3>
              <p className="text-gray-500">
                Intenta con otros términos de búsqueda o selecciona una categoría diferente.
              </p>
            </div>
          )}

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-16 space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                ←
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-12 h-12 rounded-full font-semibold transition-all ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-3 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl text-yellow-400 mx-auto mb-6">📰</div>
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Quieres estar al día?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Suscríbete a nuestro newsletter y recibe los mejores artículos directamente en tu email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-full hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Suscribirse al Newsletter
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold rounded-full hover:bg-yellow-400 hover:text-gray-900 transform hover:scale-105 transition-all duration-300"
            >
              Crear Cuenta
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;