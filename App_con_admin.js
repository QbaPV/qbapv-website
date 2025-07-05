// src/App.js - VERSIÓN CON GOOGLE ANALYTICS 4 + PANEL ADMIN
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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

// Importar Panel de Administración
import { AuthProvider, ProtectedRoute } from './contexts/AuthContext';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminLayout from './layouts/AdminLayout';

// Importar Google Analytics
import { initGA, pageview } from './config/analytics';

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Inicializar Google Analytics cuando la app carga
  useEffect(() => {
    const gaInitialized = initGA();
    if (gaInitialized) {
      console.log('✅ Google Analytics inicializado correctamente');
    }
  }, []);

  // Trackear cambios de página
  useEffect(() => {
    pageview(location.pathname + location.search);
  }, [location]);

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        {/* No mostrar Navbar/Footer en rutas admin */}
        {!isAdminRoute && <Navbar />}
        
        <main className={isAdminRoute ? "" : "flex-grow"}>
          <Routes>
            {/* Rutas públicas */}
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

            {/* Rutas del Panel de Administración */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Página en Desarrollo
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Esta sección estará disponible pronto.
                      </p>
                    </div>
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        
        {/* No mostrar Footer en rutas admin */}
        {!isAdminRoute && <Footer />}
      </div>
    </AuthProvider>
  );
};

export default App;
