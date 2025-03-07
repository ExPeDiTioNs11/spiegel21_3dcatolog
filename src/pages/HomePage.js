import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const products = [
  {
    id: 'Bolnuevo',
    modelName: 'Bolnuevo',
    name: 'Bolnuevo',
    description: 'Modern tasarım ayna',
    price: 2999,
    image: '/images/modern-mirror.jpg'
  },
  {
    id: 'm01l2v',
    modelName: 'm01l2v',
    name: 'Classic',
    description: 'Klasik tasarım ayna',
    price: 3499,
    image: '/images/classic-mirror.jpg'
  },
  {
    id: 'SimpleMirror',
    modelName: 'SimpleMirror',
    name: 'Simple',
    description: 'Sade tasarım ayna',
    price: 2499,
    image: '/images/simple-mirror.jpg'
  }
];

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simüle edilmiş yükleme süresi
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const heroSection = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, delay: 0.2 }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          bgcolor: '#f5f5f5',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div {...heroSection}>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: '#008098'
                  }}
                >
                  Spiegel21
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 4,
                    color: '#333'
                  }}
                >
                  {t('heroTitle')}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    color: '#666',
                    fontSize: '1.2rem'
                  }}
                >
                  {t('heroDescription')}
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div {...fadeIn}>
                <Box
                  component="img"
                  src="/images/bad-nach-mass.jpg"
                  alt="Luxury Mirror"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: 3
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Products Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ mb: 6 }}
        >
          {t('ourProducts')}
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      transition: 'transform 0.3s ease-in-out',
                    }
                  }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {isLoading ? (
                    <Box
                      sx={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#f5f5f5'
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : (
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.name}
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {product.price.toLocaleString('tr-TR')} ₺
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 2,
                        bgcolor: '#008098',
                        '&:hover': {
                          bgcolor: '#006d7f'
                        }
                      }}
                    >
                      {t('startDesigning')}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 6 }}
          >
            {t('featuresTitle')}
          </Typography>
          <Grid container spacing={4}>
            {[1, 2, 3].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      bgcolor: 'transparent',
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    <Typography variant="h5" gutterBottom>
                      {t(`feature${item}Title`)}
                    </Typography>
                    <Typography color="text.secondary">
                      {t(`feature${item}Description`)}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HomePage; 