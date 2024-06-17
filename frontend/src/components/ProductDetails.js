import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import api from '../services/api';
import EditProductModal from './EditProductModal';
import DeleteProductModal from './DeleteProductModal';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [id]);

  const refreshProduct = () => {
    api.get(`/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product details:', error));
  };

  if (!product) return <p>Loading...</p>;

  return (
    <Box>
      <Typography variant="h4">{product.name}</Typography>
      <Typography variant="body1">{product.description}</Typography>
      <Typography variant="body1">Price: {product.price}</Typography>
      <Typography variant="body1">Stock: {product.stock}</Typography>
      <Button onClick={() => setEditProduct(product)}>Edit</Button>
      <Button onClick={() => setDeleteProductId(product.id)}>Delete</Button>
      <Button onClick={() => navigate('/products')}>Back to Products</Button>
      {editProduct && (
        <EditProductModal
          open={Boolean(editProduct)}
          handleClose={() => setEditProduct(null)}
          product={editProduct}
          refreshProducts={refreshProduct}
        />
      )}
      {deleteProductId && (
        <DeleteProductModal
          open={Boolean(deleteProductId)}
          handleClose={() => setDeleteProductId(null)}
          productId={deleteProductId}
          refreshProducts={() => navigate('/products')}
        />
      )}
    </Box>
  );
};

export default ProductDetails;
