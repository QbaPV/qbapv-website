// src/pages/About.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/styles.css';

const About = () => {
	const { t } = useTranslation();
	
	return (
		<div className="about-container">
            <h1>{t('about')}</h1>
            <p>{t('about_description')}</p>
	</div>
  );
}

export default About;
