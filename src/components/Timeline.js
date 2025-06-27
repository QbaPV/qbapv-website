// src/components/Timeline.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faHandshake, faGlobe, faMicrochip, faCircleArrowRight, faCircleArrowLeft, faSquare } from '@fortawesome/free-solid-svg-icons';

const Timeline = () => {
    const { t } = useTranslation();

    const timelineEvents = [
        { year0: '2020', iconSquare: faSquare, iconArrow: faCircleArrowRight, title: t('timeline_event_1_title'), description: t('timeline_event_1_description'), icon: faRocket },
        { year1: '2021', iconSquare: faSquare, iconArrow: faCircleArrowLeft, title: t('timeline_event_2_title'), description: t('timeline_event_2_description'), icon: faHandshake },
        { year0: '2022', iconSquare: faSquare, iconArrow: faCircleArrowRight, title: t('timeline_event_3_title'), description: t('timeline_event_3_description'), icon: faGlobe },
        { year1: '2023', iconSquare: faSquare, iconArrow: faCircleArrowLeft, title: t('timeline_event_4_title'), description: t('timeline_event_4_description'), icon: faMicrochip },

    ];

    return (
        <div className="timeline-container relative py-12" style={{ backgroundColor: '#E5E7EB', borderRadius: '12px', padding: '20px' }}>    
            <h2 className="text-4xl font-bold text-gray-900 shadow-black mb-12 animate-fade-in tracking-tight shadow-lg text-center" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.7)' }}>{t('timeline_title')}</h2>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/*     <div className="absolute inset-0 flex justify-center">
                    <div className="w-1 bg-[#DAA520] shadow-black"></div>
                </div>  */}

                <div className="space-y-12">
                
                {timelineEvents.map((event, index) => (
                    <div key={index} className={`mb-10 flex ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'} justify-between items-center w-full`}>
                        <div className="w-5/12 px-6 py-4 mb-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 shadow-md shadow-black overflow-hidden duration-300">
                            <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                            <p className="mt-2 text-gray-600 animate-fade-in text-justify">{event.description}</p>
                        </div>
                        
                        <div className="relative z-12 w-12 h-12 flex items-center justify-center">
                            <FontAwesomeIcon icon={event.iconArrow} className="text-2xl text-gray-700" />
                        </div>
                        
                        <div className="relative z-12 w-12 h-12 flex items-center justify-center bg-green-200 border-4 border-[#DAA520] text-black rounded-full">
                            <FontAwesomeIcon icon={event.icon} className="text-2xl" />
                        </div>

                        <div className="relative z-6 w-6 h-6 flex items-center justify-center" style={{ color: '#E5E7EB' }}>
                            <FontAwesomeIcon icon={event.iconSquare} className="text-2xl" />
                        </div>

                        <div className="w-12/12 text-right">
                           
                            <span 
                                className="text-lg font-bold text-gray-800">{event.year1}
                            </span>
                        </div>
                        <div className="w-7/12 text-right">
                              
                            <span 
                                className="text-lg font-bold text-gray-800">{event.year0}
                            </span>
                        </div>


                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;