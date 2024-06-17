import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Alert } from '@mui/material';
import api from '../services/api';

const AddProductModal = ({ open, handleClose, refreshProducts }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    api.post('/products', { name, description, price, stock })
      .then(response => {
        refreshProducts();
        handleClose();
      })
      .catch(error => {
        console.error('Error adding product:', error);
        setError('Failed to add product. Please try again.');
      });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, bgcolor: 'background.paper', margin: 'auto', maxWidth: 400 }}>
        <h2>Add New Product</h2>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          fullWidth
          margin="normal"
        />
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          fullWidth
          margin="normal"
        />
        <TextField
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          label="Price"
          type="number"
          fullWidth
          margin="normal"
        />
        <TextField
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          label="Stock"
          type="number"
          fullWidth
          margin="normal"
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddProductModal;
