import React from 'react';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import LocationButton from './LocationButton';
import { motion } from 'framer-motion';

function TopSection() {
  const { cities, selectedCity, setSelectedCity } = useAppContext();
  const { t } = useTranslation();
  
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = e.target.value;
    const city = cities.find(c => c.id === cityId);
    if (city) {
      setSelectedCity(city);
    }
  };
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <motion.div 
      className="pb-4 mb-4 border-b border-gray-400/30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="city w-full md:flex-1 md:mr-2">
          <div className="flex items-center mb-1">
            <MapPinIcon className="w-4 h-4 text-amber-300 mr-2" />
            <h3 className="text-lg text-white font-medium">{t('city')}</h3>
          </div>
          <select
            className="w-full rounded-md outline-none text-white city-select p-1.5 text-sm"
            value={selectedCity?.id || ''}
            onChange={handleCityChange}
          >
            {selectedCity?.id === 'user-location' && (
              <option value="user-location">My Location</option>
            )}
            {cities.map(city => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className="date w-full md:flex-1">
          <div className="flex items-center mb-1">
            <CalendarIcon className="w-4 h-4 text-amber-300 mr-2" />
            <h3 className="text-lg text-white font-medium">{t('date')}</h3>
          </div>
          <h4 className="text-lg text-white">{currentDate}</h4>
        </div>
      </div>
      
      <LocationButton />
    </motion.div>
  );
}

export default TopSection;