// src/index.js - VERSIÓN FINAL SIN RECAPTCHA EN DESARROLLO
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ToastContainer } from 'react-toastify';
import './i18n'; // Configuración de internacionalización
import App from './App';
import './styles/styles.css';
import 'react-toastify/dist/ReactToastify.css';

// Obtener la clave de reCAPTCHA desde variables de entorno
const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

// Detectar si estamos en desarrollo local
const isDevelopment = process.env.NODE_ENV === 'development' || 
                     window.location.hostname === 'localhost' ||
                     window.location.hostname === '127.0.0.1';

// Crear el root para React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Componente wrapper para manejar reCAPTCHA condicionalmente
const AppWithProviders = () => {
  // Si hay una clave válida y NO estamos en desarrollo, usar reCAPTCHA
  const shouldUseRecaptcha = RECAPTCHA_SITE_KEY && !isDevelopment;

  const appContent = (
    <>
      <Router>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </>
  );

  if (shouldUseRecaptcha) {
    return (
      <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
        {appContent}
      </GoogleReCaptchaProvider>
    );
  }

  // En desarrollo o sin clave, renderizar sin reCAPTCHA
  return appContent;
};

// Log para debug
if (isDevelopment) {
  console.log('🔧 Desarrollo detectado - reCAPTCHA deshabilitado');
}

root.render(
  <React.StrictMode>
    <AppWithProviders />
  </React.StrictMode>
);