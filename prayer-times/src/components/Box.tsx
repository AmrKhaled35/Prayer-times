import TopSection from './TopSection';
import BottomSection from './BottomSection';
import { MoonIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function Box() {
  const { t } = useTranslation();

  return (
    <motion.div 
      className="w-full md:w-1/2 lg:w-2/5"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-effect rounded-xl p-5 md:p-6 shadow-2xl">
        <motion.div 
          className="flex items-center justify-center mb-4"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <MoonIcon className="text-amber-300 w-6 h-6 mr-2" />
          <h1 className="text-xl md:text-2xl font-bold text-white">{t('appTitle')}</h1>
        </motion.div>
        <TopSection />
        <BottomSection />
      </div>
    </motion.div>
  );
}

export default Box;