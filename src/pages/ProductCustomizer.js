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
} from '@mui/material';
import Scene from '../components/Scene';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import LoadingScreen from '../components/LoadingScreen';
import { useLanguage } from '../i18n/LanguageContext';

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

const ProductCustomizer = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modelError, setModelError] = useState(null);
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

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const viewportHeight = window.innerHeight;
      setScrolled(offset > viewportHeight * 0.2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const basePrice = 2999;

  // Calculate price difference based on size changes
  const calculatePriceDifference = (width, height) => {
    const standardSize = (100 * 150);
    const newSize = (width * height);
    const priceDiff = basePrice * (newSize - standardSize) / standardSize;
    return Math.round(priceDiff);
  };

  // Calculate price difference based on color selection
  const calculateColorPriceDifference = (colorId) => {
    const color = colors.find(c => c.id === colorId);
    const priceDiff = basePrice * (color.priceMultiplier - 1);
    return Math.round(priceDiff);
  };

  // Calculate total price including size and color adjustments
  const calculatePrice = () => {
    const basePrice = 2999;
    const sizeMultiplier = (modelSettings.width * modelSettings.height) / (100 * 150);
    const colorMultiplier = modelSettings.color === 'gold' ? 1.2 : 1;
    return Math.round(basePrice * sizeMultiplier * colorMultiplier);
  };

  const handleSaveDesign = () => {
    localStorage.setItem(`savedDesign_${productId}`, JSON.stringify(modelSettings));
    setIsSaved(true);
  };

  const handleDeleteSavedDesign = () => {
    localStorage.removeItem(`savedDesign_${productId}`);
    setIsSaved(false);
    setActiveStep(0); // Go back to first step
  };

  const handleViewSavedDesigns = () => {
    navigate('/saved-designs');
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
                  {calculatePriceDifference(modelSettings.width, modelSettings.height) >= 0 ? '+' : ''}
                  {calculatePriceDifference(modelSettings.width, modelSettings.height).toLocaleString('tr-TR')} ₺
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
                             `${calculateColorPriceDifference(color.id).toLocaleString('tr-TR')} ₺`}
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
                {t('total')}: {calculatePrice().toLocaleString('tr-TR')} ₺
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
                    color="primary"
                    onClick={handleSaveDesign}
                    startIcon={<SaveIcon />}
                  >
                    {t('saveDesign')}
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteSavedDesign}
                    startIcon={<DeleteIcon />}
                  >
                    {t('deleteDesign')}
                  </Button>
                )}
                <Button
                  variant="outlined"
                  onClick={handleViewSavedDesigns}
                  startIcon={<FolderIcon />}
                >
                  {t('savedDesigns')}
                </Button>
              </Box>
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
              borderColor: '#008098',
              color: '#008098',
              '&:hover': {
                borderColor: '#006d7f',
                backgroundColor: 'rgba(0, 128, 152, 0.08)'
              },
              '&.Mui-disabled': {
                borderColor: '#e0e0e0'
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
              backgroundColor: '#008098',
              '&:hover': {
                backgroundColor: '#006d7f'
              },
              '&.Mui-disabled': {
                backgroundColor: '#e0e0e0'
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          bgcolor: '#fff'
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Model yükleniyor...
        </Typography>
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
    </Box>
  );
};

export default ProductCustomizer; 