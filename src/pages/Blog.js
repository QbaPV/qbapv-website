// src/pages/Blog.js
import React from 'react';
import underConstructionImage from '../assets/images/under-construction.jpg'; // Asegúrate de tener la imagen
import { useTranslation } from 'react-i18next';
import '../styles/blog.css';

const Projects = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {/* Imagen de En Construcción */}
        <img
          src={underConstructionImage}
          alt="Página en construcción"
          className="w-full max-w-lg mb-8 shadow-lg rounded-lg"
        />
  
        {/* Mensaje en inglés y español */}
        <h1 className="text-3xl font-bold text-gray-700 mb-4 text-center">
          This page is under construction.
        </h1>
        <h2 className="text-2xl text-gray-500 text-center">
          Esta página está en construcción.
        </h2>
      </div>
    );
  };
  
export default Projects;


//const postsData = [
//    {
//        title: 'Primer Post',
//        content: 'Este es el contenido de la primera entrada del blog.',
//        date: '01/09/2024',
//        language: 'es'
//    },
//    {
//        title: 'First Post',
//        content: 'This is the content of the first blog post.',
//        date: '01/09/2024',
//        language: 'en'
//    }
//];

//const Blog = () => {
//    const { t, i18n } = useTranslation();

    // Filtrar posts según el idioma seleccionado
//    const filteredPosts = postsData.filter(post => post.language === i18n.language);

//    return (
//        <div className="blog-container">
//            <h1>{t('blog')}</h1>
//			<h2>{t('blog_title0001')}.</h2> {/* Cambiar temporalmente */}
//            {filteredPosts.map((post, index) => (
//                <div key={index} className="post">
//                    <h2>{post.title}</h2>
//                    <p>{post.content}</p>
//                    <span>{post.date}</span>
//                </div>
//            ))}
//        </div>
//    );
//};

//export default Blog;
