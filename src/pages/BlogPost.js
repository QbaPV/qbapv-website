// src/pages/BlogPost.js - VERSIÓN CON JSON CENTRALIZADO
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Importar datos del JSON centralizado
import blogData from '../data/blogPosts.json';

// Importar imágenes existentes como fallback
import forexImg from '../assets/images/forex-home.jpg';
import criptoImg from '../assets/images/cripto-home.jpg';
import freebitcoinImg from '../assets/images/freebitcoin-home.jpg';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Usar datos del JSON y mapear imágenes
  const blogPosts = blogData.posts.map(post => ({
    ...post,
    // Mapear imágenes locales basándose en categoría
    image: post.category === 'Trading' ? forexImg :
           post.category === 'Criptomonedas' ? criptoImg :
           post.category === 'Blockchain' ? freebitcoinImg :
           post.category === 'Análisis' ? forexImg :
           post.category === 'Gestión' ? criptoImg :
           post.category === 'Psicología' ? freebitcoinImg :
           forexImg, // fallback
    // Adaptar estructura para compatibilidad
    readTime: `${post.readTime} min`,
    tags: post.tags || [],
    views: post.views || 0
  }));

  // Función para encontrar el post actual
  useEffect(() => {
    const currentPost = blogPosts.find(p => p.id === parseInt(id));
    
    if (currentPost) {
      setPost(currentPost);
      
      // Encontrar posts relacionados (misma categoría, excluyendo el actual)
      const related = blogPosts
        .filter(p => p.id !== currentPost.id && p.category === currentPost.category)
        .slice(0, 3);
      
      // Si no hay suficientes de la misma categoría, completar con otros
      if (related.length < 3) {
        const others = blogPosts
          .filter(p => p.id !== currentPost.id && p.category !== currentPost.category)
          .slice(0, 3 - related.length);
        related.push(...others);
      }
      
      setRelatedPosts(related);
    } else {
      // Si no se encuentra el post, redirigir al blog
      navigate('/blog');
    }
    
    setLoading(false);
  }, [id, navigate]);

  // Función para navegar al anterior/siguiente
  const getAdjacentPosts = () => {
    const currentIndex = blogPosts.findIndex(p => p.id === parseInt(id));
    const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
    return { prevPost, nextPost };
  };

  const { prevPost, nextPost } = getAdjacentPosts();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-gray-300 mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-600 mb-2">Artículo no encontrado</h1>
          <p className="text-gray-500 mb-6">El artículo que buscas no existe o ha sido movido.</p>
          <Link
            to="/blog"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Volver al Blog
          </Link>
        </div>
      </div>
    );
  }

  // Función para formatear el texto con párrafos
  const formatContent = (content) => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-6 text-gray-800 leading-relaxed text-lg">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-purple-600">Inicio</Link>
            <span className="mx-2">→</span>
            <Link to="/blog" className="hover:text-purple-600">Blog</Link>
            <span className="mx-2">→</span>
            <span className="text-gray-900">{post.title[i18n.language]}</span>
          </nav>
        </div>
      </section>

      {/* Artículo Principal */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header del artículo */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full font-medium">
              {post.category}
            </span>
            <span>👤 {post.author}</span>
            <span>📅 {new Date(post.date).toLocaleDateString()}</span>
            <span>⏱️ {post.readTime}</span>
            <span>👁️ {post.views}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title[i18n.language]}
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            {post.excerpt[i18n.language]}
          </p>
        </header>

        {/* Imagen principal */}
        <div className="mb-12">
          <img 
            src={post.image} 
            alt={post.title[i18n.language]}
            className="w-full h-96 object-cover rounded-2xl shadow-xl"
          />
        </div>

        {/* Contenido del artículo */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="text-gray-800 leading-relaxed">
            {formatContent(post.content[i18n.language])}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Etiquetas:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Navegación Anterior/Siguiente */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          {prevPost ? (
            <Link 
              to={`/blog/${prevPost.id}`}
              className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow group max-w-sm"
            >
              <div className="mr-4 text-2xl group-hover:-translate-x-1 transition-transform">←</div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Artículo anterior</p>
                <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                  {prevPost.title[i18n.language]}
                </h4>
              </div>
            </Link>
          ) : (
            <div></div>
          )}
          
          {nextPost ? (
            <Link 
              to={`/blog/${nextPost.id}`}
              className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow group text-right max-w-sm"
            >
              <div>
                <p className="text-sm text-gray-500 mb-1">Siguiente artículo</p>
                <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                  {nextPost.title[i18n.language]}
                </h4>
              </div>
              <div className="ml-4 text-2xl group-hover:translate-x-1 transition-transform">→</div>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </section>

      {/* Artículos relacionados */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Artículos Relacionados
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <article
                key={relatedPost.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={relatedPost.image} 
                    alt={relatedPost.title[i18n.language]}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                    <span>📅 {new Date(relatedPost.date).toLocaleDateString()}</span>
                    <span>⏱️ {relatedPost.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {relatedPost.title[i18n.language]}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {relatedPost.excerpt[i18n.language]}
                  </p>
                  
                  <Link
                    to={`/blog/${relatedPost.id}`}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Leer más →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl text-yellow-400 mx-auto mb-6">📰</div>
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Te gustó este artículo?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Suscríbete a nuestro newsletter y no te pierdas nuestros últimos análisis y estrategias.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-full hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Suscribirse al Newsletter
            </Link>
            <Link
              to="/blog"
              className="px-8 py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold rounded-full hover:bg-yellow-400 hover:text-gray-900 transform hover:scale-105 transition-all duration-300"
            >
              Ver Más Artículos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;