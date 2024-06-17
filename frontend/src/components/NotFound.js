import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Typography variant="h4" mb={2}>Página No Disponible</Typography>
      <Typography variant="body1" mb={4}>La página que estás buscando no existe.</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/products')}>
        Volver a Productos
      </Button>
    </Box>
  );
};

export default NotFound;
