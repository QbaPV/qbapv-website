// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import CriptoDetails from './pages/Project_Ct_Details';
import FreebitcoinDetails from './pages/Project_Fb_Details';
import ForexDetails from './pages/Project_Fx_Details';
import Contact from './pages/Contact';
import Blog from './pages/Blog'; // Asegúrate de que Blog esté correctamente importado
import Register from './pages/Register'; // Asegúrate de que Register esté correctamente importado
import AdminEmail from './pages/AdminEmail';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
		
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/forex" element={<ForexDetails project="forex" />} />
        <Route path="/projects/cripto" element={<CriptoDetails project="cripto" />} />
        <Route path="/projects/freebitcoin" element={<FreebitcoinDetails project="freebitcoin" />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
  	    <Route path="/register" element={<Register />} /> {/* Agregar la ruta */}

        <Route path="/admin-email" element={<AdminEmail />} />
		
       </Routes>
    </Router>
  );
};

export default App;