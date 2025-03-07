import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'white',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: '#008098',
            mb: 4,
            textAlign: 'center'
          }}
        >
          Spiegel21
        </Typography>
      </motion.div>
      
      <Box sx={{ position: 'relative' }}>
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: '#008098',
            position: 'absolute',
            left: '50%',
            marginLeft: '-30px',
          }}
        />
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: 'rgba(0, 128, 152, 0.2)',
            position: 'absolute',
            left: '50%',
            marginLeft: '-30px',
            animation: 'none',
          }}
          variant="determinate"
          value={100}
        />
      </Box>
    </Box>
  );
};

export default LoadingScreen; 