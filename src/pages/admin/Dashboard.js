// src/pages/admin/Dashboard.js - VERSIÓN AVANZADA DÍA 2
// Dashboard principal con opción de vista básica y avanzada

import React, { useState } from 'react';
import { 
  TrendingUp,
  Users,
  FileIcon,
  Mail,
  Activity,
  Clock,
  CheckCircle,
  PlusCircle,
  MessageCircle,
  BarChart2,
  Edit,
  FileText,
  MessageSquare,
  LayoutDashboard,
  Settings,
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardAdvanced from './DashboardAdvanced';

const Dashboard = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState('advanced'); // 'basic' | 'advanced'
  
  // Si está en modo avanzado, mostrar el dashboard avanzado
  if (viewMode === 'advanced') {
    return (
      <div>
        {/* Selector de vista */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode('basic')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'basic' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 mr-2 inline" />
              Vista Básica
            </button>
            <button
              onClick={() => setViewMode('advanced')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'advanced' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-2 inline" />
              Vista Avanzada
            </button>
          </div>
          
          <div className="bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-green-800 dark:text-green-200">
              🚀 DÍA 2 - Google Analytics Integrado
            </span>
          </div>
        </div>

        {/* Dashboard avanzado */}
        <DashboardAdvanced />
      </div>
    );
  }

  // Vista básica (original)
  const metrics = [
    {
      title: 'Usuarios Activos',
      value: '2,845',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      description: 'Últimos 30 días'
    },
    {
      title: 'Páginas Vistas',
      value: '18,249',
      change: '+5.4%',
      changeType: 'positive',
      icon: BarChart2,
      description: 'Este mes'
    },
    {
      title: 'Proyectos Activos',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: FileIcon,
      description: 'Publicados'
    },
    {
      title: 'Mensajes Nuevos',
      value: '47',
      change: '+8',
      changeType: 'positive',
      icon: Mail,
      description: 'Sin responder'
    }
  ];

  const recentActivity = [
    {
      action: 'Nuevo proyecto "Trading Bot AI" publicado',
      time: 'Hace 2 horas',
      type: 'success',
      icon: CheckCircle
    },
    {
      action: 'Artículo del blog actualizado',
      time: 'Hace 5 horas',
      type: 'info',
      icon: Edit
    },
    {
      action: '3 nuevos mensajes de contacto recibidos',
      time: 'Hace 1 día',
      type: 'warning',
      icon: MessageCircle
    },
    {
      action: 'Sistema de analytics actualizado',
      time: 'Hace 2 días',
      type: 'info',
      icon: BarChart2
    }
  ];

  const quickStats = [
    { label: 'Tasa de Conversión', value: '4.2%', trend: 'up' },
    { label: 'Tiempo Promedio', value: '3m 24s', trend: 'up' },
    { label: 'Bounce Rate', value: '32%', trend: 'down' },
    { label: 'Páginas/Sesión', value: '2.8', trend: 'up' }
  ];

  return (
    <div className="space-y-6">
      {/* Selector de vista */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setViewMode('basic')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'basic' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 mr-2 inline" />
            Vista Básica
          </button>
          <button
            onClick={() => setViewMode('advanced')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'advanced' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <BarChart3 className="w-4 h-4 mr-2 inline" />
            Vista Avanzada
          </button>
        </div>

        <button
          onClick={() => setViewMode('advanced')}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:-translate-y-0.5 shadow-md"
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Probar Dashboard Avanzado
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      {/* Welcome section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              ¡Bienvenido de vuelta, {user?.name}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Aquí tienes un resumen de tu sitio web y sus métricas principales.
            </p>
            <div className="flex items-center space-x-4 mt-3">
              <span className="flex items-center text-sm text-green-600 dark:text-green-400">
                <Activity className="w-4 h-4 mr-1" />
                Sistema funcionando correctamente
              </span>
              <span className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                <Clock className="w-4 h-4 mr-1" />
                Última actualización: hace 5 min
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <LayoutDashboard className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Promoción del dashboard avanzado */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-green-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
              🚀 Nuevo: Dashboard Avanzado con Google Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Accede a métricas en tiempo real, gráficos interactivos y análisis profundo de tu sitio web.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <span className="flex items-center text-green-600 dark:text-green-400">
                <CheckCircle className="w-4 h-4 mr-1" />
                Google Analytics 4 integrado
              </span>
              <span className="flex items-center text-blue-600 dark:text-blue-400">
                <CheckCircle className="w-4 h-4 mr-1" />
                Gráficos interactivos
              </span>
              <span className="flex items-center text-purple-600 dark:text-purple-400">
                <CheckCircle className="w-4 h-4 mr-1" />
                Métricas en tiempo real
              </span>
            </div>
          </div>
          <button
            onClick={() => setViewMode('advanced')}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all transform hover:-translate-y-0.5 shadow-lg font-medium"
          >
            Activar Ahora
          </button>
        </div>
      </div>

      {/* Main metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={metric.title} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${
                index === 0 ? 'bg-blue-100 dark:bg-blue-900/20' :
                index === 1 ? 'bg-green-100 dark:bg-green-900/20' :
                index === 2 ? 'bg-purple-100 dark:bg-purple-900/20' :
                'bg-orange-100 dark:bg-orange-900/20'
              }`}>
                <metric.icon className={`w-6 h-6 ${
                  index === 0 ? 'text-blue-600 dark:text-blue-400' :
                  index === 1 ? 'text-green-600 dark:text-green-400' :
                  index === 2 ? 'text-purple-600 dark:text-purple-400' :
                  'text-orange-600 dark:text-orange-400'
                }`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                metric.changeType === 'positive' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                <TrendingUp className="w-4 h-4" />
                <span>{metric.change}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {metric.title}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {metric.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {metric.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`w-2 h-8 rounded-full ${
                stat.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <PlusCircle className="w-5 h-5 mr-2 text-blue-600" />
            Acciones Rápidas
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Nuevo Proyecto</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Crear un proyecto desde cero</p>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Escribir Artículo</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Nuevo post para el blog</p>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Ver Mensajes</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Responder contactos</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                3 nuevos
              </span>
            </button>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-600" />
            Actividad Reciente
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className={`p-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-100 dark:bg-green-900/20' :
                  activity.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                  'bg-blue-100 dark:bg-blue-900/20'
                }`}>
                  <activity.icon className={`w-4 h-4 ${
                    activity.type === 'success' ? 'text-green-600 dark:text-green-400' :
                    activity.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-blue-600 dark:text-blue-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success notification para DÍA 1 y DÍA 2 completados */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              🎉 Panel de Administración DÍA 2 completado exitosamente
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              DÍA 1 completado: Login, Layout, Auth Context, Dashboard básico. 
              <strong>DÍA 2 completado: Dashboard avanzado con Google Analytics integrado.</strong>
              <br />
              <strong>Credenciales: admin / qbapv2025</strong> - ¡Prueba la Vista Avanzada arriba!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;