// src/services/analyticsService.js
// Servicio para integración con Google Analytics 4

import { format, subDays, parseISO } from 'date-fns';

/**
 * Configuración de Google Analytics 4
 * Usando la configuración ya existente del proyecto
 */
const GA_CONFIG = {
  measurementId: 'G-QBPV2024WEB', // Ya configurado en el proyecto
  apiEndpoint: '/api/analytics', // Endpoint backend para datos seguros
  cache: {
    duration: 5 * 60 * 1000, // 5 minutos
    storage: new Map()
  }
};

/**
 * Simulador de datos realistas basados en GA4
 * Para desarrollo y testing antes de conectar API real
 */
class AnalyticsSimulator {
  generateRealtimeData() {
    const baseUsers = 42;
    const variation = Math.floor(Math.random() * 20) - 10;
    const activeUsers = Math.max(1, baseUsers + variation);
    
    return {
      activeUsers,
      topPages: [
        { page: '/', users: Math.floor(activeUsers * 0.4), title: 'Inicio' },
        { page: '/projects', users: Math.floor(activeUsers * 0.25), title: 'Proyectos' },
        { page: '/blog', users: Math.floor(activeUsers * 0.15), title: 'Blog' },
        { page: '/contact', users: Math.floor(activeUsers * 0.12), title: 'Contacto' },
        { page: '/about', users: Math.floor(activeUsers * 0.08), title: 'Acerca de' }
      ],
      countries: [
        { country: 'España', users: Math.floor(activeUsers * 0.35), code: 'ES' },
        { country: 'México', users: Math.floor(activeUsers * 0.20), code: 'MX' },
        { country: 'Argentina', users: Math.floor(activeUsers * 0.15), code: 'AR' },
        { country: 'Colombia', users: Math.floor(activeUsers * 0.12), code: 'CO' },
        { country: 'Chile', users: Math.floor(activeUsers * 0.10), code: 'CL' },
        { country: 'Otros', users: Math.floor(activeUsers * 0.08), code: 'XX' }
      ],
      devices: [
        { device: 'Desktop', users: Math.floor(activeUsers * 0.55), percentage: '55%' },
        { device: 'Mobile', users: Math.floor(activeUsers * 0.35), percentage: '35%' },
        { device: 'Tablet', users: Math.floor(activeUsers * 0.10), percentage: '10%' }
      ]
    };
  }

  generateTimeSeriesData(days = 30) {
    const data = [];
    const baseVisits = 1200;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dayOfWeek = date.getDay();
      
      // Simular menos tráfico en fines de semana
      const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.7 : 1;
      
      // Variación aleatoria realista
      const randomFactor = 0.8 + Math.random() * 0.4;
      
      // Tendencia de crecimiento gradual
      const growthFactor = 1 + (days - i) * 0.001;
      
      const visits = Math.floor(baseVisits * weekendFactor * randomFactor * growthFactor);
      const users = Math.floor(visits * 0.75); // Ratio users/sessions típico
      const pageviews = Math.floor(visits * 2.3); // Páginas por sesión
      const bounceRate = 25 + Math.random() * 15; // Entre 25-40%
      
      data.push({
        date: format(date, 'yyyy-MM-dd'),
        dateLabel: format(date, 'MMM dd'),
        visits,
        users,
        pageviews,
        bounceRate: Math.round(bounceRate * 10) / 10,
        avgSessionDuration: Math.floor(120 + Math.random() * 180), // 2-5 minutos
        conversions: Math.floor(visits * 0.03 * Math.random()) // ~3% conversion rate
      });
    }
    
    return data;
  }

  generateConversionData() {
    return {
      goals: [
        { name: 'Registro Newsletter', completions: 156, rate: '4.2%', value: 2340 },
        { name: 'Contacto Enviado', completions: 89, rate: '2.4%', value: 1780 },
        { name: 'Proyecto Visto', completions: 234, rate: '6.3%', value: 890 },
        { name: 'Blog Leído', completions: 445, rate: '12.1%', value: 445 }
      ],
      funnel: [
        { step: 'Visitantes', users: 3724, percentage: 100 },
        { step: 'Página Vista', users: 2896, percentage: 77.8 },
        { step: 'Interacción', users: 1245, percentage: 33.4 },
        { step: 'Conversión', users: 156, percentage: 4.2 }
      ]
    };
  }

  generateTopContent() {
    return {
      pages: [
        { 
          path: '/', 
          title: 'Inicio - QbaPV', 
          pageviews: 5642, 
          uniquePageviews: 4523, 
          avgTimeOnPage: '2:34',
          bounceRate: '28.5%',
          exitRate: '35.2%'
        },
        { 
          path: '/projects', 
          title: 'Proyectos - Portfolio', 
          pageviews: 3456, 
          uniquePageviews: 2890, 
          avgTimeOnPage: '3:12',
          bounceRate: '22.1%',
          exitRate: '45.8%'
        },
        { 
          path: '/blog', 
          title: 'Blog - Artículos', 
          pageviews: 2234, 
          uniquePageviews: 1987, 
          avgTimeOnPage: '4:45',
          bounceRate: '18.3%',
          exitRate: '52.1%'
        },
        { 
          path: '/projects/forex', 
          title: 'Proyecto Forex - Detalles', 
          pageviews: 1876, 
          uniquePageviews: 1654, 
          avgTimeOnPage: '5:23',
          bounceRate: '15.7%',
          exitRate: '38.9%'
        },
        { 
          path: '/contact', 
          title: 'Contacto - QbaPV', 
          pageviews: 987, 
          uniquePageviews: 876, 
          avgTimeOnPage: '1:56',
          bounceRate: '34.2%',
          exitRate: '67.8%'
        }
      ],
      blogPosts: [
        {
          title: 'Cómo Automatizar Trading con Python',
          url: '/blog/automatizar-trading-python',
          pageviews: 1245,
          shares: 89,
          avgReadTime: '6:34',
          engagementRate: '78.5%'
        },
        {
          title: 'Estrategias de Forex para Principiantes',
          url: '/blog/forex-principiantes',
          pageviews: 987,
          shares: 67,
          avgReadTime: '5:12',
          engagementRate: '72.1%'
        },
        {
          title: 'Análisis Técnico vs Fundamental',
          url: '/blog/analisis-tecnico-fundamental',
          pageviews: 756,
          shares: 45,
          avgReadTime: '4:56',
          engagementRate: '69.3%'
        }
      ]
    };
  }
}

