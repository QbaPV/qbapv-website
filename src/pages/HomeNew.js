//HomeNew.js
// src/pages/Home.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/styles.css';import HeroSection from '../components/HeroSection';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';
import forexHome from '../assets/images/forex-home.jpg';
import criptoHome from '../assets/images/cripto-home.jpg';
import freebitcoinHome from '../assets/images/freebitcoin-home.jpg';

const Home = () => {
    const { t } = useTranslation();

        return (
        <>
            <HeroSection
                title="welcome"
                description="home_description_01"
                buttonText="button_explore_project"
                buttonLink="/projects"
                backgroundImage="../assets/images/your-background.jpg"
            />

            {/* Sección de estadísticas */}
            <div className="relative z-10 text-center p-12 mt-50">
                <h1 className="text-4xl font-bold text-gray-900 shadow-black mb-10 animate-fade-in tracking-tight shadow-lg" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.7)' }}>
                    {t('featured_projects')}
                </h1>
                <h2 className="text-3xl text-[#f5f5f5] mb-2 animate-fade-in delay-100 tracking-wide">
                    {t('featured_projects_1')}
                </h2> 
                <h2 className="text-3xl text-[#bcd4e6] mb-20 animate-fade-in delay-100 tracking-wide">
                    {t('featured_projects_2')}
                </h2>             

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 md:mb-20">
                    <ProjectCard
                        image={forexHome}
                        title="Forex"
                        description="Learn about Forex"
                        link="/projects/forex"
                    />
                    <ProjectCard
                        image={criptoHome}
                        title="Cryptocurrency"
                        description="Learn about Crypto"
                        link="/projects/cripto"
                    />
                    <ProjectCard
                        image={freebitcoinHome}
                        title="Free Bitcoin"
                        description="Learn about Free Bitcoin"
                        link="/projects/freebitcoin"
                    />
                </div>
            </div>
            
            <Footer />
        </>
    );
};

export default Home;