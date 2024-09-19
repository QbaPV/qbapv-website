// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/styles.css';
import backgroundImage from '../assets/images/your-background.jpg';
import forexHome from '../assets/images/forex-home.jpg';
import criptoHome from '../assets/images/cripto-home.jpg';
import freebitcoinHome from '../assets/images/freebitcoin-home.jpg';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="relative bg-cover bg-center min-h-screen flex flex-col items-center justify-center"
			style={{ 
				backgroundImage: `url(${backgroundImage})`, 
				backgroundAttachment: 'fixed' 
			}}>

            {/* Overlay para mejorar la legibilidad del texto */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Contenido principal sobre la imagen */}
            <div className="relative z-10 text-center p-12">
				<h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 shadow-black mb-10 animate-fade-in tracking-tight shadow-lg" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.7)' }}>
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
                <p className="text-xl font-semibold text-[#DAA520] shadow-black mb-8 md:mb-20 animate-fade-in delay-100 leading-relaxed" style={{ textShadow: '3px 2px 3px rgba(0, 0, 0, 2)' }}>
                    {t('home_description_07')}
                </p>
                <Link to="/projects" className="bg-blue-600 text-[#f5f5f5] px-8 py-4 rounded-full shadow-lg transition-transform transform hover:scale-110 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 duration-300">
				  {t('button_explore_project')}
				</Link>
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
				
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 md:mb-20">

					{/* Proyecto 1 */}
					<div className="bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col min-h-[450px]">
						<img src={forexHome} alt={t('project_1')} className="w-full h-32 md:h-48 object-cover shadow-2xl hover:shadow-2xl transition-shadow duration-300" />
						<div className="p-6">
							<h3 className="text-xl font-semibold text-gray-800 mb-3">
								{t('project_1_title')}
							</h3>
							<p className="text-gray-600 mb-4">
								{t('project_1_description')}
							</p>
							<Link to="/projects/forex" className="bg-blue-600 text-[#f5f5f5] px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-color transform hover:scale-105 duration-300">
								{t('button_learn_more')}
							</Link>						
						</div>
					</div>

					{/* Proyecto 2 */}
					<div className="bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col min-h-[450px]">
						<img src={criptoHome} alt={t('project_2')} className="w-full h-32 md:h-48 object-cover shadow-2xl hover:shadow-2xl transition-shadow duration-300" />
						<div className="p-6">
							<h3 className="text-xl font-semibold text-gray-800 mb-3">
								{t('project_2_title')}
							</h3>
							<p className="text-gray-600 mb-4">
								{t('project_2_description')}
							</p>
							<Link to="/projects/cripto" className="bg-blue-600 text-[#f5f5f5] px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-color transform hover:scale-105 duration-300">
								{t('button_learn_more')}
							</Link>													
						</div>
					</div>

					{/* Proyecto 3 */}
					<div className="bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col min-h-[450px]">
						<img src={freebitcoinHome} alt={t('project_3')} className="w-full h-32 md:h-48 object-cover shadow-2xl hover:shadow-2xl transition-shadow duration-300" />
						<div className="p-6">
							<h3 className="text-xl font-semibold text-gray-800 mb-3">
								{t('project_3_title')}
							</h3>
							<p className="text-gray-600 mb-4">
								{t('project_3_description')}
							</p>
							<Link to="/projects/freebitcoin" className="bg-blue-600 text-[#f5f5f5] px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-color transform hover:scale-105 duration-300">
								{t('button_learn_more')}
							</Link>													
						</div>
					</div>
				</div>

				{/* Testimonios */}
				<section className="bg-gradient-to-br from-gray-200 to-gray-400 py-10 mt-20">
					<div className="max-w-7xl mx-auto px-4">
						<h2 className="text-3xl font-bold text-gray-900 shadow-black mb-10 animate-fade-in tracking-tight shadow-lg" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.7)' }}>{t('testimonials_title')}</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							<div className="bg-white shadow-lg p-6 rounded-lg">
								<img
								    className="w-16 h-16 rounded-full mx-auto mb-4"
								    src="https://via.placeholder.com/150"
								    alt="Testimonial 1"
								/>
								<h3 className="text-xl font-bold text-center">{t('person_1_name')}</h3>
								<p className="mt-4 text-gray-600 text-center">
								    {t('person_1_testimonial')}
								</p>
							</div>
							<div className="bg-white shadow-lg p-6 rounded-lg">
								<img
								    className="w-16 h-16 rounded-full mx-auto mb-4"
								    src="https://via.placeholder.com/150"
								    alt="Testimonial 2"
								/>
								<h3 className="text-xl font-bold text-center">{t('person_2_name')}</h3>
								<p className="mt-4 text-gray-600 text-center">
								    {t('person_2_testimonial')}
								</p>
							</div>
							<div className="bg-white shadow-lg p-6 rounded-lg">
								<img
								    className="w-16 h-16 rounded-full mx-auto mb-4"
								    src="https://via.placeholder.com/150"
								    alt="Testimonial 3"
								/>
								<h3 className="text-xl font-bold text-center">{t('person_3_name')}</h3>
								<p className="mt-4 text-gray-600 text-center">
								    {t('person_3_testimonial')}
								</p>
						    </div>
						</div>
					</div>
				</section>

				{/* Footer */}
				<footer className="bg-gray-900 text-white py-8 mt-20">
				    <div className="max-w-7xl mx-auto px-4">
						<div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-8">
						    <div className="mb-4 md:mb-0">
								<h5 className="text-lg font-bold">{t('footer_about')}</h5>
								<p className="text-gray-400 mt-2">{t('footer_description')}</p>
						    </div>
						    <div className="mb-4 md:mb-0">
								<h5 className="text-lg font-bold">{t('footer_links')}</h5>
								<ul className="mt-2 space-y-2">
								    <li><a href="/about" className="text-gray-400 hover:text-white">{t('footer_about_link')}</a></li>
								    <li><a href="/projects" className="text-gray-400 hover:text-white">{t('footer_projects_link')}</a></li>
								    <li><a href="/contact" className="text-gray-400 hover:text-white">{t('footer_contact_link')}</a></li>
							     </ul>
						    </div>
						    <div>
								<h5 className="text-lg font-bold">{t('footer_follow_us')}</h5>
								<div className="mt-2 flex space-x-4">
								    <a href="#" className="text-gray-400 hover:text-white mx-2">Facebook</a>
								    <a href="#" className="text-gray-400 hover:text-white mx-2">Twitter</a>
								    <a href="#" className="text-gray-400 hover:text-white mx-2">LinkedIn</a>
							    </div>
						    </div>
						</div>
						<div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-8 mt-6">
                        <div className="flex justify-center md:justify-end space-x-4">
                            <a href="#" className="text-sm text-gray-400 hover:text-white">{t('footer_privacy')}</a>
							<span className="text-gray-400">|</span>
                            <a href="#" className="text-sm text-gray-400 hover:text-white">{t('footer_terms')}</a>
							<span className="text-gray-400">|</span>
							<a href="#" className="text-sm text-gray-400 hover:text-white">{t('footer_cookies')}</a>
                        </div>
                    </div>
					<p className="text-center text-gray-500 text-sm mt-2">
						&copy; {new Date().getFullYear()}
						{t('footer_copyright')}
					</p>
				    </div>
				</footer>
			</div>
        </div>
    );
};

export default Home;


