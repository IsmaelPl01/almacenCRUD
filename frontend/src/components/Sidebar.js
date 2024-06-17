import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Drawer } from '@mui/material';
import {jwtDecode} from 'jwt-decode';

const Sidebar = () => {
  const token = localStorage.getItem('token');
  let userRole = null;

  if (token) {
    try {
      const user = jwtDecode(token);
      userRole = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    } catch (error) {
      console.error('Token decoding error:', error);
    }
  }

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItem button component={Link} to="/products">
          <ListItemText primary="Productos" />
        </ListItem>
        {userRole === 'admin' && (
          <ListItem button component={Link} to="/users">
            <ListItemText primary="Usuarios" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
