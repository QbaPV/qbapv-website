// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
// import Blog from './pages/Blog'; // Asegúrate de que Blog esté correctamente importado
// import Register from './pages/Register'; // Asegúrate de que Register esté correctamente importado

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        // <Route path="/blog" element={<Blog />} />
	    // <Route path="/register" element={<Register />} /> {/* Agregar la ruta */}		
       </Routes>
    </Router>
  );
};

export default App;