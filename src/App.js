import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, Box } from '@mui/material';
import ProductCustomizer from './pages/ProductCustomizer';
import SavedDesigns from './pages/SavedDesigns';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import LocationModal from './components/LocationModal';
import { translations } from './i18n/translations';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Inter", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1.1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'none',
          padding: '12px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  },
});

const AppContent = () => {
  const { showLocationModal, setShowLocationModal, changeLanguage, language } = useLanguage();

  return (
    <>
      <LocationModal
        open={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSelectLanguage={changeLanguage}
        translations={translations[language]}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box sx={{ flex: 1, paddingTop: '64px' }}>
          <Routes>
            <Route path="/product/:productId" element={<ProductCustomizer />} />
            <Route path="/saved-designs" element={<SavedDesigns />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <Router>
          <AppContent />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
