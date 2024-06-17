import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    api.get(`/products?name=${query}`)
      .then(response => {
        if (response.data.length > 0) {
          navigate(`/products/${response.data[0].id}`);
        } else {
          alert('Product not found');
        }
      })
      .catch(error => console.error('Error searching product:', error));
  };

  return (
    <Box display="flex" alignItems="center">
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        label="Search Product"
        variant="outlined"
      />
      <Button onClick={handleSearch} variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
