// src/pages/Blog.js
import React from 'react';
import '../styles/blog.css';
import { useTranslation } from 'react-i18next';

const postsData = [
    {
        title: 'Primer Post',
        content: 'Este es el contenido de la primera entrada del blog.',
        date: '01/09/2024',
        language: 'es'
    },
    {
        title: 'Second Post',
        content: 'This is the content of the second blog post.',
        date: '01/09/2024',
        language: 'en'
    }
];

const Blog = () => {
    const { t, i18n } = useTranslation();

    // Filtrar posts según el idioma seleccionado
    const filteredPosts = postsData.filter(post => post.language === i18n.language);

    return (
        <div className="blog-container">
            <h1>{t('blog')}</h1>
            {filteredPosts.map((post, index) => (
                <div key={index} className="post">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <span>{post.date}</span>
                </div>
            ))}
        </div>
    );
};

export default Blog;
