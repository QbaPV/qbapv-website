// SEO Head Simplificado - Para diagnosticar problemas
import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

const SEOHead = ({ page, path = '' }) => {
  const { i18n } = useTranslation();
  
  // Configuración básica de prueba
  const titles = {
    home: {
      es: "QbaPV - Inicio | Trading y Tecnología Financiera",
      en: "QbaPV - Home | Trading and Financial Technology"
    },
    about: {
      es: "QbaPV - Sobre Nosotros | Quiénes Somos",
      en: "QbaPV - About Us | Who We Are"
    },
    contact: {
      es: "QbaPV - Contacto | Consultoría Trading",
      en: "QbaPV - Contact | Trading Consulting"
    },
    projects: {
      es: "QbaPV - Proyectos | Trading Automatizado",
      en: "QbaPV - Projects | Automated Trading"
    },
    blog: {
      es: "QbaPV - Blog | Análisis Trading",
      en: "QbaPV - Blog | Trading Analysis"
    },
    register: {
      es: "QbaPV - Registro | Únete a Nosotros",
      en: "QbaPV - Register | Join Us"
    }
  };

  const descriptions = {
    home: {
      es: "Soluciones innovadoras en trading y tecnología financiera. Expertos en Forex, Bitcoin y automatización de inversiones.",
      en: "Innovative solutions in trading and financial technology. Experts in Forex, Bitcoin and investment automation."
    },
    about: {
      es: "Conoce el equipo de QbaPV, nuestros valores, misión y visión. Expertos en trading con años de experiencia.",
      en: "Meet the QbaPV team, our values, mission and vision. Trading experts with years of experience."
    }
  };

  const currentLang = i18n.language || 'es';
  const pageTitle = titles[page]?.[currentLang] || titles[page]?.es || "QbaPV";
  const pageDescription = descriptions[page]?.[currentLang] || descriptions[page]?.es || "";

  console.log('SEOHead Debug:', { page, currentLang, pageTitle });

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={`https://qbapv.com${path}`} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
    </Helmet>
  );
};

export default SEOHead;
