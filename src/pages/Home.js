// src/pages/Home.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/styles.css';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="home-container">
            <h1>{t('welcome')}</h1>
            <p>{t('home_description')}</p>
        </div>
    );
};

export default Home;
