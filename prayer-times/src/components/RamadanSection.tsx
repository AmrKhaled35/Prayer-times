/* eslint-disable @typescript-eslint/no-unused-vars */
import { MoonStarIcon, CalendarDaysIcon, ClockIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function RamadanSection() {
  const { ramadanInfo, selectedCity } = useAppContext();
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateTaraweehTime = () => {
    if (!ramadanInfo.isRamadan) return null;
    
    const prayerTimes = JSON.parse(localStorage.getItem('prayerTimes') || '[]');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ishaTime = prayerTimes.find((prayer: any) => prayer.name === 'Isha')?.time;
    
    if (!ishaTime) return '20:30';  
    const [hours, minutes] = ishaTime.split(':').map(Number);
    let taraweehHours = hours + 1;
    let taraweehMinutes = minutes + 30;
    if (taraweehMinutes >= 60) {
      taraweehHours += 1;
      taraweehMinutes -= 60;
    }
    return `${taraweehHours.toString().padStart(2, '0')}:${taraweehMinutes.toString().padStart(2, '0')}`;
  };

  const taraweehTime = calculateTaraweehTime();

  return (
    <motion.div 
      className="w-full glass-effect rounded-xl p-5 shadow-2xl overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <div className="flex items-center mb-3">
        <MoonStarIcon className="text-amber-300 w-5 h-5 mr-2" />
        <h2 className="text-lg font-bold text-white">{t('ramadan')}</h2>
      </div>
      <div className="absolute top-0 right-0 opacity-10">
        <MoonStarIcon className="w-24 h-24 text-amber-300" />
      </div>

      <div className="text-white relative z-10">
        <div className="flex items-center mb-2">
          <CalendarDaysIcon className="w-4 h-4 mr-2 text-amber-300" />
          <span className="font-medium">{ramadanInfo.year}</span>
        </div>

        {ramadanInfo.isRamadan ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-amber-500/20 rounded-lg p-3 border border-amber-500/30 mt-2"
          >
            <h3 className="text-center text-lg font-bold mb-2">{t('ramadanMubarak')}</h3>
            <p className="text-center">
              {t('todayIs')} <span className="font-bold text-amber-300">{t('day')} {ramadanInfo.currentDay}</span> {t('ofRamadan')}
            </p>
            <div className="mt-3 pt-3 border-t border-amber-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2 text-amber-300" />
                  <span>{t('taraweehPrayer')}:</span>
                </div>
                <span className="font-bold text-amber-300">{taraweehTime}</span>
              </div>
              <p className="text-xs text-center mt-1 text-gray-300">
                {t('taraweehNote')}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{t('startDate')}:</span>
              <span className="font-medium">{formatDate(ramadanInfo.startDate)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('endDate')}:</span>
              <span className="font-medium">{formatDate(ramadanInfo.endDate)}</span>
            </div>
            {ramadanInfo.daysLeft && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="bg-amber-500/20 rounded-lg p-3 border border-amber-500/30 mt-2"
              >
                <p className="text-center">
                  {t('daysUntilRamadan')}: <span className="font-bold text-amber-300">{ramadanInfo.daysLeft}</span> {t('days')}
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default RamadanSection;