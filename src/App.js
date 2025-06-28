// src/App.js - VERSIÓN CORREGIDA
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import CriptoDetails from './pages/Project_Ct_Details';
import FreebitcoinDetails from './pages/Project_Fb_Details';
import ForexDetails from './pages/Project_Fx_Details';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Register from './pages/Register';
import BlogPost from './pages/BlogPost';
import AdminEmail from './pages/AdminEmail';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/forex" element={<ForexDetails project="forex" />} />
          <Route path="/projects/cripto" element={<CriptoDetails project="cripto" />} />
          <Route path="/projects/freebitcoin" element={<FreebitcoinDetails project="freebitcoin" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-email" element={<AdminEmail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;