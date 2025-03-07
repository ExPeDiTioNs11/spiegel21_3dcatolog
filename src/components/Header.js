import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import FolderIcon from '@mui/icons-material/Folder';
import { useLanguage } from '../i18n/LanguageContext';

const Header = () => {
  const navigate = useNavigate();
  const { t, language, changeLanguage, setShowLocationModal } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (lang) => {
    changeLanguage(lang);
    handleLanguageClose();
  };

  const handleLocationSettings = () => {
    setShowLocationModal(true);
    handleLanguageClose();
  };

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
          startIcon={<FolderIcon />}
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
        <IconButton
          color="inherit"
          onClick={handleLanguageClick}
          size="large"
        >
          <LanguageIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleLanguageClose}
          PaperProps={{
            sx: {
              maxHeight: '400px',
              width: '200px'
            }
          }}
        >
          <MenuItem
            onClick={() => handleLanguageSelect('de')}
            selected={language === 'de'}
          >
            Deutsch
          </MenuItem>
          <MenuItem
            onClick={() => handleLanguageSelect('en')}
            selected={language === 'en'}
          >
            English
          </MenuItem>
          <MenuItem
            onClick={() => handleLanguageSelect('tr')}
            selected={language === 'tr'}
          >
            Türkçe
          </MenuItem>
          <MenuItem
            onClick={() => handleLanguageSelect('fr')}
            selected={language === 'fr'}
          >
            Français
          </MenuItem>
          <MenuItem
            onClick={() => handleLanguageSelect('it')}
            selected={language === 'it'}
          >
            Italiano
          </MenuItem>
          <MenuItem
            onClick={() => handleLanguageSelect('es')}
            selected={language === 'es'}
          >
            Español
          </MenuItem>
          <MenuItem
            onClick={() => handleLanguageSelect('nl')}
            selected={language === 'nl'}
          >
            Nederlands
          </MenuItem>
          <MenuItem
            onClick={() => handleLanguageSelect('pl')}
            selected={language === 'pl'}
          >
            Polski
          </MenuItem>
          <MenuItem
            onClick={() => handleLanguageSelect('pt')}
            selected={language === 'pt'}
          >
            Português
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLocationSettings}>
            {t('selectLocation')}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 