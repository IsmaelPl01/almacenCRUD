import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination, Box } from '@mui/material';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import EditProductModal from './EditProductModal';
import DeleteProductModal from './DeleteProductModal';
import AddProductModal from './AddProductModal'; // Importar el modal para añadir productos
import SearchBar from './SearchBar';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [addProductOpen, setAddProductOpen] = useState(false); // Estado para controlar la apertura del modal de añadir productos
  const navigate = useNavigate();

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
    <div>
      <SearchBar />
      <Box display="flex" justifyContent="flex-end" m={2}>
        <Button variant="contained" color="primary" onClick={() => setAddProductOpen(true)}>
          Add Product
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
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
                <TableCell>{new Date(product.createdAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(product.updatedAt).toLocaleString()}</TableCell>
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
        <AddProductModal
          open={addProductOpen}
          handleClose={() => setAddProductOpen(false)}
          refreshProducts={refreshProducts}
        />
      </TableContainer>
    </div>
  );
};

export default Products;
