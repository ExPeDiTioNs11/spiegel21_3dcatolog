import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Straighten } from '@mui/icons-material';

const MeasurementRuler = ({ isVisible, onToggle }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <IconButton 
        onClick={onToggle}
        sx={{
          backgroundColor: isVisible ? '#008098' : 'white',
          color: isVisible ? 'white' : '#008098',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            backgroundColor: isVisible ? '#006d7f' : '#f5f5f5'
          }
        }}
      >
        <Straighten />
      </IconButton>
    </Box>
  );
};

export default MeasurementRuler; 