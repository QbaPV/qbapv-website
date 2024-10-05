// src/pages/AdminEmail.js
import React, { useState } from 'react';
import '../styles/styles.css';

const AdminEmail = () => {
  const [formData, setFormData] = useState({
    recipient: '',
    subject: '',
    message: '',
    sender: 'info@qbapv.com', // Por defecto, info
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const endpoint = formData.sender === 'info@qbapv.com'
      ? '/send-personalized-reply'
      : '/send-no-reply-email';

    fetch(`http://143.198.52.139:5000${endpoint}`, {  // Asegúrate de incluir la IP correcta
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.recipient,
        subject: formData.subject,
        message: formData.message
      })
    })
    .then(response => response.json())
    .then(data => console.log('Correo enviado:', data))
    .catch(error => console.error('Error al enviar el correo:', error));
  };

  return (
    <div className="px-6 py-12 bg-gradient-to-br from-[#626361] to-[#54606c] min-h-screen flex flex-col justify-center relative z-10 text-center p-12 mt-50">
    <h1 className="text-5xl bg-gradient-to-br from-[#626361] to-gray-600 font-bold text-gray-900 shadow-black mb-6 animate-fade-in tracking-tight shadow-lg text-center" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.7)' }}>
      Admin Emails
      {/* {t('contact_us')} */}
    </h1>

    <div style={{ padding: '20px', backgroundColor: '#f7f7f7', maxWidth: '600px', margin: '0 auto', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Enviar Correo</h1>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Destinatario:
          <input 
            type="email" 
            name="recipient" 
            value={formData.recipient} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Asunto:
          <input 
            type="text" 
            name="subject" 
            value={formData.subject} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Mensaje:
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', height: '120px' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Enviar desde:
          <select 
            name="sender" 
            value={formData.sender} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="info@qbapv.com">info@qbapv.com</option>
            <option value="no-reply@qbapv.com">no-reply@qbapv.com</option>
          </select>
        </label>
        <button 
          type="submit" 
          style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Enviar Correo
        </button>
      </form>
    </div>
    </div>
  );
};

export default AdminEmail;

