import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLanguage } from '../i18n/LanguageContext';

const Header = () => {
  const navigate = useNavigate();
  const { t, language, setShowLocationModal } = useLanguage();

  return (
    <AppBar 
      position="fixed" 
      color="transparent" 
      elevation={0} 
      sx={{ 
        backdropFilter: 'blur(10px)', 
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderBottom: '1px solid #e0e0e0' 
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'primary.main',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          Spiegel21
        </Typography>
        <Button
          startIcon={<FavoriteIcon />}
          onClick={() => navigate('/saved-designs')}
          sx={{ 
            color: '#008098',
            '&:hover': {
              backgroundColor: 'rgba(0, 128, 152, 0.08)'
            }
          }}
        >
          {t('savedDesigns')}
        </Button>
        <Button
          onClick={() => setShowLocationModal(true)}
          sx={{
            color: '#008098',
            minWidth: 'auto',
            padding: '6px 12px',
            ml: 1,
            '&:hover': {
              backgroundColor: 'rgba(0, 128, 152, 0.08)'
            }
          }}
          startIcon={<LanguageIcon />}
        >
          {language.toUpperCase()}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 