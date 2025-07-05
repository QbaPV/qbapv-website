// src/App.js - VERSIÓN TEMPORAL SIN LUCIDE-REACT
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

// Importar Panel de Administración (VERSIÓN SIN ICONOS)
import { AuthProvider, ProtectedRoute } from './contexts/AuthContext';
import AdminLogin from './pages/admin/Login_SinIconos';

// Importar Google Analytics
import { initGA, pageview } from './config/analytics';

// Dashboard temporal sin iconos
const TempDashboard = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          🎉 ¡Panel de Administración Funcionando!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">✅ Login Exitoso</h3>
            <p className="text-blue-700">Te has autenticado correctamente como administrador.</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-2">🚀 Sistema Funcionando</h3>
            <p className="text-green-700">El Panel de Administración está operativo.</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">🔧 Próximo Paso</h3>
            <p className="text-purple-700">Instalar lucide-react para iconos completos.</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">📊 DÍA 1 Completado</h3>
            <p className="text-yellow-700">Fundaciones sólidas implementadas.</p>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">🔧 Para continuar con DÍA 2:</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Ejecutar: <code className="bg-gray-200 px-2 py-1 rounded">npm install lucide-react</code></li>
            <li>Reiniciar servidor</li>
            <li>Continuar con Dashboard avanzado + Google Analytics</li>
          </ol>
        </div>

        <div className="mt-6 text-center">
          <button 
            onClick={() => {
              localStorage.removeItem('authToken');
              localStorage.removeItem('user');
              window.location.href = '/admin/login';
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  </div>
);

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

            {/* Rutas del Panel de Administración TEMPORALES */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <TempDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <TempDashboard />
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
