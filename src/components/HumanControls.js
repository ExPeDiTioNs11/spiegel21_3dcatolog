import React, { useState } from 'react';
import {
  Box,
  Slider,
  Typography,
  IconButton,
  Popover,
  CircularProgress,
} from '@mui/material';
import { Height, Visibility, VisibilityOff } from '@mui/icons-material';
import { useLanguage } from '../i18n/LanguageContext';

export default function HumanControls({ 
  height, 
  setHeight,
  isVisible,
  setIsVisible
}) {
  const { t } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (event) => {
    if (!isVisible) {
      setIsVisible(true);
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleVisibility = async () => {
    if (!isVisible) {
      setIsLoading(true);
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
    }
    setIsVisible(!isVisible);
    if (!isVisible) {
      setAnchorEl(null);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <IconButton
        onClick={handleClick}
        sx={{
          backgroundColor: isVisible ? 'primary.main' : 'background.paper',
          color: isVisible ? 'white' : 'text.primary',
          '&:hover': {
            backgroundColor: isVisible ? 'primary.dark' : 'background.default',
          },
          boxShadow: 2,
        }}
      >
        <Height />
      </IconButton>

      <IconButton
        onClick={toggleVisibility}
        disabled={isLoading}
        sx={{
          backgroundColor: isVisible ? 'primary.main' : 'background.paper',
          color: isVisible ? 'white' : 'text.primary',
          '&:hover': {
            backgroundColor: isVisible ? 'primary.dark' : 'background.default',
          },
          boxShadow: 2,
          position: 'relative',
          width: 40,
          height: 40,
        }}
      >
        {isLoading ? (
          <CircularProgress
            size={24}
            sx={{
              color: isVisible ? 'white' : 'primary.main',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        ) : (
          isVisible ? <VisibilityOff /> : <Visibility />
        )}
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, width: 200 }}>
          <Typography gutterBottom>
            {t('humanHeight')}: {height} cm
          </Typography>
          <Slider
            value={height}
            onChange={(e, newValue) => setHeight(newValue)}
            min={150}
            max={200}
            step={1}
            marks={[
              { value: 150, label: '150cm' },
              { value: 175, label: '175cm' },
              { value: 200, label: '200cm' },
            ]}
          />
        </Box>
      </Popover>
    </Box>
  );
} 