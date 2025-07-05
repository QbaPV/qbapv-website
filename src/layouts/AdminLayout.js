import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  User, 
  Bell,
  Search,
  Sun,
  Moon,
  Edit,
  Image,
  Tags
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [activeRoute, setActiveRoute] = useState(window.location.pathname);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/admin/dashboard', 
      icon: LayoutDashboard, 
      current: activeRoute === '/admin/dashboard',
      description: 'Métricas y resumen',
      color: 'text-blue-600 dark:text-blue-400'
    },
    { 
      name: 'Proyectos', 
      href: '/admin/projects', 
      icon: Edit, 
      current: activeRoute === '/admin/projects',
      description: 'Gestión de portfolio',
      color: 'text-purple-600 dark:text-purple-400'
    },
    { 
      name: 'Blog', 
      href: '/admin/blog', 
      icon: FileText, 
      current: activeRoute === '/admin/blog',
      description: 'Artículos y contenido',
      color: 'text-green-600 dark:text-green-400'
    },
    { 
      name: 'Mensajes', 
      href: '/admin/messages', 
      icon: MessageSquare, 
      current: activeRoute === '/admin/messages', 
      badge: '3',
      description: 'Contactos y comunicación',
      color: 'text-orange-600 dark:text-orange-400'
    },
    { 
      name: 'Analytics', 
      href: '/admin/analytics', 
      icon: BarChart3, 
      current: activeRoute === '/admin/analytics',
      description: 'Métricas avanzadas',
      color: 'text-indigo-600 dark:text-indigo-400'
    },
    { 
      name: 'Media', 
      href: '/admin/media', 
      icon: Image, 
      current: activeRoute === '/admin/media',
      description: 'Imágenes y archivos',
      color: 'text-pink-600 dark:text-pink-400'
    },
    { 
      name: 'SEO', 
      href: '/admin/seo', 
      icon: Tags, 
      current: activeRoute === '/admin/seo',
      description: 'Optimización y meta tags',
      color: 'text-teal-600 dark:text-teal-400'
    },
    { 
      name: 'Configuración', 
      href: '/admin/settings', 
      icon: Settings, 
      current: activeRoute === '/admin/settings',
      description: 'Ajustes del sistema',
      color: 'text-gray-400 dark:text-gray-200'
    }
  ];

  const handleNavClick = (href) => {
    setActiveRoute(href);
    // Usar React Router para navegación SIN recargar página
    navigate(href);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col shadow-lg`}>
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {sidebarOpen && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">Q</span>
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">QbaPV Admin</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Panel Profesional</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`group flex items-center w-full px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${sidebarOpen ? '' : 'justify-center'} ${
                  item.current
                    ? 'bg-blue-50 dark:bg-blue-900/20 shadow-sm border border-blue-200 dark:border-blue-800'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:shadow-sm'
                }`}
                title={!sidebarOpen ? item.name : ''}
              >
                {/* Icono con color específico */}
                <item.icon className={`w-5 h-5 flex-shrink-0 transition-colors ${
                  item.current 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : `${item.color} group-hover:text-blue-600 dark:group-hover:text-blue-400`
                }`} />
                
                {sidebarOpen && (
                  <>
                    <div className="ml-3 flex-1 text-left">
                      <div className="flex items-center justify-between">
                        {/* TÍTULOS CON COLORES SÚPER VISIBLES - CAMBIO FORZADO */}
                        <span className={`font-medium transition-colors ${
                          item.current 
                            ? 'text-blue-700 dark:text-blue-300' 
                            : 'text-white dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                        }`}>
                          {item.name}
                        </span>
                        {item.badge && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse shadow-lg">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {/* Descripción mantiene color más sutil pero visible */}
                      <p className={`text-xs mt-1 transition-colors ${
                        item.current 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </>
                )}
              </button>
            ))}
          </nav>

          {/* User section */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className={`flex items-center ${sidebarOpen ? 'space-x-3' : 'justify-center'} mb-3`}>
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              {sidebarOpen && (
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role?.replace('_', ' ')}</p>
                </div>
              )}
            </div>
            {sidebarOpen && (
              <button
                onClick={logout}
                className="flex items-center w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
              >
                <LogOut className="w-4 h-4 mr-3 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors" />
                <span className="group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors font-medium">
                  Cerrar Sesión
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar en el panel..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Right section */}
              <div className="flex items-center space-x-4">
                {/* Dark mode toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title={darkMode ? 'Modo claro' : 'Modo oscuro'}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Notifications */}
                <button className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User avatar */}
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;