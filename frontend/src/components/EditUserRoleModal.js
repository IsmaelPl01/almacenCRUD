import React, { useState } from 'react';
import { Modal, Box, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import api from '../services/api';

const EditUserRoleModal = ({ open, handleClose, user, refreshUsers }) => {
  const [role, setRole] = useState(user.role);

  const handleSave = () => {
    api.put(`/users/${user.id}`, { role })
      .then(response => {
        refreshUsers();
        handleClose();
      })
      .catch(error => console.error('Error updating user role:', error));
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
          <Typography variant="h6" mb={2}>Edit User Role</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="comun">Comun</MenuItem>
            </Select>
          </FormControl>
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

export default EditUserRoleModal;
