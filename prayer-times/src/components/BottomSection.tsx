import React from 'react';
import PrayerTime from './PrayerTime';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { SunriseIcon, SunIcon, CloudSunIcon, SunsetIcon, MoonIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function BottomSection() {
  const { prayerTimes, loading, error } = useAppContext();
  const { t } = useTranslation();
  
  const prayerIcons = [
    <SunriseIcon className="w-4 h-4" />,
    <SunIcon className="w-4 h-4" />,
    <CloudSunIcon className="w-4 h-4" />,
    <SunsetIcon className="w-4 h-4" />,
    <MoonIcon className="w-4 h-4" />,
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="space-y-2">
      {prayerTimes.map((prayer, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * index }}
        >
          <PrayerTime 
            name={t(`prayerNames.${prayer.name}`)} 
            time={prayer.time} 
            icon={prayerIcons[index]} 
          />
        </motion.div>
      ))}
    </div>
  );
}

export default BottomSection;