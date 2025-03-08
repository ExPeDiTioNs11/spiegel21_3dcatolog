import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Container,
  Grid,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Slider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Fab,
} from '@mui/material';
import Scene from '../components/Scene';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LoadingScreen from '../components/LoadingScreen';
import { useLanguage } from '../i18n/LanguageContext';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const steps = ['sizeSettings', 'colorSelection', 'accessories', 'summary'];

const colors = [
  { id: 'silver', name: 'silver', value: '#C0C0C0', priceMultiplier: 1 },
  { id: 'gold', name: 'gold', value: '#FFD700', priceMultiplier: 1.2 },
  { id: 'bronze', name: 'bronze', value: '#CD7F32', priceMultiplier: 1.1 },
];

// Example product details
const productDetails = {
  features: [
    {
      title: "ledLighting",
      description: "ledDescription",
      image: "https://placehold.co/600x400/e0e0e0/808080/png?text=LED+Lighting"
    },
    {
      title: "antiFog",
      description: "antiFogDescription",
      image: "https://placehold.co/600x400/e0e0e0/808080/png?text=Anti+Fog"
    },
    {
      title: "smartSensor",
      description: "smartSensorDescription",
      image: "https://placehold.co/600x400/e0e0e0/808080/png?text=Smart+Sensor"
    }
  ],
  gallery: [
    {
      image: "https://placehold.co/800x600/ffffff/808080/png?text=Living+Room",
      caption: "livingRoom",
      size: 8
    },
    {
      image: "https://placehold.co/400x300/ffffff/808080/png?text=Detail+1",
      caption: "detailView1",
      size: 4
    },
    {
      image: "https://placehold.co/400x300/ffffff/808080/png?text=Detail+2",
      caption: "detailView2",
      size: 4
    },
    {
      image: "https://placehold.co/400x300/ffffff/808080/png?text=Detail+3",
      caption: "detailView3",
      size: 4
    }
  ]
};

const buttonStyles = {
  primary: {
    bgcolor: '#008098',
    color: '#fff',
    transition: 'all 0.3s ease',
    '&:hover': {
      bgcolor: '#00907d',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0, 128, 152, 0.2)'
    }
  },
  outlined: {
    color: '#008098',
    borderColor: '#008098',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: '#00907d',
      color: '#00907d',
      bgcolor: 'rgba(0, 144, 125, 0.08)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0, 128, 152, 0.1)'
    }
  }
};

// Add price formatter function
const formatPrice = (price) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

const formatPriceDifference = (priceDiff) => {
  const sign = priceDiff >= 0 ? '+' : '';
  return sign + formatPrice(priceDiff);
};

