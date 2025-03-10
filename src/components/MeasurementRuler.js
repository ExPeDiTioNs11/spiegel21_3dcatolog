import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Straighten } from '@mui/icons-material';

const MeasurementRuler = ({ isVisible, onToggle, className, sx }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <IconButton 
        onClick={onToggle}
        className={className}
        sx={{
          backgroundColor: isVisible ? 'primary.main' : 'background.paper',
          color: isVisible ? 'white' : 'primary.main',
          boxShadow: 2,
          '&:hover': {
            backgroundColor: isVisible ? 'primary.dark' : 'background.default',
          },
          ...sx
        }}
      >
        <Straighten />
      </IconButton>
    </Box>
  );
};

export default MeasurementRuler; 