// src/pages/Contact.js - VERSIÓN MODERNA Y OPTIMIZADA
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { 
  FaUser, 
  FaEnvelope, 
  FaCommentDots, 
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaPaperPlane,
  FaCheckCircle
} from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import empresaContact from '../assets/images/empresa-contact.jpg';
import SubmitButton from '../components/SubmitButton';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    user_local: '',
    domain: '',
    tld: '',
    message: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});

  // Detectar si estamos en desarrollo
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                       window.location.hostname === 'localhost';

  // Intersection Observer para animaciones
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  // Validación en tiempo real para cada campo
  const validateField = (name, value) => {
    let newErrors = { ...errors };
    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = t('name_required');
        } else {
          delete newErrors.name;
        }
        break;
      case 'user_local':
        if (!value) {
          newErrors.user_local = t('user_local_required');
        } else if (/@/.test(value)) {
          newErrors.user_local = t('email_invalid_char_local');
        } else {
          delete newErrors.user_local;
        }
        break;
      case 'domain':
        if (!value) {
          newErrors.domain = t('domain_required');
        } else if (/[@!#$%^&*()_+=[\]{};':"\\|,.<>/?]+/.test(value)) {
          newErrors.domain = t('email_invalid_char_domain');
        } else {
          delete newErrors.domain;
        }
        break;
      case 'tld':
        if (!value) {
          newErrors.tld = t('tld_required');
        } else if (value.length < 2 || value.length > 6) {
          newErrors.tld = t('tld_invalid');
        } else {
          delete newErrors.tld;
        }
        break;
      case 'phone':
        if (value && !/^[+]?[0-9\s-]*$/.test(value)) {
          newErrors.phone = t('phone_invalid');
        } else {
          delete newErrors.phone;
        }
        break;
      case 'message':
        if (!value.trim()) {
          newErrors.message = t('message_required');
        } else {
          delete newErrors.message;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  // Manejo de cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  // Validación final antes de enviar
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('name_required');
    }
    
    if (!formData.user_local || !formData.domain || !formData.tld) {
      newErrors.email = t('email_required');
    }
    
    // Validar formato de email completo
    const email = `${formData.user_local}@${formData.domain}.${formData.tld}`;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.user_local && formData.domain && formData.tld && !emailRegex.test(email)) {
      newErrors.email = t('email_invalid');
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('message_required');
    }
    
    if (formData.phone && !/^[+]?[0-9\s-]*$/.test(formData.phone)) {
      newErrors.phone = t('phone_invalid');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo del submit
  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Mostrar el primer error encontrado
      const firstError = Object.values(errors)[0];
      if (firstError) {
        toast.error(firstError);
      }
      return;
    }

    setIsSubmitting(true);
    const messageId = uuidv4();
    const email = `${formData.user_local}@${formData.domain}.${formData.tld}`;

    try {
      // Simulación de envío en desarrollo
      if (isDevelopment) {
        console.log('📧 Simulación de envío (desarrollo):', {
          id: messageId,
          name: formData.name,
          email: email,
          phone: formData.phone,
          message: formData.message
        });
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast.success(t('message_success'));
        setSubmitted(true);
        setFormData({
          name: '',
          user_local: '',
          domain: '',
          tld: '',
          message: '',
          phone: '',
        });
      } else {
        // Envío real en producción
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: messageId,
            name: formData.name,
            email: email,
            phone: formData.phone,
            message: formData.message,
          }),
        });

        if (response.ok) {
          toast.success(t('message_success'));
          setSubmitted(true);
          setFormData({
            name: '',
            user_local: '',
            domain: '',
            tld: '',
            message: '',
            phone: '',
          });
        } else {
          throw new Error('Error al enviar el mensaje');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al enviar el mensaje. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Información de contacto
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: t('footer_contact_info'),
      content: ['Carrer del Telègraf, 18', 'Horta-Guinardó, 08041', `Barcelona, ${t('spain')}`]
    },
    {
      icon: <FaWhatsapp />,
      title: t('whatsapp'),
      content: ['+34 (632) 40-53-79']
    },
    {
      icon: <FaEnvelope />,
      title: t('email_label'),
      content: ['info@qbapv.com']
    },
    {
      icon: <FaClock />,
      title: t('schedule'),
      content: ['Lun - Vie: 9:00 - 18:00', 'Sáb: 10:00 - 14:00']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            {t('contact_us')}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            {t('Contact_description_1')}
          </p>
        </div>
      </section>

      {/* Formulario y Imagen */}
      <section 
        id="contact-form"
        ref={setRef('contact-form')}
        className={`py-20 transition-all duration-1000 ${
          visibleSections['contact-form'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Imagen de la empresa */}
            <div className="order-2 lg:order-1">
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg transform rotate-3"></div>
                <img
                  src={empresaContact}
                  alt="Nuestra Empresa"
                  className="relative w-full h-full object-cover rounded-lg shadow-2xl transform hover:rotate-0 transition-transform duration-500 min-h-[500px]"
                />
              </div>
            </div>

            {/* Formulario */}
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-lg shadow-xl p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('message_sent_title')}</h3>
                    <p className="text-gray-600 mb-6">{t('message_sent_description')}</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {t('send_another_message')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCustomSubmit} noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Campo Nombre */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          {t('name')}
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder={t('name')}
                          />
                        </div>
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                      </div>

                      {/* Campo WhatsApp */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          {t('whatsapp')} (Opcional)
                        </label>
                        <div className="relative">
                          <FaWhatsapp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.phone ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="+34 632 405 379"
                          />
                        </div>
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Campo Email */}
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('email_label')}
                      </label>
                      <div className="grid grid-cols-12 gap-2 items-start">
                        <div className="col-span-4">
                          <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              id="user_local"
                              name="user_local"
                              value={formData.user_local}
                              onChange={handleChange}
                              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.user_local || errors.email ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder={t('user_local')}
                            />
                          </div>
                          {errors.user_local && <p className="mt-1 text-sm text-red-600">{errors.user_local}</p>}
                        </div>
                        <div className="col-span-1 text-center text-gray-600 font-bold pt-2">@</div>
                        <div className="col-span-3">
                          <input
                            type="text"
                            id="domain"
                            name="domain"
                            value={formData.domain}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.domain || errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder={t('domain')}
                          />
                          {errors.domain && <p className="mt-1 text-sm text-red-600">{errors.domain}</p>}
                        </div>
                        <div className="col-span-1 text-center text-gray-600 font-bold pt-2">.</div>
                        <div className="col-span-3">
                          <input
                            type="text"
                            id="tld"
                            name="tld"
                            value={formData.tld}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                              errors.tld || errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder={t('tld')}
                            style={{ fontSize: '0.875rem' }}
                          />
                          {errors.tld && <p className="mt-1 text-sm text-red-600">{errors.tld}</p>}
                        </div>
                      </div>
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    {/* Campo Mensaje */}
                    <div className="mt-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('message')}
                      </label>
                      <div className="relative">
                        <FaCommentDots className="absolute left-3 top-3 text-gray-400" />
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="4"
                          className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                            errors.message ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder={t('message')}
                        />
                      </div>
                      {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                    </div>

                    {/* Botón Enviar */}
                    <div className="mt-8">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {t('sending')}
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="mr-2" />
                            {t('submit')}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Información de Contacto */}
      <section 
        id="contact-info"
        ref={setRef('contact-info')}
        className={`py-20 bg-gray-50 transition-all duration-1000 ${
          visibleSections['contact-info'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('footer_contact_info')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl text-blue-600 mb-4 flex justify-center">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {info.title}
                </h3>
                {info.content.map((line, idx) => (
                  <p key={idx} className="text-gray-600">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section 
        id="map"
        ref={setRef('map')}
        className={`py-20 transition-all duration-1000 ${
          visibleSections['map'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('our_location')}
          </h2>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.271368219243!2d2.1660172158222736!3d41.4217981792607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a499b97b55f66d%3A0x47b6872a683e8b07!2sCarrer%20del%20Tel%C3%A8graf%2C%2018%2C%2008041%20Barcelona%2C%20Espa%C3%B1a!5e0!3m2!1ses!2sus!4v1695998434321!5m2!1ses!2sus"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;