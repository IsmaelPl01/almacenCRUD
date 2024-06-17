import React, { useState } from 'react';
import { Modal, Box, Button, Alert } from '@mui/material';
import api from '../services/api';

const DeleteProductModal = ({ open, handleClose, productId, refreshProducts }) => {
  const [error, setError] = useState('');

  const handleDelete = () => {
    api.delete(`/products/${productId}`)
      .then(response => {
        refreshProducts();
        handleClose();
      })
      .catch(error => {
        console.error('Error deleting product:', error);
        setError('Failed to delete product. Please try again.');
      });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, bgcolor: 'background.paper', margin: 'auto', maxWidth: 400 }}>
        <h2>Confirm Delete</h2>
        {error && <Alert severity="error">{error}</Alert>}
        <p>Are you sure you want to delete this product?</p>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteProductModal;
