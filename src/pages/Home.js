// src/pages/Home.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/styles.css';
import backgroundImage from '../assets/images/your-background.jpg'; // Asegúrate de reemplazar esto con tu imagen
import forexHome from '../assets/images/forex-home.jpg';
import criptoHome from '../assets/images/cripto-home.jpg';
import freebitcoinHome from '../assets/images/freebitcoin-home.jpg';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="relative bg-cover bg-center min-h-screen flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}>

            {/* Overlay para mejorar la legibilidad del texto */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Contenido principal sobre la imagen */}
            <div className="relative z-10 text-center p-12">
                <h1 className="text-5xl font-extrabold text-gray-900  shadow-black mb-10 animate-fade-in tracking-tight shadow-lg" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.7)' }}>
                    {t('welcome')}
                </h1>

                <h2 className="text-3xl text-[#f5f5f5] mb-6 animate-fade-in delay-100 tracking-wide">
                    {t('home_description_01')}
                </h2>
                
                <p className="text-xl text-[#f5f5f5] mb-4 animate-fade-in delay-100 leading-relaxed">
                    {t('home_description_02')} <span className="font-semibold text-[#bcd4e6]">{t('home_description_03')}</span>
                </p>

                <p className="text-xl text-[#f5f5f5] mb-4 animate-fade-in delay-100 leading-relaxed">
                    {t('home_description_04')}
                </p>

                <p className="text-xl text-[#f5f5f5] mb-4 animate-fade-in delay-100 leading-relaxed">
                    {t('home_description_05')} <span className="font-semibold text-[#bcd4e6]">{t('home_description_06')}</span>
                </p>

                {/* Estilo dorado y sombra negra */}
                <p className="text-2xl font-semibold text-[#DAA520] shadow-black mb-10 animate-fade-in delay-100 leading-relaxed" style={{ textShadow: '3px 2px 3px rgba(0, 0, 0, 2)' }}>
                    {t('home_description_07')}
                </p>

                <button className="bg-blue-600 text-[#f5f5f5] px-8 py-4 rounded-full shadow-lg transition-transform transform hover:scale-110 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 duration-300">
				  {t('button_explore_project')}
				</button>
			</div>

            {/* Sección de estadísticas */}
			<div className="relative z-10 text-center p-12 mt-50">
				<h1 className="text-4xl font-bold text-gray-900 shadow-black mb-10 animate-fade-in tracking-tight shadow-lg" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.7)' }}>
					{t('featured_projects')}
				</h1>
                <h2 className="text-3xl text-[#f5f5f5] mb-2 animate-fade-in delay-100 tracking-wide">
                    {t('featured_projects_1')}
                </h2> 
	            <h2 className="text-3xl text-[#bcd4e6] mb-20 animate-fade-in delay-100 tracking-wide">
                    {t('featured_projects_2')}
                </h2> 			
				
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Proyecto 1 */}
					<div className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
						<img src={forexHome} alt={t('project_1')} className="w-full h-36 object-cover" />
						<div className="p-6">
							<h3 className="text-xl font-semibold text-gray-800 mb-3">
								{t('project_1_title')}
							</h3>
							<p className="text-gray-600 mb-4">
								{t('project_1_description')}
							</p>
							<button className="bg-blue-600 text-[#f5f5f5] px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300">
								{t('button_learn_more')}
							</button>
						</div>
					</div>

					{/* Proyecto 2 */}
					<div className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
						<img src={criptoHome} alt={t('project_1')} className="w-full h-36 object-cover" />
						<div className="p-6">
							<h3 className="text-xl font-semibold text-gray-800 mb-3">
								{t('project_2_title')}
							</h3>
							<p className="text-gray-600 mb-4">
								{t('project_2_description')}
							</p>
							<button className="bg-blue-600 text-[#f5f5f5] px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300">
								{t('button_learn_more')}
							</button>
						</div>
					</div>

					{/* Proyecto 3 */}
					<div className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
						<img src={freebitcoinHome} alt={t('project_1')} className="w-full h-36 object-cover" />
						<div className="p-6">
							<h3 className="text-xl font-semibold text-gray-800 mb-3">
								{t('project_3_title')}
							</h3>
							<p className="text-gray-600 mb-4">
								{t('project_3_description')}
							</p>
							<button className="bg-blue-600 text-[#f5f5f5] px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300">
								{t('button_learn_more')}
							</button>
						</div>
					</div>
				</div>
			</div>
        </div>
    );
};

export default Home;

