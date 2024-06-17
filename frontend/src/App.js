import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Products from './components/Products';
import Users from './components/Users';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';
import ProductDetails from './components/ProductDetails';
import NotFound from './components/NotFound';
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  const showSidebar = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <div style={{ display: 'flex' }}>
      {showSidebar && <Sidebar />}
      <div style={{ flex: 1, paddingLeft: showSidebar ? '240px' : '0' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path="/products/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute role="admin"><Users /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} /> {/* Ruta de comodín */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
