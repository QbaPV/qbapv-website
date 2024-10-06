// src/pages/Contact.js
import React, { useState } from 'react';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import empresaContact from '../assets/images/empresa-contact.jpg';
import SubmitButton from '../components/SubmitButton'; // Botón personalizado
import { ToastContainer, toast } from 'react-toastify'; // Importar toast
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'; // Importar hook para reCAPTCHA v3
import { FaUser, FaEnvelope, FaCommentDots, FaWhatsapp } from 'react-icons/fa'; // Importar los iconos
import { v4 as uuidv4 } from 'uuid'; // Para generar ID únicos
import '../styles/styles.css';
import '../styles/contact.css';
import 'react-toastify/dist/ReactToastify.css';

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
  const [submitted, setSubmitted] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha(); // Hook para reCAPTCHA v3

  // Validación en tiempo real para cada campo
  const validateField = (name, value) => {
    let newErrors = { ...errors };
    switch (name) {
      case 'user_local':
        if (!value) {
          newErrors.user_local = t('user_local_required');
        } else if (/@/.test(value)) {
          newErrors.user_local = t('email_invalid_char_local'); // Error cuando aparece la arroba (@)
        } else {
          newErrors.user_local = '';
        }
        break;
      case 'domain':
        if (!value) {
          newErrors.domain = t('domain_required');
        } else if (/[@!#$%^&*()_+=[\]{};':"\\|,.<>/?]+/.test(value)) {
          newErrors.domain = t('email_invalid_char_domain'); // Error cuando aparecen caracteres especiales
        } else {
          newErrors.domain = '';
        }
        break;
      case 'tld':
        if (!value) {
          newErrors.tld = t('tld_required');
        } else if (value.length < 2 || value.length > 3) {
          newErrors.tld = t('tld_invalid'); // Error si el TLD es muy corto o largo
        } else {
          newErrors.tld = '';
        }
        break;
      case 'phone':
        if (!/^[0-9]*$/.test(value)) {
          newErrors.phone = t('phone_invalid');
        } else {
          newErrors.phone = '';
        }
        break;
      case 'name':
        if (!value) {
          newErrors.name = t('name_required');
        } else {
          newErrors.name = '';
        }
        break;
      case 'message':
        if (!value) {
          newErrors.message = t('message_required');
        } else {
          newErrors.message = '';
        }
        break;
      default:
        break;
    }
    setErrors(newErrors); // Actualizar los errores
  };

  // Manejo de cambios en los campos (validación en tiempo real)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value); // Validar mientras el usuario escribe
  };

  // Validación final antes de enviar
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = t('name_required');
    }
    if (!formData.user_local || !formData.domain || !formData.tld) {
      newErrors.email = t('email_required');
    }
    if (!formData.message) {
      newErrors.message = t('message_required');
    }
    if (!/^[0-9]*$/.test(formData.phone)) {
      newErrors.phone = t('phone_invalid');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
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
      const email = `${formData.user_local}@${formData.domain}.${formData.tld}`;

      // Almacenar el correo del usuario con el ID en el backend
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/store-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: messageId,
          email: email, // El correo se arma con los tres campos y se almacena
        }),
      });

      // **Envío de correo personalizado desde `info@qbapv.com`**
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/send-personalized-reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email, // Correo del usuario
          subject: 'Seguimiento a tu consulta',
          message: `Gracias por tu consulta, ${formData.name}. Estaremos en contacto para más detalles.`
        })
      })
      .then(response => response.json())
      .then(data => console.log('Respuesta personalizada enviada:', data))
      .catch(error => console.error('Error enviando respuesta personalizada:', error));

      // **Envío de correo unidireccional desde `no-reply@qbapv.com`**
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/send-no-reply-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email, // Correo del usuario
          subject: 'Confirmación de tu consulta',
          message: 'Tu mensaje ha sido recibido correctamente. No es necesario responder a este correo.'
        })
      })
      .then(response => response.json())
      .then(data => console.log('Correo unidireccional enviado:', data))
      .catch(error => console.error('Error enviando correo unidireccional:', error));

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
    const email = `${formData.user_local}@${formData.domain}.${formData.tld}`;
    
    // Verificar qué datos se están enviando
    console.log({
      id: messageId,
      name: formData.name,
      message: formData.message,
      phone: formData.phone,
      email: email,
      recaptchaToken: recaptchaToken
    });
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/store-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: messageId,
            name: formData.name,
            message: formData.message,
            phone: formData.phone, // Incluimos el campo WhatsApp
            email: email, // Incluir email conformado
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
          user_local: '',
          domain: '',
          tld: '',
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
  
  // Renderizado del formulario con los errores en tiempo real debajo de cada campo
  return (
    <div className="px-6 py-12 bg-gradient-to-br from-[#626361] to-[#54606c] min-h-screen flex flex-col justify-center relative z-10 text-center p-12 mt-50">
      <h1 className="text-5xl bg-gradient-to-br from-[#626361] to-gray-600 font-bold text-gray-900 shadow-black mb-6 animate-fade-in tracking-tight shadow-lg text-center" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.7)' }}>
        {t('contact_us')}
      </h1>

      <div className="form-container grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-7xl px-4 animate-fade-in">
        {/* Contenedor para la imagen de la empresa */}
        <div className="company-image mt-20 items-center justify-center transform min-h-[200px] transition duration-300 hover:scale-105 shadow-lg shadow-black rounded-lg bg-gradient-to-br from-gray-200 to-gray-300">
          <img
            src={empresaContact}
            alt="Nuestra Empresa"
            className="w-full h-full rounded-lg shadow-lg"
          />
        </div>

        {/* Contenedor específico para el formulario */}
        <div className="form-container mt-20 items-center justify-center transform min-h-[200px] transition duration-300 hover:scale-105 shadow-lg shadow-black rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 p-6">
          <p className="font-bold mb-6">{t('Contact_description_1')}</p>
          <form noValidate>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                  
              {/* Campo Nombre */}
              <div className="relative mt-10">
                <label htmlFor="name" className="sr-only">{t('name')}</label>
                <FaUser className="absolute left-3 top-3 text-gray-400" /> {/* Ícono de usuario */}
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border-2 p-2 pl-10 rounded-md w-full focus:outline-none focus:border-blue-500"
                  placeholder={t('name')} // Traducción para "Nombre completo"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              {/* Campo WhatsApp */}
              <div className="relative mt-10">
                <label htmlFor="phone" className="sr-only">{t('whatsapp')}</label>
                <FaWhatsapp className="absolute left-3 top-3 text-gray-400" /> {/* Ícono de WhatsApp */}
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border-2 p-2 pl-10 rounded-md w-full focus:outline-none focus:border-blue-500"
                  placeholder={t('whatsapp')} // Placeholder de WhatsApp
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
            </div>

              {/* Campo Email */}
              <div className="grid grid-cols-12 items-center mt-8 gap-2">
                <div className="relative col-span-4">
                  <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    id="user_local"
                    name="user_local"
                    value={formData.user_local}
                    onChange={handleChange}
                    className="border-2 p-2 pl-10 rounded-md w-full focus:outline-none focus:border-blue-500"
                    placeholder={t('user_local')} // Usuario o nombre local
                  />
                  {errors.user_local && <p className="text-red-500 text-sm">{errors.user_local}</p>}
                </div>
                <div className="font-bold col-span-1 text-center text-black">@</div>
                <div className="relative col-span-3">
                  <input
                    type="text"
                    id="domain"
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    className="border-2 p-2 pl-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                    placeholder={t('domain')} // Dominio
                  />
                  {errors.domain && <p className="text-red-500 text-sm">{errors.domain}</p>}
                </div>
                <div className="font-bold col-span-1 text-center text-black">.</div>
                <div className="relative col-span-2">
                  <input
                    type="text"
                    id="tld"
                    name="tld"
                    value={formData.tld}
                    onChange={handleChange}
                    className="border-2 p-2 pl-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                    placeholder={t('tld')} // Ejemplo de TLD (COM, ES, etc.)
                  />
                  {errors.tld && <p className="text-red-500 text-sm">{errors.tld}</p>}
                </div>
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              {/* Campo Mensaje */}
              <div className="relative mt-8 mb-8">
                <label htmlFor="message" className="sr-only">{t('message')}</label>
                <FaCommentDots className="absolute left-3 top-3 text-gray-400" /> {/* Ícono de mensaje */}
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="border-2 p-2 pl-10 rounded-md w-full focus:outline-none focus:border-blue-500"
                  placeholder={t('message')} // Placeholder para el campo de mensaje
                />
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              </div>

              {/* Botón Enviar */}
              <SubmitButton onClick={handleCustomSubmit}>
                {t('submit')}
              </SubmitButton>
          </form>
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
