// src/components/admin/AnalyticsWidget.js
// Widget principal de Analytics para el dashboard

import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Clock, 
  Target,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  BarChart2,
  Activity,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import analyticsService from '../../services/analyticsService';

/**
 * Widget de métricas principales
 */
const MetricsOverviewWidget = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <Skeleton height={24} width={200} className="mb-4" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton height={16} width={80} />
              <Skeleton height={32} width={120} />
              <Skeleton height={12} width={60} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const metrics = [
    {
      label: 'Usuarios Totales',
      value: data?.users?.total || '0',
      change: data?.users?.change || '0%',
      changeType: data?.users?.changeType || 'neutral',
      icon: Users,
      color: 'blue'
    },
    {
      label: 'Páginas Vistas',
      value: data?.pageviews?.total || '0',
      change: data?.pageviews?.change || '0%',
      changeType: data?.pageviews?.changeType || 'neutral',
      icon: Eye,
      color: 'green'
    },
    {
      label: 'Sesiones',
      value: data?.sessions?.total || '0',
      change: data?.sessions?.change || '0%',
      changeType: data?.sessions?.changeType || 'neutral',
      icon: Activity,
      color: 'purple'
    },
    {
      label: 'Duración Promedio',
      value: data?.avgSessionDuration?.total || '0:00',
      change: data?.avgSessionDuration?.change || '0%',
      changeType: data?.avgSessionDuration?.changeType || 'neutral',
      icon: Clock,
      color: 'orange'
    },
    {
      label: 'Tasa de Rebote',
      value: data?.bounceRate?.total || '0%',
      change: data?.bounceRate?.change || '0%',
      changeType: data?.bounceRate?.changeType || 'neutral',
      icon: TrendingDown,
      color: 'red'
    },
    {
      label: 'Conversiones',
      value: data?.conversions?.total || '0',
      change: data?.conversions?.change || '0%',
      changeType: data?.conversions?.changeType || 'neutral',
      icon: Target,
      color: 'indigo'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
      orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
      red: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
      indigo: 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
    };
    return colors[color];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <BarChart2 className="w-5 h-5 mr-2 text-blue-600" />
          Métricas Principales
        </h3>
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
          <Activity className="w-3 h-3 mr-1" />
          Últimos 30 días
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={metric.label} className="p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${getColorClasses(metric.color)}`}>
                <metric.icon className="w-4 h-4" />
              </div>
              <div className={`flex items-center text-xs font-medium ${
                metric.changeType === 'positive' 
                  ? 'text-green-600 dark:text-green-400' 
                  : metric.changeType === 'negative'
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {metric.changeType === 'positive' ? (
                  <ArrowUp className="w-3 h-3 mr-1" />
                ) : metric.changeType === 'negative' ? (
                  <ArrowDown className="w-3 h-3 mr-1" />
                ) : null}
                {metric.change}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                {metric.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Widget de tráfico en tiempo real
 */
const RealtimeWidget = ({ data, loading }) => {
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      // El componente padre manejará la actualización
    }, 30000); // Actualizar cada 30 segundos

    return () => clearInterval(interval);
  }, [autoRefresh]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <Skeleton height={24} width={150} className="mb-4" />
        <div className="space-y-4">
          <Skeleton height={60} />
          <Skeleton height={100} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Activity className="w-5 h-5 mr-2 text-green-600" />
          Tráfico en Tiempo Real
        </h3>
        <button
          onClick={() => setAutoRefresh(!autoRefresh)}
          className={`flex items-center text-xs px-3 py-1 rounded-full transition-colors ${
            autoRefresh 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
          }`}
        >
          <RefreshCw className={`w-3 h-3 mr-1 ${autoRefresh ? 'animate-spin' : ''}`} />
          Auto-refresh
        </button>
      </div>

      {/* Usuarios activos */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {data?.activeUsers || 0}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          usuarios activos ahora
        </div>
      </div>

      {/* Top páginas */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Páginas más visitadas
        </h4>
        <div className="space-y-2">
          {data?.topPages?.slice(0, 4).map((page, index) => (
            <div key={page.page} className="flex items-center justify-between p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {page.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {page.page}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {page.users}
                </span>
                <div className="w-12 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(page.users / data.activeUsers) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dispositivos */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Dispositivos
        </h4>
        <div className="space-y-2">
          {data?.devices?.map((device, index) => {
            const Icon = device.device === 'Desktop' ? Monitor : 
                        device.device === 'Mobile' ? Smartphone : Tablet;
            return (
              <div key={device.device} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-900 dark:text-white">
                    {device.device}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {device.users}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ({device.percentage})
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/**
 * Widget de gráfico de tendencias
 */
const TrendChart = ({ data, loading, period = 30 }) => {
  const [chartType, setChartType] = useState('area');
  const [metric, setMetric] = useState('users');

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <Skeleton height={24} width={200} className="mb-4" />
        <Skeleton height={300} />
      </div>
    );
  }

  const chartData = data || [];
  
  const metricOptions = [
    { value: 'users', label: 'Usuarios', color: '#3b82f6' },
    { value: 'pageviews', label: 'Páginas Vistas', color: '#10b981' },
    { value: 'visits', label: 'Sesiones', color: '#8b5cf6' },
    { value: 'bounceRate', label: 'Tasa de Rebote', color: '#ef4444' }
  ];

  const currentMetric = metricOptions.find(m => m.value === metric);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">{data.dateLabel}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600 dark:text-gray-400">Usuarios:</span>
              <span className="text-xs font-medium text-gray-900 dark:text-white">{data.users.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600 dark:text-gray-400">Páginas:</span>
              <span className="text-xs font-medium text-gray-900 dark:text-white">{data.pageviews.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600 dark:text-gray-400">Sesiones:</span>
              <span className="text-xs font-medium text-gray-900 dark:text-white">{data.visits.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600 dark:text-gray-400">Rebote:</span>
              <span className="text-xs font-medium text-gray-900 dark:text-white">{data.bounceRate}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Tendencias ({period} días)
        </h3>
        <div className="flex items-center space-x-2">
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {metricOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
            <button
              onClick={() => setChartType('area')}
              className={`px-2 py-1 text-xs ${
                chartType === 'area' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Área
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-2 py-1 text-xs ${
                chartType === 'line' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Línea
            </button>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={currentMetric?.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={currentMetric?.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="dateLabel" 
                stroke="#6b7280" 
                fontSize={12}
                interval="preserveStartEnd"
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={metric}
                stroke={currentMetric?.color}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorMetric)"
              />
            </AreaChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="dateLabel" 
                stroke="#6b7280" 
                fontSize={12}
                interval="preserveStartEnd"
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={metric}
                stroke={currentMetric?.color}
                strokeWidth={3}
                dot={{ fill: currentMetric?.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: currentMetric?.color, strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

/**
 * Componente principal del widget de Analytics
 */
const AnalyticsWidget = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await analyticsService.getDashboardSummary();
      setDashboardData(data);
      setLastRefresh(new Date());
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching analytics data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Auto-refresh cada 5 minutos
  useEffect(() => {
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <p className="text-red-800 dark:text-red-200">
          Error cargando datos de Analytics: {error}
        </p>
        <button
          onClick={fetchData}
          className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
        >
          Intentar nuevamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con información de actualización */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Analytics Dashboard
        </h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Última actualización: {lastRefresh.toLocaleTimeString()}
          </span>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </button>
        </div>
      </div>

      {/* Grid de widgets */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Métricas principales - span completo en móvil */}
        <div className="xl:col-span-3">
          <MetricsOverviewWidget data={dashboardData?.metrics} loading={loading} />
        </div>

        {/* Tráfico en tiempo real */}
        <div>
          <RealtimeWidget data={dashboardData?.realtime} loading={loading} />
        </div>

        {/* Gráfico de tendencias */}
        <div className="xl:col-span-2">
          <TrendChart data={dashboardData?.historical} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWidget;
export { 
  MetricsOverviewWidget, 
  RealtimeWidget, 
  TrendChart
};