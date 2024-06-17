import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import api from '../services/api';

const EditProductModal = ({ open, handleClose, product, refreshProducts }) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);

  const handleSave = () => {
    api.put(`/products/${product.id}`, { name, description, price })
      .then(response => {
        refreshProducts();
        handleClose();
      })
      .catch(error => console.error('Error updating product:', error));
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
          <Typography variant="h6" mb={2}>Edit Product</Typography>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button onClick={handleClose} variant="contained" color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProductModal;
