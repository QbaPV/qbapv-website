// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Para React 18
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import './i18n'; // Importa el archivo i18n
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Register from './pages/Register';
import AdminEmail from './pages/AdminEmail';
import Navbar from './components/Navbar';
import './styles/styles.css';

// Crear el root para React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GoogleReCaptchaProvider
      reCaptchaKey="6LeDKlIqAAAAAH_qOOh3XQPwemwAj9V5MhPqvH60" // Reemplaza con tu clave reCAPTCHA v3
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-email" element={<AdminEmail />} />
        </Routes>
      </Router>
    </GoogleReCaptchaProvider>
  </React.StrictMode>
);
