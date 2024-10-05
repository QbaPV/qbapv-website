import React, { useState } from 'react';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import empresaContact from '../assets/images/empresa-contact.jpg';
import SubmitButton from '../components/SubmitButton'; // Botón personalizado
import { ToastContainer, toast } from 'react-toastify'; // Importar toast
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'; // Importar hook para reCAPTCHA v3
import { FaUser, FaCommentDots, FaWhatsapp } from 'react-icons/fa'; // Importar los iconos
import { v4 as uuidv4 } from 'uuid'; // Para generar ID únicos
import '../styles/styles.css';
import '../styles/contact.css';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    emailPart1: '', // Parte del correo antes de @
    emailPart2: '', // Dominio del correo después de @
    emailPart3: '', // TLD (e.g., .com, .es)
    message: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha(); // Hook para reCAPTCHA v3

  // Manejo de cambios en los campos (validación en tiempo real)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value); // Validar mientras el usuario escribe
  };

  // Validación en tiempo real para cada campo
  const validateField = (name, value) => {
    let newErrors = { ...errors };
    switch (name) {
      case 'name':
        newErrors.name = value ? '' : t('name_required');
        break;
      case 'emailPart1':
      case 'emailPart2':
      case 'emailPart3':
        if (!formData.emailPart1 || !formData.emailPart2 || !formData.emailPart3) {
          newErrors.email = t('email_invalid');
        } else {
          newErrors.email = '';
        }
        break;
      case 'message':
        newErrors.message = value ? '' : t('message_required');
        break;
      case 'phone':
        newErrors.phone = /^[0-9]*$/.test(value) ? '' : t('phone_invalid'); // Acepta solo números
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  // Validación final antes de enviar
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = t('name_required');
    }
    if (!formData.emailPart1 || !formData.emailPart2 || !formData.emailPart3) {
      newErrors.email = t('email_invalid');
    }
    if (!formData.message) {
      newErrors.message = t('message_required');
    }
    if (!/^[0-9]*$/.test(formData.phone)) {
      newErrors.phone = t('phone_invalid');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo del submit con el botón personalizado
  const handleCustomSubmit = async (e) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.error("reCAPTCHA no está listo");
      return;
    }

    // Obtener el token de reCAPTCHA v3
    const recaptchaToken = await executeRecaptcha('contactFormSubmit');
    console.log('reCAPTCHA Token:', recaptchaToken);

    if (!recaptchaToken) {
      console.error("No se pudo obtener el token de reCAPTCHA");
      return;
    }

    if (validateForm()) {
      console.log('Formulario enviado:', formData);

      // Generar un ID único para el mensaje y el correo
      const messageId = uuidv4();

      // Armar el correo completo desde las tres partes
      const completeEmail = `${formData.emailPart1}@${formData.emailPart2}.${formData.emailPart3}`;

      // Almacenar el correo del usuario con el ID en el backend
      await fetch('http://143.198.52.139:5000/store-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: messageId,
          email: completeEmail, // El correo se arma aquí
        }),
      });

      // Enviar los datos del formulario a Mailgun, pero sin el correo del usuario
      sendFormData(recaptchaToken, messageId);
    } else {
      // Mostrar los errores
      Object.values(errors).forEach((error) => {
        if (error) {
          toast.error(error, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    }
  };

  // Función sendFormData para enviar los datos del formulario sin el correo
  const sendFormData = async (recaptchaToken, messageId) => {
    try {
      const response = await fetch('http://143.198.52.139:5000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: messageId,
            name: formData.name,
            message: formData.message,
            recaptchaToken: recaptchaToken, // Envía el token al backend
        }),
      });

      const result = await response.json();
      console.log("Respuesta del servidor:", result);

      if (response.ok) {
        toast.success("Mensaje enviado correctamente", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFormData({ // Limpiar el formulario
          name: '',
          emailPart1: '',
          emailPart2: '',
          emailPart3: '',
          message: '',
          phone: '',
        });
        setSubmitted(true);
      } else {
        toast.error("Error enviando el correo: " + result.error, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast.error("Error enviando el correo", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="px-6 py-12 bg-gradient-to-br from-[#626361] to-[#54606c] min-h-screen flex flex-col justify-center relative z-10 text-center p-12 mt-50">
      <h1 className="text-5xl bg-gradient-to-br from-[#626361] to-gray-600 font-bold text-gray-900 shadow-black mb-6 animate-fade-in tracking-tight shadow-lg text-center" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.7)' }}>
        {t('contact_us')}
      </h1>

      {/* Contenedor general para la página de contacto */}
      <div className="contact-container">
        <div className="contact-form-section">
          
          {/* Contenedor para la imagen de la empresa */}
          <div className="company-image">
            <img
              src={empresaContact}
              alt="Nuestra Empresa"
              className="w-full h-auto rounded-lg shadow-lg shadow-lg shadow-black animate-fade-in"
            />
          </div>

          {/* Contenedor específico para el formulario */}
          <div className="items-center align-items-center justify-space-around display-flex transform min-h-[400px] transition duration-300 hover:scale-105 gap-8 shadow-lg shadow-black rounded-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-200 to-gray-300 animate-fade-in">
            <p className="font-bold mt-6">{t('Contact_description_1')}</p>
            <form noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {/* Campo Nombre */}
                <div className="form-group mt-20 relative">
                  <label htmlFor="name" className="sr-only">{t('name')}</label>
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-2 p-2 pl-12 rounded-md w-full focus:outline-none focus:border-blue-500"
                    placeholder={formData.name ? '' : t('name')}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* Campo WhatsApp */}
                <div className="form-group mt-20 relative">
                  <label htmlFor="phone" className="sr-only">{t('whatsapp')}</label>
                  <FaWhatsapp className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border-2 p-2 pl-12 rounded-md w-full focus:outline-none focus:border-blue-500"
                    placeholder={formData.phone ? '' : t('whatsapp')}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
              </div>

              {/* Campos Email divididos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {/* Parte 1 del Email */}
                <div className="form-group relative">
                  <label htmlFor="emailPart1" className="sr-only">{t('email')}</label>
                  <input
                    type="text"
                    id="emailPart1"
                    name="emailPart1"
                    value={formData.emailPart1}
                    onChange={handleChange}
                    className="border-2 p-2 pl-12 rounded-md w-full focus:outline-none focus:border-blue-500"
                    placeholder={formData.emailPart1 ? '' : t('email')}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* Parte 2 del Email */}
                <div className="form-group relative">
                  <label htmlFor="emailPart2" className="sr-only">{t('domain')}</label>
                  <input
                    type="text"
                    id="emailPart2"
                    name="emailPart2"
                    value={formData.emailPart2}
                    onChange={handleChange}
                    className="border-2 p-2 pl-12 rounded-md w-full focus:outline-none focus:border-blue-500"
                    placeholder={formData.emailPart2 ? '' : t('domain')}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* Parte 3 del Email */}
                <div className="form-group relative">
                  <label htmlFor="emailPart3" className="sr-only">{t('tld')}</label>
                  <input
                    type="text"
                    id="emailPart3"
                    name="emailPart3"
                    value={formData.emailPart3}
                    onChange={handleChange}
                    className="border-2 p-2 pl-12 rounded-md w-full focus:outline-none focus:border-blue-500"
                    placeholder={formData.emailPart3 ? '' : t('tld')}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
              </div>

              {/* Campo Mensaje */}
              <div className="form-group mt-8 relative">
                <label htmlFor="message" className="sr-only">{t('message')}</label>
                <FaCommentDots className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="border-2 p-2 pl-12 rounded-md w-full focus:outline-none focus:border-blue-500"
                  placeholder={formData.message ? '' : t('message')}
                  style={{ paddingLeft: '2.5rem' }}
                />
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              </div>

              {/* Botón Enviar personalizado */}
              <SubmitButton 
                onClick={handleCustomSubmit}>
                {t('submit')}
              </SubmitButton>
            </form>
          </div>
        </div>
      </div>

      {/* Contenedor sitio de oficinas */}
      <div className="bg-gradient-to-br from-gray-200 to-[#54606c] py-10 mt-20 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fade-in">
            {/* Sección de datos */}
            <div className="location-info text-left p-4">
              <h3 className="text-4xl font-bold text-center text-gray-700 mb-4 w-full h-auto rounded-sm shadow-lg shadow-black animate-fade-in">{t('our_location')}</h3>
              <p className="text-gray-600 mb-2 mt-8">
                Carrer del Telègraf, 18<br />
                Horta-Guinardó, 08041<br />
                Barcelona, {t('spain')}
              </p>
              <p className="text-gray-600">
                <strong>{t('whatsapp')}:</strong> +34 (632) 40-53-79<br />
                <strong>{t('email_label')}:</strong> contact@example.com
              </p>
            </div>

            {/* Sección del mapa */}
            <div className="map-container flex justify-center animate-fade-in">
              <iframe
                className="w-full h-auto rounded-lg shadow-lg shadow-lg shadow-black animate-fade-in"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.271368219243!2d2.1660172158222736!3d41.4217981792607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a499b97b55f66d%3A0x47b6872a683e8b07!2sCarrer%20del%20Tel%C3%A8graf%2C%2018%2C%2008041%20Barcelona%2C%20Espa%C3%B1a!5e0!3m2!1ses!2sus!4v1695998434321!5m2!1ses!2sus"
                width="600"
                height="400"
                style={{ border: 0, borderRadius: '10px' }}
                allowFullScreen=""
                loading="lazy">
              </iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Componente ToastContainer para los mensajes personalizados */}
      <ToastContainer />
    </div>
  );
};

export default Contact;
