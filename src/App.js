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
import { ProductProvider } from './context/ProductContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#008098',
      dark: '#00907d',
      light: 'rgba(0, 128, 152, 0.1)',
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
    button: {
      fontWeight: 500,
      fontSize: '0.95rem',
      letterSpacing: '0.02em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          padding: '10px 24px',
          transition: 'all 0.2s ease-in-out',
          fontWeight: 500,
          '&.Mui-disabled': {
            backgroundColor: '#e0e0e0',
            color: 'rgba(0, 0, 0, 0.38)',
          },
        },
        contained: {
          backgroundColor: '#008098',
          color: '#ffffff',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#00907d',
            boxShadow: '0 4px 12px rgba(0, 128, 152, 0.2)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: '0 2px 6px rgba(0, 128, 152, 0.15)',
          },
        },
        outlined: {
          borderColor: '#008098',
          borderWidth: '1.5px',
          color: '#008098',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(0, 128, 152, 0.08)',
            borderColor: '#00907d',
            borderWidth: '1.5px',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        text: {
          color: '#008098',
          padding: '8px 16px',
          '&:hover': {
            backgroundColor: 'rgba(0, 128, 152, 0.08)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        startIcon: {
          marginRight: '8px',
        },
        endIcon: {
          marginLeft: '8px',
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.875rem',
        },
        sizeLarge: {
          padding: '12px 32px',
          fontSize: '1.05rem',
        },
      },
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(0, 128, 152, 0.08)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
          '&.Mui-disabled': {
            backgroundColor: '#f5f5f5',
            color: 'rgba(0, 0, 0, 0.26)',
          },
        },
        sizeSmall: {
          padding: '6px',
        },
        sizeLarge: {
          padding: '12px',
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
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
        <ProductProvider>
          <Router>
            <AppContent />
          </Router>
        </ProductProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
