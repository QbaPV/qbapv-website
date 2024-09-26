// src/components/ProjectCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ image, title, description, link }) => {
    return (
        <div className="bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
            <img src={image} alt={title} className="w-full h-48 object-cover shadow-2xl hover:shadow-2xl transition-shadow duration-300" />
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <Link to={link} className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300">
                    Learn More
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;
