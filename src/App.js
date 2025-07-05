// src/App.js - VERSIÓN COMPLETA CON LUCIDE-REACT
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

// Importar Panel de Administración COMPLETO
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

            {/* Rutas del Panel de Administración COMPLETO */}
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
            {/* Rutas específicas del admin */}
            <Route 
              path="/admin/projects" 
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        📁 Gestión de Proyectos
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Aquí podrás gestionar todos los proyectos del portfolio.
                      </p>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                        <p className="text-blue-800 dark:text-blue-200 text-sm">
                          🚀 DÍA 2: Editor CRUD completo para proyectos
                        </p>
                      </div>
                    </div>
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/blog" 
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        ✍️ Editor de Blog
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Editor avanzado para artículos del blog.
                      </p>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                        <p className="text-green-800 dark:text-green-200 text-sm">
                          🚀 DÍA 2: Editor WYSIWYG estilo Medium
                        </p>
                      </div>
                    </div>
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/messages" 
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        📧 Mensajes de Contacto
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Gestión de mensajes y comunicaciones.
                      </p>
                      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                        <p className="text-orange-800 dark:text-orange-200 text-sm">
                          🚀 DÍA 2: Bandeja estilo Gmail con respuestas
                        </p>
                      </div>
                      <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                        3 mensajes nuevos
                      </div>
                    </div>
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/analytics" 
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        📈 Analytics Avanzado
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Métricas detalladas y análisis de tráfico.
                      </p>
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                        <p className="text-purple-800 dark:text-purple-200 text-sm">
                          🚀 DÍA 2: Google Analytics 4 integrado + gráficos Recharts
                        </p>
                      </div>
                    </div>
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/media" 
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        🖼️ Gestión de Media
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Administrar imágenes y archivos multimedia.
                      </p>
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                        <p className="text-indigo-800 dark:text-indigo-200 text-sm">
                          🚀 DÍA 2: Upload, organización y optimización de imágenes
                        </p>
                      </div>
                    </div>
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/seo" 
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        🔍 Gestión SEO
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Meta tags dinámicos y optimización SEO.
                      </p>
                      <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4">
                        <p className="text-teal-800 dark:text-teal-200 text-sm">
                          🚀 DÍA 2: Editor meta tags + preview social media
                        </p>
                      </div>
                    </div>
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        ⚙️ Configuración del Sistema
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Configuraciones generales y preferencias.
                      </p>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <p className="text-gray-800 dark:text-gray-200 text-sm">
                          🚀 DÍA 2: Configuración completa del sitio
                        </p>
                      </div>
                    </div>
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            {/* Ruta catch-all para otras rutas admin */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        🚧 Página en Desarrollo
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Esta sección estará disponible pronto.
                      </p>
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-blue-800 dark:text-blue-200 text-sm">
                          🚀 DÍA 2: Funcionalidades avanzadas
                        </p>
                      </div>
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
