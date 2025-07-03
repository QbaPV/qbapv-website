// Google Analytics 4 Configuration
// Este archivo maneja toda la configuración y eventos de GA4

// IMPORTANTE: Reemplaza 'G-XXXXXXXXXX' con tu Measurement ID real
export const GA_MEASUREMENT_ID = 'G-07NB061E1F'; // ID de Google Analytics para qbapv.com

// Función para inicializar GA4
export const initGA = () => {
  // Verificar que tenemos un ID válido
  if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn('⚠️ Google Analytics: Por favor configura tu Measurement ID en src/config/analytics.js');
    return false;
  }

  // Cargar el script de gtag
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Configurar gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });

  return true;
};

// Función para trackear vistas de página
export const pageview = (url) => {
  if (window.gtag && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Función para trackear eventos personalizados
export const event = ({ action, category, label, value }) => {
  if (window.gtag && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Eventos predefinidos para el sitio
export const GAEvents = {
  // Navegación
  clickMenu: (menuItem) => {
    event({
      action: 'click_menu',
      category: 'Navigation',
      label: menuItem,
    });
  },

  // Cambio de idioma
  changeLanguage: (language) => {
    event({
      action: 'change_language',
      category: 'User Preferences',
      label: language,
    });
  },

  // Proyectos
  viewProject: (projectName) => {
    event({
      action: 'view_project',
      category: 'Projects',
      label: projectName,
    });
  },

  clickProjectLink: (projectName, linkType) => {
    event({
      action: 'click_project_link',
      category: 'Projects',
      label: `${projectName} - ${linkType}`,
    });
  },

  // Blog
  viewBlogPost: (postTitle) => {
    event({
      action: 'view_blog_post',
      category: 'Blog',
      label: postTitle,
    });
  },

  readFullPost: (postTitle) => {
    event({
      action: 'read_full_post',
      category: 'Blog',
      label: postTitle,
    });
  },

  // Formularios
  submitContactForm: (formType) => {
    event({
      action: 'submit_form',
      category: 'Forms',
      label: formType || 'contact',
    });
  },

  formError: (formType, errorType) => {
    event({
      action: 'form_error',
      category: 'Forms',
      label: `${formType} - ${errorType}`,
    });
  },

  // Descargas
  downloadFile: (fileName) => {
    event({
      action: 'download',
      category: 'Downloads',
      label: fileName,
    });
  },

  // Redes sociales
  clickSocial: (platform) => {
    event({
      action: 'click_social',
      category: 'Social',
      label: platform,
    });
  },

  // Scroll depth (profundidad de scroll)
  scrollDepth: (percentage) => {
    event({
      action: 'scroll',
      category: 'User Engagement',
      label: `${percentage}%`,
      value: percentage,
    });
  },

  // Tiempo en página
  timeOnPage: (seconds, pageName) => {
    event({
      action: 'time_on_page',
      category: 'User Engagement',
      label: pageName,
      value: seconds,
    });
  },
};

// Hook para tracking de scroll depth
export const useScrollTracking = () => {
  const scrollPercentages = [25, 50, 75, 100];
  const trackedPercentages = new Set();

  const trackScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.scrollY;
    const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

    scrollPercentages.forEach((percentage) => {
      if (scrollPercentage >= percentage && !trackedPercentages.has(percentage)) {
        trackedPercentages.add(percentage);
        GAEvents.scrollDepth(percentage);
      }
    });
  };

  return trackScroll;
};

// Hook para tracking de tiempo en página
export const useTimeTracking = (pageName) => {
  let startTime = Date.now();
  
  const trackTime = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    GAEvents.timeOnPage(timeSpent, pageName);
  };

  return trackTime;
};