const ProductCustomizer = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHumanLoading, setIsHumanLoading] = useState(false);
  const [modelError, setModelError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showHuman, setShowHuman] = useState(false);
  const [humanGender, setHumanGender] = useState('male');
  const [humanHeight, setHumanHeight] = useState(170);
  const [modelSettings, setModelSettings] = useState({
    width: 100,
    height: 150,
    scaleX: 1.0,
    scaleY: 1.5,
    scaleZ: 0.1,
    color: colors[0].id,
  });

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Reset scroll position when component mounts
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const offset = window.scrollY;
      const viewportHeight = window.innerHeight;
      setScrolled(offset > viewportHeight * 0.2);
      setShowScrollTop(offset > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this only runs once on mount

  useEffect(() => {
    const initializeProduct = async () => {
      setIsLoading(true);
      setModelError(null);
      try {
        // Check if there's a saved design
        const savedDesign = localStorage.getItem(`savedDesign_${productId}`);
        if (savedDesign) {
          const design = JSON.parse(savedDesign);
          setModelSettings(design);
          setIsSaved(true);
          setActiveStep(steps.length - 1);
        }
        // Simulate loading time for 3D model
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error('Error loading product:', error);
        setModelError('Ürün yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeProduct();
  }, [productId]);

  useEffect(() => {
    // Sayfa yükleme efekti
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleWidthChange = (event, newValue) => {
    setModelSettings(prev => ({
      ...prev,
      width: newValue,
      scaleX: newValue / 100
    }));
  };

  const handleHeightChange = (event, newValue) => {
    setModelSettings(prev => ({
      ...prev,
      height: newValue,
      scaleY: newValue / 100
    }));
  };

  const handleColorChange = (event) => {
    setModelSettings(prev => ({
      ...prev,
      color: event.target.value,
    }));
  };

  // Update base price to Euro
  const basePrice = 299;

  // Update price calculations
  const calculatePriceDifference = (width, height) => {
    const standardSize = (100 * 150);
    const newSize = (width * height);
    const priceDiff = basePrice * (newSize - standardSize) / standardSize;
    return Math.round(priceDiff);
  };

  const calculateColorPriceDifference = (colorId) => {
    const color = colors.find(c => c.id === colorId);
    const priceDiff = basePrice * (color.priceMultiplier - 1);
    return Math.round(priceDiff);
  };

  const calculatePrice = () => {
    const sizeMultiplier = (modelSettings.width * modelSettings.height) / (100 * 150);
    const colorMultiplier = colors.find(c => c.id === modelSettings.color)?.priceMultiplier || 1;
    return Math.round(basePrice * sizeMultiplier * colorMultiplier);
  };

  const handleSaveDesign = () => {
    localStorage.setItem(`savedDesign_${productId}`, JSON.stringify(modelSettings));
    setIsSaved(true);
    setOpenDialog(true);
  };

  const handleDeleteSavedDesign = () => {
    localStorage.removeItem(`savedDesign_${productId}`);
    setIsSaved(false);
    setActiveStep(0);
  };

  const handleViewSavedDesigns = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleNavigateToSavedDesigns = () => {
    setOpenDialog(false);
    navigate('/saved-designs');
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleShowHuman = () => {
    setIsHumanLoading(true);
    setShowHuman(!showHuman);
    // İnsan modeli yüklenme simülasyonu
    setTimeout(() => {
      setIsHumanLoading(false);
    }, 1000);
  };

  const renderStepContent = (step) => {
    const content = (() => {
      switch (step) {
        case 0:
          return (
            <Box sx={{ p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3
              }}>
                <Typography variant="h6">
                  {t('sizeSettings')}
                </Typography>
                <Typography 
                  sx={{ 
                    color: calculatePriceDifference(modelSettings.width, modelSettings.height) >= 0 ? 'success.main' : 'error.main',
                    fontWeight: 'medium'
                  }}
                >
                  {formatPriceDifference(calculatePriceDifference(modelSettings.width, modelSettings.height))}
                </Typography>
              </Box>

              <Typography variant="body1" gutterBottom>
                {t('width')} (cm)
              </Typography>
              <Box sx={{ mb: 4 }}>
                <Slider
                  value={modelSettings.width}
                  onChange={handleWidthChange}
                  min={50}
                  max={200}
                  step={1}
                  marks={[
                    { value: 50, label: '50cm' },
                    { value: 100, label: '100cm' },
                    { value: 150, label: '150cm' },
                    { value: 200, label: '200cm' },
                  ]}
                  valueLabelDisplay="auto"
                  sx={{
                    '& .MuiSlider-rail': {
                      backgroundColor: '#e0e0e0',
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: '#008098',
                    },
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#008098',
                    },
                    '& .MuiSlider-mark': {
                      backgroundColor: '#e0e0e0',
                    },
                    '& .MuiSlider-markActive': {
                      backgroundColor: '#008098',
                    },
                    '& .MuiSlider-valueLabel': {
                      backgroundColor: '#008098',
                    }
                  }}
                />
                <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
                  Selected width: {modelSettings.width} cm
                </Typography>
              </Box>

              <Typography variant="body1" gutterBottom>
                {t('height')} (cm)
              </Typography>
              <Box>
                <Slider
                  value={modelSettings.height}
                  onChange={handleHeightChange}
                  min={75}
                  max={250}
                  step={1}
                  marks={[
                    { value: 75, label: '75cm' },
                    { value: 150, label: '150cm' },
                    { value: 200, label: '200cm' },
                    { value: 250, label: '250cm' },
                  ]}
                  valueLabelDisplay="auto"
                  sx={{
                    '& .MuiSlider-rail': {
                      backgroundColor: '#e0e0e0',
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: '#008098',
                    },
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#008098',
                    },
                    '& .MuiSlider-mark': {
                      backgroundColor: '#e0e0e0',
                    },
                    '& .MuiSlider-markActive': {
                      backgroundColor: '#008098',
                    },
                    '& .MuiSlider-valueLabel': {
                      backgroundColor: '#008098',
                    }
                  }}
                />
                <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
                  Selected height: {modelSettings.height} cm
                </Typography>
              </Box>
            </Box>
          );
        case 1:
          return (
            <Box sx={{ p: 3 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">{t('colorSelection')}</FormLabel>
                <RadioGroup value={modelSettings.color} onChange={handleColorChange}>
                  {colors.map((color) => (
                    <FormControlLabel
                      key={color.id}
                      value={color.id}
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                backgroundColor: color.value,
                                mr: 1,
                                border: '1px solid #ccc',
                              }}
                            />
                            {t(color.name)}
                          </Box>
                          <Typography 
                            sx={{ 
                              ml: 2,
                              color: calculateColorPriceDifference(color.id) > 0 ? 'success.main' : 
                                    calculateColorPriceDifference(color.id) < 0 ? 'error.main' : 'text.primary'
                            }}
                          >
                            {calculateColorPriceDifference(color.id) > 0 ? '+' : ''}
                            {calculateColorPriceDifference(color.id) === 0 ? t('standard') : 
                             formatPrice(calculateColorPriceDifference(color.id))}
                          </Typography>
                        </Box>
                      }
                      sx={{ width: '100%' }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
          );
        case 2:
          return (
            <Box sx={{ p: 3 }}>
              <Typography variant="body1">
                {t('comingSoon')}
              </Typography>
            </Box>
          );
        case 3:
          return (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                {t('selectedFeatures')}
              </Typography>
              <Typography>
                {t('dimensions')}: {modelSettings.width}cm x {modelSettings.height}cm
              </Typography>
              <Typography>
                {t('color')}: {t(colors.find(c => c.id === modelSettings.color)?.name)}
              </Typography>
              <Typography variant="h5" sx={{ mt: 3, mb: 4 }}>
                {t('total')}: {formatPrice(calculatePrice())}
              </Typography>

              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                flexWrap: 'wrap',
                borderTop: '1px solid #e0e0e0',
                pt: 3
              }}>
                {!isSaved ? (
                  <Button
                    variant="outlined"
                    onClick={handleSaveDesign}
                    startIcon={<FavoriteBorderIcon />}
                    sx={buttonStyles.outlined}
                  >
                    {t('saveDesign')}
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteSavedDesign}
                    startIcon={<FavoriteIcon />}
                    sx={{
                      color: '#d32f2f',
                      borderColor: '#d32f2f',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: '#c62828',
                        borderColor: '#c62828',
                        bgcolor: 'rgba(211, 47, 47, 0.08)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(211, 47, 47, 0.1)'
                      }
                    }}
                  >
                    {t('deleteDesign')}
                  </Button>
                )}
              </Box>

              {/* Confirmation Dialog */}
              <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {t('savedDesigns')}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {t('viewSavedDesignsMessage')}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button 
                    onClick={handleDialogClose} 
                    sx={buttonStyles.outlined}
                  >
                    {t('no')}
                  </Button>
                  <Button 
                    onClick={handleNavigateToSavedDesigns} 
                    variant="contained"
                    sx={buttonStyles.primary}
                    autoFocus
                  >
                    {t('yes')}
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          );
        default:
          return null;
      }
    })();

    return (
      <Box>
        {content}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mt: 3,
          pt: 2,
          borderTop: '1px solid #e0e0e0'
        }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            sx={{
              ...buttonStyles.outlined,
              '&.Mui-disabled': {
                borderColor: '#e0e0e0',
                color: '#e0e0e0'
              }
            }}
          >
            {t('back')}
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
            sx={{
              ...buttonStyles.primary,
              '&.Mui-disabled': {
                bgcolor: '#e0e0e0',
                color: '#fff'
              }
            }}
          >
            {activeStep === steps.length - 1 ? t('buyNow') : t('next')}
          </Button>
        </Box>
      </Box>
    );
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff'
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: theme => theme.palette.primary.main,
            fontWeight: 'bold',
            marginBottom: 3,
            '@keyframes pulse': {
              '0%': {
                opacity: 1,
                transform: 'scale(1)'
              },
              '50%': {
                opacity: 0.7,
                transform: 'scale(1.05)'
              },
              '100%': {
                opacity: 1,
                transform: 'scale(1)'
              }
            },
            animation: 'pulse 2s infinite ease-in-out'
          }}
        >
          Spiegel21
        </Typography>
        <CircularProgress 
          color="primary"
          size={50}
          sx={{
            color: '#008098'
          }}
        />
      </Box>
    );
  }

  if (modelError) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          bgcolor: '#fff'
        }}
      >
        <Typography variant="h6" color="error" align="center">
          {modelError}
        </Typography>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Yeniden Dene
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      {/* Configuration Section - Full Screen */}
      <Box 
        sx={{ 
          width: '100%', 
          height: '85vh',
          minHeight: '600px',
          maxHeight: '900px',
          bgcolor: '#f5f5f5',
          position: 'relative',
          overflow: 'hidden',
          py: 4
        }}
      >
        <Grid 
          container 
          spacing={2} 
          sx={{ 
            height: '100%',
            px: isDesktop ? 2 : 1
          }}
        >
          {/* 3D Model Viewer */}
          <Grid item xs={12} md={8} sx={{ 
            height: isDesktop ? '100%' : '50vh',
            minHeight: isDesktop ? 'auto' : '400px'
          }}>
            <Box sx={{ height: '100%', position: 'relative' }}>
              <Scene selectedModel={productId} modelSettings={modelSettings} />
            </Box>
          </Grid>

          {/* Configuration Options */}
          <Grid item xs={12} md={4} sx={{ 
            height: isDesktop ? '100%' : 'auto',
            mt: isDesktop ? 0 : 2
          }}>
            <Paper sx={{ 
              height: '100%', 
              overflow: 'auto',
              boxShadow: 'none',
              bgcolor: 'transparent'
            }}>
              <Box sx={{ 
                display: 'flex', 
                height: '100%',
                flexDirection: isDesktop ? 'row' : 'column'
              }}>
                {/* Left side - Stepper */}
                <Box sx={{ 
                  width: isDesktop ? '200px' : '100%',
                  pr: isDesktop ? 2 : 0,
                  pt: 2,
                  mb: isDesktop ? 0 : 2
                }}>
                  <Stepper 
                    activeStep={activeStep} 
                    orientation={isDesktop ? "vertical" : "horizontal"}
                    sx={{
                      '& .MuiStepLabel-root': {
                        py: 1
                      },
                      '& .MuiStepIcon-root': {
                        marginLeft: 'auto',
                        color: '#e0e0e0',
                        '&.Mui-active': {
                          color: '#008098',
                          '@keyframes pulse': {
                            '0%': {
                              transform: 'scale(1)',
                              boxShadow: '0 0 0 0 rgba(0, 128, 152, 0.7)',
                            },
                            '70%': {
                              transform: 'scale(1.1)',
                              boxShadow: '0 0 0 10px rgba(0, 128, 152, 0)',
                            },
                            '100%': {
                              transform: 'scale(1)',
                              boxShadow: '0 0 0 0 rgba(0, 128, 152, 0)',
                            },
                          },
                          animation: 'pulse 2s infinite',
                          borderRadius: '50%'
                        },
                        '&.Mui-completed': {
                          color: '#008098'
                        }
                      },
                      '& .MuiStepLabel-labelContainer': {
                        marginRight: 'auto',
                        order: -1,
                        marginLeft: 0,
                        paddingRight: 1
                      },
                      '& .MuiStepConnector-line': {
                        borderColor: '#e0e0e0',
                        marginLeft: 'auto'
                      },
                      '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
                        borderColor: '#008098'
                      },
                      '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
                        borderColor: '#008098'
                      },
                      '& .MuiStepLabel-label': {
                        color: '#666',
                        '&.Mui-active': {
                          color: '#008098',
                          fontWeight: 'bold'
                        },
                        '&.Mui-completed': {
                          color: '#008098'
                        }
                      }
                    }}
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{t(label)}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>

                {/* Right side - Content */}
                <Box sx={{ 
                  flex: 1,
                  pl: isDesktop ? 3 : 0,
                  pr: isDesktop ? 2 : 0,
                  pt: isDesktop ? 2 : 0
                }}>
                  {/* Content area */}
                  <Box sx={{ flex: 1 }}>
                    {renderStepContent(activeStep)}
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Product Details and Gallery - Animated */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: scrolled ? 1 : 0, 
          y: scrolled ? 0 : 50 
        }}
        transition={{ duration: 0.5 }}
      >
        <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: scrolled ? 1 : 0, 
              y: scrolled ? 0 : 30 
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 6 }}>
              {t('productFeatures')}
            </Typography>
            <Grid container spacing={4} sx={{ mb: 8 }}>
              {productDetails.features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: scrolled ? 1 : 0, 
                      y: scrolled ? 0 : 20 
                    }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <Paper sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                      <Box
                        component="img"
                        src={feature.image}
                        alt={t(feature.title)}
                        sx={{
                          width: '100%',
                          height: 200,
                          objectFit: 'cover',
                          borderRadius: 1,
                          mb: 2
                        }}
                      />
                      <Typography variant="h6" gutterBottom>
                        {t(feature.title)}
                      </Typography>
                      <Typography color="text.secondary">
                        {t(feature.description)}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          <Divider sx={{ my: 8 }} />

          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: scrolled ? 1 : 0, 
              y: scrolled ? 0 : 30 
            }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 6 }}>
              {t('productGallery')}
            </Typography>
            <Grid container spacing={2}>
              {productDetails.gallery.map((item, index) => (
                <Grid item xs={12} md={item.size} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: scrolled ? 1 : 0, 
                      y: scrolled ? 0 : 20 
                    }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <Paper 
                      elevation={0}
                      sx={{ 
                        p: 0,
                        height: index === 0 ? '600px' : '300px',
                        overflow: 'hidden',
                        borderRadius: 2,
                        position: 'relative',
                        '&:hover img': {
                          transform: 'scale(1.05)',
                        }
                      }}
                    >
                      <Box
                        component="img"
                        src={item.image}
                        alt={t(item.caption)}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease-in-out'
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          p: 2,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ color: 'white' }}>
                          {t(item.caption)}
                        </Typography>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll to Top Button */}
      <Fab
        color="primary"
        size="large"
        onClick={handleScrollTop}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          opacity: showScrollTop ? 1 : 0,
          transition: 'all 0.3s ease',
          bgcolor: '#008098',
          '&:hover': {
            bgcolor: '#00907d',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0, 128, 152, 0.2)'
          },
          zIndex: 1000
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>

      {/* İnsan modeli container'ı */}
      <Box sx={{ position: 'relative' }}>
        {showHuman && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              backgroundColor: 'white',
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
              zIndex: 900
            }}
          >
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <FormLabel component="legend">{t('gender')}</FormLabel>
              <RadioGroup 
                row 
                value={humanGender}
                onChange={(e) => setHumanGender(e.target.value)}
              >
                <FormControlLabel value="male" control={<Radio />} label={t('male')} />
                <FormControlLabel value="female" control={<Radio />} label={t('female')} />
              </RadioGroup>
            </FormControl>
            <Box sx={{ width: '100%', mb: 2 }}>
              <Typography gutterBottom>{t('humanHeight')}</Typography>
              <Slider
                value={humanHeight}
                onChange={(e, newValue) => setHumanHeight(newValue)}
                min={150}
                max={200}
                step={1}
                valueLabelDisplay="auto"
                sx={{
                  '& .MuiSlider-rail': {
                    backgroundColor: '#e0e0e0',
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#008098',
                  },
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#008098',
                  }
                }}
              />
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
                {humanHeight} cm
              </Typography>
            </Box>
            <Button
              variant="outlined"
              onClick={() => setShowHuman(false)}
              fullWidth
              sx={buttonStyles.outlined}
            >
              {t('showHuman')}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductCustomizer; 