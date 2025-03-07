import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('de'); // Default to German
  const [showLocationModal, setShowLocationModal] = useState(false);

  useEffect(() => {
    // Check if language is already set in localStorage
    const savedLanguage = localStorage.getItem('userLanguage');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    } else {
      // If no language is set or invalid language, show the location modal
      setShowLocationModal(true);
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
      localStorage.setItem('userLanguage', newLanguage);
      // Force a page reload to ensure all components update
      window.location.reload();
    } else {
      console.error(`Language ${newLanguage} is not supported`);
      // Fallback to English if the selected language is not supported
      if (newLanguage !== 'en' && translations['en']) {
        setLanguage('en');
        localStorage.setItem('userLanguage', 'en');
        window.location.reload();
      }
    }
  };

  const t = (key) => {
    // First try the selected language
    if (translations[language]?.[key]) {
      return translations[language][key];
    }
    // Then try English as fallback
    if (translations['en']?.[key]) {
      return translations['en'][key];
    }
    // Finally try German as last resort
    if (translations['de']?.[key]) {
      return translations['de'][key];
    }
    // If all fails, return the key itself
    return key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      changeLanguage,
      t,
      showLocationModal,
      setShowLocationModal,
      supportedLanguages: Object.keys(translations),
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext; 