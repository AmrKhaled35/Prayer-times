import React from 'react';
import { CompassIcon, CloudSunRainIcon, ThermometerIcon, DropletIcon, CalendarClockIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import RamadanSection from './RamadanSection';
import DuasSection from './DuasSection';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function RightPanel() {
  const { selectedCity, weather, qiblaDirection, loading, error } = useAppContext();
  const { t } = useTranslation();

  const panelVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.5
      }
    })
  };

  return (
    <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col md:flex-row flex-wrap gap-4">
      <motion.div 
        className="w-full md:w-[calc(50%-0.5rem)] glass-effect rounded-xl p-5 shadow-2xl"
        custom={0}
        initial="hidden"
        animate="visible"
        variants={panelVariants}
      >
        <div className="flex items-center mb-3">
          <CompassIcon className="text-amber-300 w-5 h-5 mr-2" />
          <h2 className="text-lg font-bold text-white">{t('qiblaDirection')}</h2>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={t('errorMessages.qibla')} />
        ) : (
          <div className="flex flex-col items-center">
            <div className="compass-container">
              <div className="compass-base compass-pulse">
                <div className="compass-marker north"></div>
                <div className="compass-marker east"></div>
                <div className="compass-marker south"></div>
                <div className="compass-marker west"></div>
                <div 
                  className="compass-needle"
                  style={{ transform: `translateX(-50%) rotate(${qiblaDirection}deg)` }}
                ></div>
                <div className="compass-center"></div>
              </div>
            </div>
            <p className="text-white text-sm mt-2">{Math.round(qiblaDirection)}° {t('fromNorth')}</p>
          </div>
        )}
      </motion.div>
      
      <motion.div 
        className="w-full md:w-[calc(50%-0.5rem)] glass-effect rounded-xl p-5 shadow-2xl"
        custom={1}
        initial="hidden"
        animate="visible"
        variants={panelVariants}
      >
        <div className="flex items-center mb-3">
          <CloudSunRainIcon className="text-amber-300 w-5 h-5 mr-2" />
          <h2 className="text-lg font-bold text-white">{t('weather')}</h2>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={t('errorMessages.weather')} />
        ) : weather ? (
          <div className="text-white">
            <div className="flex justify-between items-center mb-2">
              <span>{t('condition')}:</span>
              <span className="font-medium capitalize">{weather.condition}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{t('humidity')}:</span>
              <div className="flex items-center">
                <DropletIcon className="w-4 h-4 mr-1 text-blue-300" />
                <span className="font-medium">{weather.humidity}%</span>
              </div>
            </div>
            {weather.icon && (
              <motion.div 
                className="flex justify-center mt-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <img src={weather.icon} alt="Weather icon" className="w-16 h-16" />
              </motion.div>
            )}
          </div>
        ) : null}
      </motion.div>
      
      <motion.div 
        className="w-full md:w-[calc(50%-0.5rem)] glass-effect rounded-xl p-5 shadow-2xl"
        custom={2}
        initial="hidden"
        animate="visible"
        variants={panelVariants}
      >
        <div className="flex items-center mb-3">
          <ThermometerIcon className="text-amber-300 w-5 h-5 mr-2" />
          <h2 className="text-lg font-bold text-white">{t('temperature')}</h2>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={t('errorMessages.temperature')} />
        ) : weather ? (
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="text-3xl font-bold text-white">{weather.temperature}°C</div>
          </motion.div>
        ) : null}
      </motion.div>
      
      <motion.div 
        className="w-full md:w-[calc(50%-0.5rem)] glass-effect rounded-xl p-5 shadow-2xl"
        custom={3}
        initial="hidden"
        animate="visible"
        variants={panelVariants}
      >
        <div className="flex items-center mb-3">
          <CalendarClockIcon className="text-amber-300 w-5 h-5 mr-2" />
          <h2 className="text-lg font-bold text-white">{t('locationInfo')}</h2>
        </div>
        {selectedCity && (
          <div className="text-white">
            <div className="flex justify-between items-center mb-2">
              <span>{t('country')}:</span>
              <span className="font-medium">{selectedCity.country}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{t('coordinates')}:</span>
              <span className="font-medium text-sm">
                {selectedCity.latitude.toFixed(2)}, {selectedCity.longitude.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </motion.div>
      <RamadanSection />
      <DuasSection />
    </div>
  );
}

export default RightPanel;