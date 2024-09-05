// src/pages/Projects.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/projects.css';

const Projects = () => {
    const { t } = useTranslation(); // Agregamos la función de traducción

    const projectsData = [
        {
            title: t('project_1'), // Traducción del título
            description: t('project_1_description'), // Traducción de la descripción
            image: "ruta/a/la/imagen1.jpg",
            link: "#"
        },
        {
            title: t('project_2'), // Traducción del título
            description: t('project_2_description'), // Traducción de la descripción
            image: "ruta/a/la/imagen2.jpg",
            link: "#"
        },
        // Agrega más proyectos según sea necesario
    ];

    return (
        <div className="projects-container">
            <h1>{t('projects')}</h1> {/* Texto traducido */}
            <div className="projects-grid">
                {projectsData.map((project, index) => (
                    <div key={index} className="project-card">
                        <img src={project.image} alt={project.title} />
                        <h2>{project.title}</h2> {/* Texto traducido */}
                        <p>{project.description}</p> {/* Texto traducido */}
                        <a href={project.link}>{t('more_information')}</a> {/* Texto traducido */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
