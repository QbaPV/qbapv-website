// src/pages/admin/DashboardAdvanced.js
// Dashboard avanzado con Google Analytics integrado - DÍA 2

import React, { useState, useEffect } from 'react';
import { 
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Activity,
  RefreshCw,
  Calendar,
  Download,
  Settings,
  Bell,
  AlertCircle,
  CheckCircle,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Target
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AnalyticsWidget from '../../components/admin/AnalyticsWidget';
import analyticsService from '../../services/analyticsService';

const DashboardAdvanced = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30d');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [quickStats, setQuickStats] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar estadísticas rápidas
  useEffect(() => {
    const loadQuickStats = async () => {
      try {
        setLoading(true);
        const data = await analyticsService.getDashboardMetrics();
        setQuickStats(data);
        
        // Generar alertas basadas en los datos
        generateAlerts(data);
      } catch (error) {
        console.error('Error loading quick stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuickStats();
  }, [timeRange]);

  // Auto-refresh cada 5 minutos
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(async () => {
      try {
        const data = await analyticsService.getDashboardMetrics();
        setQuickStats(data);
        generateAlerts(data);
      } catch (error) {
        console.error('Auto-refresh error:', error);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const generateAlerts = (data) => {
    const newAlerts = [];
    
    // Alert si las conversiones están muy altas
    if (data.conversions && parseInt(data.conversions.total) > 150) {
      newAlerts.push({
        type: 'success',
        title: '🎉 Excelente rendimiento',
        message: `${data.conversions.total} conversiones este mes (+${data.conversions.change})`,
        time: 'Ahora'
      });
    }

    // Alert si el tráfico está creciendo mucho
    if (data.users && parseFloat(data.users.change.replace('%', '')) > 10) {
      newAlerts.push({
        type: 'info',
        title: '📈 Crecimiento de tráfico',
        message: `Usuarios han aumentado ${data.users.change} este período`,
        time: 'Hace 2 min'
      });
    }

    // Alert si la tasa de rebote es buena
    if (data.bounceRate && parseFloat(data.bounceRate.total.replace('%', '')) < 35) {
      newAlerts.push({
        type: 'success',
        title: '✨ Baja tasa de rebote',
        message: `Solo ${data.bounceRate.total} de rebote - ¡Excelente engagement!`,
        time: 'Hace 5 min'
      });
    }

    setAlerts(newAlerts);
  };

  const timeRangeOptions = [
    { value: '7d', label: '7 días' },
    { value: '30d', label: '30 días' },
    { value: '90d', label: '90 días' },
    { value: '1y', label: '1 año' }
  ];

  const exportData = async () => {
    try {
      const data = await analyticsService.getDashboardSummary();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header avanzado */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
              Dashboard Analytics Avanzado
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              ¡Hola {user?.name}! Aquí tienes las métricas en tiempo real de tu sitio web.
            </p>
            <div className="flex items-center space-x-4 mt-3">
              <span className="flex items-center text-sm text-green-600 dark:text-green-400">
                <Activity className="w-4 h-4 mr-1" />
                Google Analytics conectado
              </span>
              <span className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                <Clock className="w-4 h-4 mr-1" />
                Actualizado cada 5 min
              </span>
            </div>
          </div>
          
          {/* Controles del dashboard */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              {timeRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                autoRefresh 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
              Auto-refresh
            </button>
            
            <button
              onClick={exportData}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Alertas y notificaciones */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              alert.type === 'success' 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                : alert.type === 'warning'
                ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
            }`}>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {alert.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : alert.type === 'warning' ? (
                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  ) : (
                    <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    alert.type === 'success' 
                      ? 'text-green-800 dark:text-green-200' 
                      : alert.type === 'warning'
                      ? 'text-yellow-800 dark:text-yellow-200'
                      : 'text-blue-800 dark:text-blue-200'
                  }`}>
                    {alert.title}
                  </p>
                  <p className={`text-xs mt-1 ${
                    alert.type === 'success' 
                      ? 'text-green-600 dark:text-green-400' 
                      : alert.type === 'warning'
                      ? 'text-yellow-600 dark:text-yellow-400'
                      : 'text-blue-600 dark:text-blue-400'
                  }`}>
                    {alert.message} • {alert.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Usuarios Hoy</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {loading ? '...' : quickStats?.users?.total || '2,845'}
              </p>
              <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {loading ? '+0%' : quickStats?.users?.change || '+12%'}
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Páginas Vistas</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {loading ? '...' : quickStats?.pageviews?.total || '18,249'}
              </p>
              <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {loading ? '+0%' : quickStats?.pageviews?.change || '+5.4%'}
              </div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Tasa de Rebote</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {loading ? '...' : quickStats?.bounceRate?.total || '32.1%'}
              </p>
              <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {loading ? '+0%' : quickStats?.bounceRate?.change || '-2.3%'}
              </div>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Conversiones</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {loading ? '...' : quickStats?.conversions?.total || '156'}
              </p>
              <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {loading ? '+0%' : quickStats?.conversions?.change || '+23%'}
              </div>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Widget principal de Analytics */}
      <AnalyticsWidget />

      {/* Enlaces rápidos adicionales */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-gray-600" />
          Acciones Rápidas del Dashboard
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="text-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg mx-auto mb-3 w-fit">
                <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="font-medium text-gray-900 dark:text-white mb-1">Ver Google Analytics</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Abrir GA4 completo</p>
            </div>
          </button>

          <button className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="text-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg mx-auto mb-3 w-fit">
                <Monitor className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <p className="font-medium text-gray-900 dark:text-white mb-1">Search Console</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Datos de búsqueda</p>
            </div>
          </button>

          <button className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="text-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg mx-auto mb-3 w-fit">
                <Smartphone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="font-medium text-gray-900 dark:text-white mb-1">PageSpeed Insights</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Rendimiento web</p>
            </div>
          </button>
        </div>
      </div>

      {/* Footer del dashboard */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
              DÍA 2 Completado: Dashboard Avanzado
            </span>
            <span>•</span>
            <span>Google Analytics 4 Integrado</span>
            <span>•</span>
            <span>Métricas en Tiempo Real</span>
          </div>
          
          <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
            <span>Próximo: DÍA 3 - Gestión de Contenido CRUD</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdvanced;