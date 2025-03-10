import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Fab,
  Tooltip,
  IconButton,
} from '@mui/material';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SensorsIcon from '@mui/icons-material/Sensors';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import HandymanIcon from '@mui/icons-material/Handyman';
import PaletteIcon from '@mui/icons-material/Palette';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useProducts } from '../context/ProductContext';

// Feature icons mapping
const featureIcons = {
  ledLighting: LightbulbIcon,
  antiFog: WaterDropIcon,
  smartSensor: SensorsIcon,
  bluetoothSpeaker: BluetoothIcon,
  minimalDesign: DesignServicesIcon,
  easyMount: HandymanIcon,
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

// Slider data
const getSliderContent = (t) => [
  {
    type: 'image',
    src: '/images/bad-nach-mass.jpg',
    title: t('modernMirrorsTitle'),
    description: t('modernMirrorsDesc')
  },
  {
    type: 'image',
    src: '/images/modern-mirror.jpg',
    title: t('smartMirrorsTitle'),
    description: t('smartMirrorsDesc')
  }
];

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { scrollY } = useScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { getProductsByCategory } = useProducts();

  // Get translated content
  const sliderContent = getSliderContent(t);
  
  // get mirrors products
  const mirrors = getProductsByCategory('mirrors');

  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const heroY = useTransform(scrollY, [0, 300], [0, 50]);
  
  // Enhanced parallax effects
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -150]);
  const productsOpacity = useTransform(scrollY, [300, 600], [0, 1]);
  const productsY = useTransform(scrollY, [300, 600], [100, 0]);

  // Auto slide change
  useEffect(() => {
    let slideInterval;
    if (isAutoPlaying) {
      slideInterval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
      }, 5000);
    }
    return () => clearInterval(slideInterval);
  }, [isAutoPlaying]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleProductClick = (productId) => {
    window.scrollTo(0, 0); // Reset scroll position before navigation
    navigate(`/product/${productId}`);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
    setIsAutoPlaying(false);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderContent.length) % sliderContent.length);
    setIsAutoPlaying(false);
  };

  const renderSlideContent = (slide) => {
    switch (slide.type) {
      case 'video':
        return (
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <source src={slide.src} type="video/mp4" />
          </video>
        );
      case 'gif':
        return (
          <img
            src={slide.src}
            alt={slide.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        );
      default:
        return (
          <img
            src={slide.src}
            alt={slide.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        );
    }
  };

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: '100vh',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          bgcolor: '#000',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            {renderSlideContent(sliderContent[currentSlide])}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Container maxWidth="xl">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '4rem' },
                      fontWeight: 700,
                      mb: 3,
                      color: '#fff',
                      textAlign: 'center',
                    }}
                  >
                    {sliderContent[currentSlide].title}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: '1.2rem', md: '1.5rem' },
                      mb: 4,
                      color: '#fff',
                      textAlign: 'center',
                      fontWeight: 400,
                    }}
                  >
                    {sliderContent[currentSlide].description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => navigate('/product/Bolnuevo')}
                      sx={{
                        bgcolor: '#008098',
                        color: '#fff',
                        py: 2,
                        px: 4,
                        borderRadius: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: '#00907d',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 8px rgba(0, 128, 152, 0.2)'
                        }
                      }}
                    >
                      {t('startDesigning')}
                    </Button>
                  </Box>
                </motion.div>
              </Container>
            </Box>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <IconButton
          onClick={handlePrevSlide}
          sx={{
            position: 'absolute',
            left: { xs: 16, md: 32 },
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#fff',
            bgcolor: 'rgba(0,0,0,0.3)',
            '&:hover': {
              bgcolor: 'rgba(0,0,0,0.5)',
            }
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
        <IconButton
          onClick={handleNextSlide}
          sx={{
            position: 'absolute',
            right: { xs: 16, md: 32 },
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#fff',
            bgcolor: 'rgba(0,0,0,0.3)',
            '&:hover': {
              bgcolor: 'rgba(0,0,0,0.5)',
            }
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>

        {/* Slide Indicators */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 2,
          }}
        >
          {sliderContent.map((_, index) => (
            <Box
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
              }}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: currentSlide === index ? '#fff' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: '#fff',
                }
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Products Section */}
      <motion.div
        style={{
          opacity: productsOpacity,
          y: productsY
        }}
      >
        <Box 
          sx={{ 
            bgcolor: '#fff', 
            py: { xs: 8, md: 12 },
            position: 'relative',
            zIndex: 2
          }}
        >
          <Container maxWidth="xl">
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                mb: 6,
                textAlign: 'center',
                color: '#1a1a1a'
              }}
            >
              {t('ourProducts')}
            </Typography>
            <Grid container spacing={4}>
              {mirrors.map((product, index) => (
                <Grid item xs={12} md={4} key={product.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        bgcolor: '#fff',
                        height: '100%',
                        cursor: 'pointer',
                        position: 'relative',
                        zIndex: 3,
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)'
                        }
                      }}
                      onClick={() => handleProductClick(product.id)}
                    >
                      <Box 
                        sx={{ 
                          overflow: 'hidden', 
                          mb: 3,
                          borderRadius: 2,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      >
                        <CardMedia
                          component="img"
                          height={400}
                          image={product.thumbnail}
                          alt={product.name}
                          loading="lazy"
                          sx={{
                            transition: 'transform 0.6s ease-in-out',
                            '&:hover': {
                              transform: 'scale(1.05)'
                            }
                          }}
                        />
                      </Box>
                      <CardContent 
                        sx={{ 
                          p: 2,
                          bgcolor: '#fff',
                          borderRadius: 2,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                        }}
                      >
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                          {product.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                          {product.description}
                        </Typography>
                        <Box sx={{ 
                          mt: 2, 
                          display: 'flex', 
                          flexWrap: 'wrap', 
                          gap: 1,
                          mb: 2
                        }}>
                          {product.features.map((feature, idx) => {
                            const Icon = featureIcons[feature];
                            return (
                              <Tooltip key={idx} title={t(feature)} arrow>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    bgcolor: 'rgba(0,0,0,0.05)',
                                    borderRadius: 2,
                                    p: 1,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      bgcolor: 'rgba(0,0,0,0.1)',
                                    }
                                  }}
                                >
                                  {Icon && <Icon sx={{ fontSize: 20, color: '#1a1a1a' }} />}
                                </Box>
                              </Tooltip>
                            );
                          })}
                        </Box>
                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mt: 'auto',
                          pt: 2,
                          borderTop: '1px solid rgba(0,0,0,0.1)'
                        }}>
                          <Typography
                            variant="h6"
                            sx={{
                              color: '#1a1a1a',
                              fontWeight: 600
                            }}
                          >
                            {formatPrice(product.price)}
                          </Typography>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              color: '#008098',
                              borderColor: '#008098',
                              '&:hover': {
                                borderColor: '#00907d',
                                bgcolor: 'rgba(0,128,152,0.05)'
                              }
                            }}
                          >
                            {t('details')}
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </motion.div>

      {/* Features Section with enhanced parallax */}
      <motion.div 
        style={{ y: parallaxY }}
        sx={{ position: 'relative', zIndex: 1 }}
      >
        <Features />
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
    </Box>
  );
};

// Features section
const Features = () => {
  const { t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: PaletteIcon,
      title: t('feature1Title'),
      description: t('feature1Description'),
      color: '#008098'
    },
    {
      icon: VerifiedIcon,
      title: t('feature2Title'),
      description: t('feature2Description'),
      color: '#008098'
    },
    {
      icon: LocalShippingIcon,
      title: t('feature3Title'),
      description: t('feature3Description'),
      color: '#008098'
    }
  ];

  return (
    <Box sx={{ py: 8, bgcolor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            fontWeight: 600,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          {t('featuresTitle')}
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    bgcolor: `${feature.color}15`,
                    color: feature.color
                  }}
                >
                  <feature.icon sx={{ fontSize: 40 }} />
                </Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    maxWidth: 300,
                    mx: 'auto'
                  }}
                >
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage; 