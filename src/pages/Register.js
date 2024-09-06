// src/pages/Register.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/register.css'; // Asegúrate de que la ruta sea la correcta

const Register = () => {
    const { t } = useTranslation();

    return (
	    <div className="register-container">
             <h1>{t('register_page')}</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="username">{t('username')}:</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">{t('password')}:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit">{t('register')}</button>
		    </form>
        </div>
    );
};

export default Register;
