import { GlobeIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

function LanguageSwitcher() {
  const { language, setLanguage } = useAppContext();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'fr', name: 'Français' }
  ];

  return (
    <motion.div 
      className="fixed bottom-4 left-4 glass-effect rounded-xl p-3 shadow-2xl z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex items-center mb-2">
        <GlobeIcon className="text-amber-300 w-5 h-5 mr-2" />
        <h2 className="text-lg font-bold text-white">Language</h2>
      </div>
      <div className="flex gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-3 py-1 rounded-md text-sm transition-all ${
              language === lang.code
                ? 'bg-amber-500 text-white'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default LanguageSwitcher;