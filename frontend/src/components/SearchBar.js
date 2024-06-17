import React, { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() === '') {
      setError('Search parameter cannot be empty.');
      return;
    }

    api.get(`/products/search?name=${query}`)
      .then(response => {
        if (response.data.length > 0) {
          navigate(`/products/${response.data[0].id}`);
        } else {
          setError('Product not found');
        }
      })
      .catch(error => {
        console.error('Error searching product:', error);
        setError('Failed to search product. Please try again.');
      });
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      {error && <Alert severity="error">{error}</Alert>}
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          label="Search Product"
          variant="outlined"
        />
        <Button onClick={handleSearch} variant="contained" color="primary" sx={{ ml: 2 }}>
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;
