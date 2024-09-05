// src/pages/Contact.js
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/contact.css';

const Contact = () => {
    const { t } = useTranslation(); // Agregamos la función de traducción
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Aquí puedes agregar la lógica para enviar el formulario a un servidor o servicio de correo electrónico
    };

    return (
        <div className="contact-container">
            <h2>{t('contact')}</h2> {/* Texto traducido */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">{t('name')}</label> {/* Texto traducido */}
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">{t('email')}</label> {/* Texto traducido */}
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">{t('message')}</label> {/* Texto traducido */}
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{t('submit')}</button> {/* Texto traducido */}
            </form>
        </div>
    );
};

export default Contact;

