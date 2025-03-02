import  { useState, useEffect } from 'react';
import { BookOpenIcon, BookmarkIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from '../../node_modules/react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';

type Dua = {
  id: number;
  title: string;
  arabic_text: string;
  translation: string;
  transliteration?: string;
  reference?: string;
  category?: string;
};

function DuasSection() {
  const { language } = useAppContext();
  const { t } = useTranslation();
  const [duas, setDuas] = useState<Dua[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const [expandedDua, setExpandedDua] = useState<number | null>(null);

  useEffect(() => {
    const fetchDuas = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://hisnmuslim.api.com/v1/duas');
        if (!response.data || response.status !== 200) {
          throw new Error('Failed to fetch duas');
        }
        setDuas(response.data.slice(0, 10));
      } catch (err) {
        console.error('Error fetching duas:', err);
        setDuas([
          {
            id: 1,
            title: "Morning Remembrance",
            arabic_text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
            translation: "O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the resurrection.",
            transliteration: "Allāhumma bika aṣbaḥnā, wa bika amsaynā, wa bika naḥyā, wa bika namūtu, wa ilayka an-nushūr"
          },
          {
            id: 2,
            title: "Evening Remembrance",
            arabic_text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
            translation: "O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die, and to You is the final return.",
            transliteration: "Allāhumma bika amsaynā, wa bika aṣbaḥnā, wa bika naḥyā, wa bika namūtu, wa ilayka al-maṣīr"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDuas();
  }, []);

  const toggleDua = (id: number) => {
    if (expandedDua === id) {
      setExpandedDua(null);
    } else {
      setExpandedDua(id);
    }
  };

  return (
    <motion.div 
      className="w-full glass-effect rounded-xl p-5 shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <div className="flex items-center mb-3">
        <BookOpenIcon className="text-amber-300 w-5 h-5 mr-2" />
        <h2 className="text-lg font-bold text-white">{t('duas')}</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-300"></div>
        </div>
      ) : error ? (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex items-center">
          <p className="text-white text-sm">{error}</p>
        </div>
      ) : (
        <div className="duas-container">
          {duas.map((dua) => (
            <motion.div 
              key={dua.id}
              className="dua-item rounded-lg p-3 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * dua.id }}
            >
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleDua(dua.id)}
              >
                <div className="flex items-center">
                  <BookmarkIcon className="text-amber-300 w-4 h-4 mr-2" />
                  <h3 className="text-white font-medium">{dua.title}</h3>
                </div>
                {expandedDua === dua.id ? (
                  <ChevronUpIcon className="text-amber-300 w-4 h-4" />
                ) : (
                  <ChevronDownIcon className="text-amber-300 w-4 h-4" />
                )}
              </div>
              
              {expandedDua === dua.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-3"
                >
                  <p className="dua-arabic text-amber-200 text-right text-lg mb-2 leading-relaxed">
                    {dua.arabic_text}
                  </p>
                  
                  {dua.transliteration && (
                    <p className="text-gray-300 text-sm mb-2 italic">
                      {dua.transliteration}
                    </p>
                  )}
                  
                  <p className="text-white text-sm">
                    {language === 'ar' ? dua.arabic_text : 
                     language === 'fr' ? dua.translation.replace('O Allah', 'Ô Allah') : 
                     dua.translation}
                  </p>
                  
                  {dua.reference && (
                    <p className="text-gray-400 text-xs mt-2">
                      {dua.reference}
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default DuasSection;
