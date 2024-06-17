import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination } from '@mui/material';
import api from '../services/api';
import EditProductModal from './EditProductModal';
import DeleteProductModal from './DeleteProductModal';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);

  useEffect(() => {
    api.get(`/products?page=${page + 1}&pageSize=${rowsPerPage}`)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const refreshProducts = () => {
    api.get(`/products?page=${page + 1}&pageSize=${rowsPerPage}`)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Button onClick={() => setEditProduct(product)}>Edit</Button>
                <Button onClick={() => setDeleteProductId(product.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {editProduct && (
        <EditProductModal
          open={Boolean(editProduct)}
          handleClose={() => setEditProduct(null)}
          product={editProduct}
          refreshProducts={refreshProducts}
        />
      )}
      {deleteProductId && (
        <DeleteProductModal
          open={Boolean(deleteProductId)}
          handleClose={() => setDeleteProductId(null)}
          productId={deleteProductId}
          refreshProducts={refreshProducts}
        />
      )}
    </TableContainer>
  );
};

export default Products;
