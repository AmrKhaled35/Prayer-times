import Box from "./components/Box";
import RightPanel from "./components/RightPanel";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { AppProvider } from './context/AppContext';
import { motion } from 'framer-motion';
import './i18n';

function App() {
  return (
    <AppProvider>
      <motion.section 
        className="bg-cover bg-center min-h-screen flex items-center py-10 px-6 md:px-10 lg:px-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl mx-auto">
          <Box />
          <RightPanel />
        </div>
        <LanguageSwitcher />
      </motion.section>
    </AppProvider>
  );
}

export default App;