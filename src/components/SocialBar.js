// Barra flotante de redes sociales
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import logoX from '../assets/logos/logo-x.png'; // Si deseas usar un logo personalizado para X

const SocialBar = () => {
    return (
        <div className="fixed top-1/3 left-0 space-y-3 z-50">
            {/* Facebook */}
            <a href="#" className="text-white bg-[#4267B2] p-3 rounded-r-full block transition-transform transform hover:scale-110 hover:bg-[#3b5998] hover:shadow-lg">
                <FontAwesomeIcon icon={faFacebook} />
            </a>
            {/* X (Twitter) */}
            <a href="#" className="text-white bg-black p-3 rounded-r-full block transition-transform transform hover:scale-110 hover:bg-gray-800 hover:shadow-lg">
                <img src={logoX} alt="X" className="w-6 h-6" />
            </a>
            {/* LinkedIn */}
            <a href="#" className="text-white bg-[#0077b5] p-3 rounded-r-full block transition-transform transform hover:scale-110 hover:bg-[#005582] hover:shadow-lg">
                <FontAwesomeIcon icon={faLinkedin} />
            </a>
        </div>
    );
};

export default SocialBar;

