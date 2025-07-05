import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Estados posibles de autenticación
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  UPDATE_USER: 'UPDATE_USER'
};

// Estado inicial
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

// Reducer para manejar las acciones de autenticación
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload.error
      };
    
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...initialState
      };
    
    case AUTH_ACTIONS.REFRESH_TOKEN:
      return {
        ...state,
        token: action.payload.token
      };
    
    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload.user }
      };
    
    default:
      return state;
  }
};

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Simular API calls (en implementación real serían llamadas HTTP)
  const apiService = {
    login: async (credentials) => {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validación simple para demo
      if (credentials.username === 'admin' && credentials.password === 'qbapv2025') {
        const mockUser = {
          id: 1,
          username: 'admin',
          email: 'admin@qbapv.com',
          role: 'super_admin',
          name: 'QbaPV Administrator',
          avatar: null,
          permissions: ['all'],
          lastLogin: new Date().toISOString()
        };
        
        const mockToken = `jwt-token-${Date.now()}`;
        
        return { user: mockUser, token: mockToken };
      } else {
        throw new Error('Credenciales inválidas');
      }
    },
    
    refreshToken: async (currentToken) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { token: `refreshed-${currentToken}-${Date.now()}` };
    },
    
    logout: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { success: true };
    },
    
    validateToken: async (token) => {
      await new Promise(resolve => setTimeout(resolve, 200));
      // Simular validación de token
      return token && token.startsWith('jwt-token');
    }
  };

  // Funciones del contexto
  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      const response = await apiService.login(credentials);
      
      // Guardar en localStorage
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: response
      });
      
      return response;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: { error: error.message }
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Error durante logout:', error);
    } finally {
      // Limpiar localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  const refreshToken = async () => {
    try {
      const response = await apiService.refreshToken(state.token);
      
      localStorage.setItem('authToken', response.token);
      
      dispatch({
        type: AUTH_ACTIONS.REFRESH_TOKEN,
        payload: response
      });
      
      return response.token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout(); // Si falla el refresh, cerrar sesión
    }
  };

  const updateUser = (userData) => {
    const updatedUser = { ...state.user, ...userData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    dispatch({
      type: AUTH_ACTIONS.UPDATE_USER,
      payload: { user: userData }
    });
  };

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          const isValid = await apiService.validateToken(token);
          
          if (isValid) {
            dispatch({
              type: AUTH_ACTIONS.LOGIN_SUCCESS,
              payload: {
                token,
                user: JSON.parse(userData)
              }
            });
          } else {
            // Token inválido, limpiar
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Error validating token:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      }
    };

    checkAuth();
  }, []);

  // Auto-refresh token cada 55 minutos (si el token expira en 1 hora)
  useEffect(() => {
    if (state.isAuthenticated && state.token) {
      const refreshInterval = setInterval(() => {
        refreshToken();
      }, 55 * 60 * 1000); // 55 minutos

      return () => clearInterval(refreshInterval);
    }
  }, [state.isAuthenticated, state.token]);

  // Valor del contexto
  const contextValue = {
    // Estado
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    
    // Funciones
    login,
    logout,
    refreshToken,
    updateUser,
    
    // Helpers
    hasPermission: (permission) => {
      return state.user?.permissions?.includes('all') || 
             state.user?.permissions?.includes(permission);
    },
    
    isAdmin: () => {
      return state.user?.role === 'super_admin' || state.user?.role === 'admin';
    },
    
    getUserName: () => {
      return state.user?.name || state.user?.username || 'Usuario';
    },
    
    getAvatar: () => {
      return state.user?.avatar || null;
    }
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Componente para proteger rutas
export const ProtectedRoute = ({ children, requiredPermission = null }) => {
  const { isAuthenticated, isLoading, hasPermission } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginRequired />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <AccessDenied />;
  }

  return children;
};

// Componente para mostrar cuando se requiere login
const LoginRequired = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Acceso Restringido</h2>
          <p className="text-gray-300 mb-6">
            Necesitas iniciar sesión para acceder al panel de administración.
          </p>
          <button 
            onClick={() => window.location.href = '/admin/login'}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Ir al Login
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente para mostrar cuando no hay permisos
const AccessDenied = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Acceso Denegado</h2>
          <p className="text-gray-300 mb-4">
            No tienes permisos suficientes para acceder a esta sección.
          </p>
          <p className="text-sm text-gray-400 mb-6">
            Usuario actual: <span className="font-medium">{user?.name}</span>
          </p>
          <button 
            onClick={() => window.location.href = '/admin/dashboard'}
            className="w-full py-3 px-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium rounded-lg transition-all duration-200"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthContext;
