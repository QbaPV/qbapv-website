// src/pages/Home.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/styles.css';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('welcome')}</h1>
                <p className="text-lg text-gray-600 mb-8">{t('home_description')}</p>
                <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300">
                    {t('button_explore_project')}
                </button>
            </div>				
        </div>	
    );
};

export default Home;
