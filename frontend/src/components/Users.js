import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination } from '@mui/material';
import api from '../services/api';
import EditUserRoleModal from './EditUserRoleModal';
import DeleteUserModal from './DeleteUserModal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editUser, setEditUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    api.get(`/users/all?page=${page + 1}&pageSize=${rowsPerPage}`)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const refreshUsers = () => {
    api.get(`/users/all?page=${page + 1}&pageSize=${rowsPerPage}`)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button onClick={() => setEditUser(user)}>Edit Role</Button>
                <Button onClick={() => setDeleteUserId(user.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {editUser && (
        <EditUserRoleModal
          open={Boolean(editUser)}
          handleClose={() => setEditUser(null)}
          user={editUser}
          refreshUsers={refreshUsers}
        />
      )}
      {deleteUserId && (
        <DeleteUserModal
          open={Boolean(deleteUserId)}
          handleClose={() => setDeleteUserId(null)}
          userId={deleteUserId}
          refreshUsers={refreshUsers}
        />
      )}
    </TableContainer>
  );
};

export default Users;
