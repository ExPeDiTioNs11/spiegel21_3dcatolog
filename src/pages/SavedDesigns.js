import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const SavedDesigns = () => {
  const navigate = useNavigate();
  const [savedDesigns, setSavedDesigns] = useState([]);

  useEffect(() => {
    // Get all saved designs from localStorage
    const designs = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('savedDesign_')) {
        const productId = key.replace('savedDesign_', '');
        const design = JSON.parse(localStorage.getItem(key));
        designs.push({
          productId,
          ...design,
          savedAt: new Date().toLocaleDateString('tr-TR')
        });
      }
    }
    setSavedDesigns(designs);
  }, []);

  const handleDelete = (productId) => {
    localStorage.removeItem(`savedDesign_${productId}`);
    setSavedDesigns(prev => prev.filter(design => design.productId !== productId));
  };

  const handleEdit = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 6 }}>
        Kayıtlı Tasarımlarım
      </Typography>

      {savedDesigns.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          bgcolor: '#f5f5f5',
          borderRadius: 2
        }}>
          <Typography variant="h6" color="text.secondary">
            Henüz kayıtlı tasarımınız bulunmamaktadır.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Tasarıma Başla
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {savedDesigns.map((design) => (
            <Grid item xs={12} sm={6} md={4} key={design.productId}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Ayna Tasarımı #{design.productId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Boyutlar: {design.width}cm x {design.height}cm
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Renk: {design.color}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Kaydedilme Tarihi: {design.savedAt}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', gap: 1 }}>
                  <Button
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(design.productId)}
                    color="error"
                  >
                    Sil
                  </Button>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(design.productId)}
                    color="primary"
                  >
                    Düzenle
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default SavedDesigns; 