/**
 * Servicio principal de Analytics
 */
class AnalyticsService {
  constructor() {
    this.simulator = new AnalyticsSimulator();
    this.cache = GA_CONFIG.cache;
  }

  /**
   * Obtener datos del cache si están disponibles y no han expirado
   */
  getCachedData(key) {
    const cached = this.cache.storage.get(key);
    if (cached && Date.now() - cached.timestamp < this.cache.duration) {
      return cached.data;
    }
    return null;
  }

  /**
   * Guardar datos en cache
   */
  setCachedData(key, data) {
    this.cache.storage.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Obtener métricas principales del dashboard
   */
  async getDashboardMetrics() {
    const cacheKey = 'dashboard-metrics';
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const data = {
        users: {
          total: 2845,
          change: '+12%',
          changeType: 'positive',
          previousPeriod: 2540
        },
        pageviews: {
          total: 18249,
          change: '+5.4%',
          changeType: 'positive',
          previousPeriod: 17315
        },
        sessions: {
          total: 12456,
          change: '+8.7%',
          changeType: 'positive',
          previousPeriod: 11456
        },
        bounceRate: {
          total: '32.1%',
          change: '-2.3%',
          changeType: 'positive',
          previousPeriod: '34.4%'
        },
        avgSessionDuration: {
          total: '3:24',
          change: '+15%',
          changeType: 'positive',
          previousPeriod: '2:58'
        },
        conversions: {
          total: 156,
          change: '+23%',
          changeType: 'positive',
          previousPeriod: 127
        }
      };

      this.setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching dashboard metrics:', error);
      throw new Error('Failed to fetch analytics data');
    }
  }

  /**
   * Obtener datos en tiempo real
   */
  async getRealtimeData() {
    const cacheKey = 'realtime-data';
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      // Para datos en tiempo real, usar cache más corto (30 segundos)
      const realtimeCached = this.cache.storage.get(cacheKey);
      if (realtimeCached && Date.now() - realtimeCached.timestamp < 30000) {
        return realtimeCached.data;
      }

      await new Promise(resolve => setTimeout(resolve, 200));
      
      const data = this.simulator.generateRealtimeData();
      
      this.cache.storage.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      
      return data;
    } catch (error) {
      console.error('Error fetching realtime data:', error);
      throw new Error('Failed to fetch realtime data');
    }
  }

  /**
   * Obtener datos históricos para gráficos
   */
  async getHistoricalData(period = 30) {
    const cacheKey = `historical-data-${period}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const data = this.simulator.generateTimeSeriesData(period);
      
      this.setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw new Error('Failed to fetch historical data');
    }
  }

  /**
   * Obtener datos de conversiones y objetivos
   */
  async getConversionData() {
    const cacheKey = 'conversion-data';
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const data = this.simulator.generateConversionData();
      
      this.setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching conversion data:', error);
      throw new Error('Failed to fetch conversion data');
    }
  }

  /**
   * Obtener contenido más popular
   */
  async getTopContent() {
    const cacheKey = 'top-content';
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const data = this.simulator.generateTopContent();
      
      this.setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching top content:', error);
      throw new Error('Failed to fetch top content data');
    }
  }

  /**
   * Obtener resumen completo para el dashboard
   */
  async getDashboardSummary() {
    try {
      const [metrics, realtime, historical, conversions, topContent] = await Promise.all([
        this.getDashboardMetrics(),
        this.getRealtimeData(),
        this.getHistoricalData(30),
        this.getConversionData(),
        this.getTopContent()
      ]);

      return {
        metrics,
        realtime,
        historical,
        conversions,
        topContent,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching dashboard summary:', error);
      throw new Error('Failed to fetch complete dashboard data');
    }
  }

  /**
   * Limpiar cache (útil para testing)
   */
  clearCache() {
    this.cache.storage.clear();
  }

  /**
   * Configurar autenticación para GA4 API real
   * (Para implementación futura con datos reales)
   */
  async authenticateGA4(credentials) {
    // TODO: Implementar autenticación real con Google Analytics 4
    console.log('GA4 Authentication will be implemented in production');
    return true;
  }
}

// Instancia singleton del servicio
const analyticsService = new AnalyticsService();

export default analyticsService;

// Exportar también para testing
export { AnalyticsService, AnalyticsSimulator };