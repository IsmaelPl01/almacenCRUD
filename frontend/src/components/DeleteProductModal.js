import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import api from '../services/api';

const DeleteProductModal = ({ open, handleClose, productId, refreshProducts }) => {
  const handleDelete = () => {
    api.delete(`/products/${productId}`)
      .then(response => {
        refreshProducts();
        handleClose();
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="rgba(0, 0, 0, 0.5)"
      >
        <Box
          bgcolor="white"
          p={4}
          borderRadius={5}
          boxShadow={3}
          width={400}
        >
          <Typography variant="h6" mb={2}>Confirm Delete</Typography>
          <Typography variant="body1" mb={2}>Are you sure you want to delete this product?</Typography>
          <Box display="flex" justifyContent="space-between">
            <Button onClick={handleClose} variant="contained" color="secondary">
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="contained" color="primary">
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteProductModal;
