// src/pages/Register.js
import React from 'react';
import underConstructionImage from '../assets/images/under-construction.jpg'; // Asegúrate de tener la imagen
import { useTranslation } from 'react-i18next';
import '../styles/register.css'; // Asegúrate de que la ruta sea la correcta

const Projects = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {/* Imagen de En Construcción */}
        <img
          src={underConstructionImage}
          alt="Página en construcción"
          className="w-full max-w-lg mb-8 shadow-lg rounded-lg"
        />
  
        {/* Mensaje en inglés y español */}
        <h1 className="text-3xl font-bold text-gray-700 mb-4 text-center">
          This page is under construction.
        </h1>
        <h2 className="text-2xl text-gray-500 text-center">
          Esta página está en construcción.
        </h2>
      </div>
    );
  };
  
export default Projects;


//const Register = () => {
//    const { t } = useTranslation();

//    return (
//	    <div className="register-container">
//             <h1>{t('register_page')}</h1>
//            <form>
//                <div className="form-group">
//                    <label htmlFor="username">{t('username')}:</label>
//                    <input type="text" id="username" name="username" />
//                </div>
//                <div className="form-group">
//                    <label htmlFor="password">{t('password')}:</label>
//                    <input type="password" id="password" name="password" />
//                </div>
//                <button type="submit">{t('register')}</button>
//		    </form>
//        </div>
//    );
//};

//export default Register;
