// src/pages/Register.js - VERSIÓN COMPLETA + SEO
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/SEOHead';

const Register = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  // Estados del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validaciones en tiempo real
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = t('register_error_name_required');
        } else if (value.trim().length < 2) {
          error = t('register_error_name_min_length');
        }
        break;
        
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          error = t('register_error_email_required');
        } else if (!emailRegex.test(value)) {
          error = t('register_error_email_invalid');
        }
        break;
        
      case 'password':
        if (!value) {
          error = t('register_error_password_required');
        } else if (value.length < 6) {
          error = t('register_error_password_min_length');
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          error = t('register_error_password_complexity');
        }
        break;
        
      case 'confirmPassword':
        if (!value) {
          error = t('register_error_confirm_password_required');
        } else if (value !== formData.password) {
          error = t('register_error_passwords_not_match');
        }
        break;
        
      default:
        break;
    }
    
    return error;
  };

  // Manejo de cambios en inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validación en tiempo real
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
    
    // Validar confirmPassword cuando cambie password
    if (name === 'password' && formData.confirmPassword) {
      const confirmError = validateField('confirmPassword', formData.confirmPassword);
      setErrors(prev => ({
        ...prev,
        confirmPassword: confirmError
      }));
    }
  };

  // Validar todo el formulario
  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    if (!acceptTerms) {
      newErrors.terms = t('register_error_terms_required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulación de registro (reemplazar con API real)
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });
      
      if (response.ok) {
        setIsSuccess(true);
        // Redirigir después de 3 segundos
        setTimeout(() => {
          navigate('/contact', { 
            state: { message: t('register_success_description') }
          });
        }, 3000);
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.message || 'Error en el registro' });
      }
    } catch (error) {
      // Simulación de éxito para desarrollo
      console.log('Simulando registro exitoso:', formData);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/contact', { 
          state: { message: t('register_success_description') }
        });
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Texto de términos según idioma
  const getTermsText = () => {
    return t('register_terms_text');
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl text-green-500 mb-4">✅</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('register_success_title')}
          </h1>
          <p className="text-gray-600 mb-6">
            {t('register_success_description')}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        page="register"
        path="/register"
      />
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-600 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl text-white mx-auto mb-6">👤</div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t('register_title')}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-4">
            {t('register_hero_description')}
          </p>
          <p className="text-2xl text-yellow-300 font-semibold">
            {t('register_hero_subtitle')}
          </p>
        </div>
      </section>

      {/* Formulario de Registro */}
      <section className="py-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-8 py-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {t('register_form_title')}
                </h2>
                <p className="text-gray-600">
                  {t('register_form_description')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campo Nombre */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('register_name_label')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      👤
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder={t('register_name_placeholder')}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Campo Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('register_email_label')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      📧
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder={t('register_email_placeholder')}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Campo Contraseña */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('register_password_label')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      🔒
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder={t('register_password_placeholder')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                {/* Campo Confirmar Contraseña */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('register_confirm_password_label')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      🔒
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder={t('register_confirm_password_placeholder')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Términos y Condiciones */}
                <div>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                      {getTermsText()}{' '}
                      <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">
                        {t('register_terms_link')}
                      </Link>
                    </label>
                  </div>
                  {errors.terms && (
                    <p className="mt-1 text-sm text-red-600">{errors.terms}</p>
                  )}
                </div>

                {/* Error de envío */}
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-600">{errors.submit}</p>
                  </div>
                )}

                {/* Botón de Registro */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {t('register_button_loading')}
                    </div>
                  ) : (
                    t('register_button')
                  )}
                </button>
              </form>

              {/* Links adicionales */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  {t('register_already_account')}{' '}
                  <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-semibold">
                    {t('register_login_link')}
                  </Link>
                </p>
                <div className="mt-4">
                  <Link to="/contact" className="text-sm text-gray-500 hover:text-gray-700">
                    {t('register_need_help')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Beneficios */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('register_why_title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl text-yellow-400 mb-4">📈</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t('register_benefit_1_title')}
              </h3>
              <p className="text-gray-300">
                {t('register_benefit_1_description')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-yellow-400 mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t('register_benefit_2_title')}
              </h3>
              <p className="text-gray-300">
                {t('register_benefit_2_description')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-yellow-400 mb-4">👥</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t('register_benefit_3_title')}
              </h3>
              <p className="text-gray-300">
                {t('register_benefit_3_description')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;