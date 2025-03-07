import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Autocomplete,
  TextField,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// EU countries and Turkey with their native names
const countries = [
  { code: 'AT', name: 'Österreich', nativeName: 'Österreich', languages: ['de', 'en'] },
  { code: 'BE', name: 'Belgium', nativeName: 'België/Belgique', languages: ['nl', 'fr', 'de'] },
  { code: 'BG', name: 'Bulgaria', nativeName: 'България', languages: ['bg', 'en'] },
  { code: 'HR', name: 'Croatia', nativeName: 'Hrvatska', languages: ['hr', 'en'] },
  { code: 'CY', name: 'Cyprus', nativeName: 'Κύπρος', languages: ['el', 'en'] },
  { code: 'CZ', name: 'Czech Republic', nativeName: 'Česká republika', languages: ['cs', 'en'] },
  { code: 'DK', name: 'Denmark', nativeName: 'Danmark', languages: ['da', 'en'] },
  { code: 'EE', name: 'Estonia', nativeName: 'Eesti', languages: ['et', 'en'] },
  { code: 'FI', name: 'Finland', nativeName: 'Suomi', languages: ['fi', 'sv', 'en'] },
  { code: 'FR', name: 'France', nativeName: 'France', languages: ['fr', 'en'] },
  { code: 'DE', name: 'Germany', nativeName: 'Deutschland', languages: ['de', 'en'] },
  { code: 'GR', name: 'Greece', nativeName: 'Ελλάδα', languages: ['el', 'en'] },
  { code: 'HU', name: 'Hungary', nativeName: 'Magyarország', languages: ['hu', 'en'] },
  { code: 'IE', name: 'Ireland', nativeName: 'Éire', languages: ['en', 'ga'] },
  { code: 'IT', name: 'Italy', nativeName: 'Italia', languages: ['it', 'en'] },
  { code: 'LV', name: 'Latvia', nativeName: 'Latvija', languages: ['lv', 'en'] },
  { code: 'LT', name: 'Lithuania', nativeName: 'Lietuva', languages: ['lt', 'en'] },
  { code: 'LU', name: 'Luxembourg', nativeName: 'Luxembourg', languages: ['fr', 'de', 'en'] },
  { code: 'MT', name: 'Malta', nativeName: 'Malta', languages: ['mt', 'en'] },
  { code: 'NL', name: 'Netherlands', nativeName: 'Nederland', languages: ['nl', 'en'] },
  { code: 'PL', name: 'Poland', nativeName: 'Polska', languages: ['pl', 'en'] },
  { code: 'PT', name: 'Portugal', nativeName: 'Portugal', languages: ['pt', 'en'] },
  { code: 'RO', name: 'Romania', nativeName: 'România', languages: ['ro', 'en'] },
  { code: 'SK', name: 'Slovakia', nativeName: 'Slovensko', languages: ['sk', 'en'] },
  { code: 'SI', name: 'Slovenia', nativeName: 'Slovenija', languages: ['sl', 'en'] },
  { code: 'ES', name: 'Spain', nativeName: 'España', languages: ['es', 'en'] },
  { code: 'SE', name: 'Sweden', nativeName: 'Sverige', languages: ['sv', 'en'] },
  { code: 'TR', name: 'Turkey', nativeName: 'Türkiye', languages: ['tr', 'en', 'de'] },
];

const LocationModal = ({ open, onClose, onSelectLanguage, translations }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isGeolocating, setIsGeolocating] = useState(false);

  const handleUseLocation = async () => {
    setIsGeolocating(true);
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      // Use reverse geocoding to get country from coordinates
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
      );
      const data = await response.json();
      
      // Find matching country in our list
      const country = countries.find(c => c.code === data.countryCode);
      if (country) {
        setSelectedCountry(country.code);
        // Automatically save if country is found
        onSelectLanguage(country.languages[0]);
        onClose();
      } else {
        alert(translations?.countryNotSupported || 'This country is not supported yet');
      }
    } catch (error) {
      console.error('Error getting location:', error);
      alert(translations?.locationError || 'Could not get location');
    } finally {
      setIsGeolocating(false);
    }
  };

  const handleCountryChange = (event, newValue) => {
    setSelectedCountry(newValue?.code || '');
  };

  const handleSave = () => {
    const country = countries.find(c => c.code === selectedCountry);
    if (country) {
      onSelectLanguage(country.languages[0]);
      localStorage.setItem('userCountry', selectedCountry);
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="location-modal-title"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}>
        <IconButton
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        <Typography id="location-modal-title" variant="h6" component="h2" gutterBottom>
          {translations?.selectLocation || 'Select Location'}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {translations?.locationMessage || 'Choose your location to see the appropriate language'}
        </Typography>

        <Button
          startIcon={isGeolocating ? <CircularProgress size={20} /> : <LocationOnIcon />}
          onClick={handleUseLocation}
          disabled={isGeolocating}
          sx={{ 
            mb: 2,
            backgroundColor: '#008098',
            color: 'white',
            '&:hover': {
              backgroundColor: '#006d7f'
            },
            '&.Mui-disabled': {
              backgroundColor: '#e0e0e0'
            }
          }}
          fullWidth
          variant="contained"
        >
          {translations?.useLocation || 'Use Current Location'}
        </Button>

        <Autocomplete
          options={countries}
          getOptionLabel={(option) => `${option.nativeName} (${option.name})`}
          onChange={handleCountryChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label={translations?.country || 'Country'}
              variant="outlined"
            />
          )}
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={onClose} color="inherit">
            {translations?.cancel || 'Cancel'}
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={!selectedCountry}
            sx={{
              backgroundColor: '#008098',
              '&:hover': {
                backgroundColor: '#006d7f'
              },
              '&.Mui-disabled': {
                backgroundColor: '#e0e0e0'
              }
            }}
          >
            {translations?.save || 'Save'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LocationModal; 