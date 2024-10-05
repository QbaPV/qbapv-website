// src/pages/Projects.js
import React from 'react';
import underConstructionImage from '../assets/images/under-construction.jpg'; // Asegúrate de tener la imagen
import { useTranslation } from 'react-i18next';
import '../styles/projects.css';

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



//const Projects = () => {
//    const { t } = useTranslation(); // Agregamos la función de traducción

//    const projectsData = [
//        {
//            title: t('project_1'), // Traducción del título
//            description: t('project_1_description'), // Traducción de la descripción
//            image: "ruta/a/la/imagen1.jpg",
//            link: "#"
//        },
//        {
//           title: t('project_2'), // Traducción del título
//            description: t('project_2_description'), // Traducción de la descripción
//           image: "ruta/a/la/imagen2.jpg",
//            link: "#"
//        },
//        // Agrega más proyectos según sea necesario
//    ];

//    return (
//        <div className="projects-container">
//            <h1>{t('projects')}</h1> {/* Texto traducido */}
//            <div className="projects-grid">
//                {projectsData.map((project, index) => (
//                   <div key={index} className="project-card">
//                        <img src={project.image} alt={project.title} />
//                        <h2>{project.title}</h2> {/* Texto traducido */}
//                        <p>{project.description}</p> {/* Texto traducido */}
//                        <a href={project.link}>{t('more_information')}</a> {/* Texto traducido */}
//                    </div>
//                ))}
//            </div>
//        </div>
//    );
//};

//export default Projects;
