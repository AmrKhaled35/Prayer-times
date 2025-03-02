import { MapPinIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function LocationButton() {
  const { getUserLocation, isGettingLocation } = useAppContext();
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <button
        onClick={getUserLocation}
        disabled={isGettingLocation}
        className="flex items-center justify-center gap-2 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <MapPinIcon className="w-4 h-4" />
        {isGettingLocation ? (
          <span className="flex items-center">
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
            {t('gettingLocation')}
          </span>
        ) : (
          <span>{t('useMyLocation')}</span>
        )}
      </button>
    </motion.div>
  );
}

export default LocationButton;