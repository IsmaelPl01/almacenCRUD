import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  try {
    const user = jwtDecode(token);
    const isAuthenticated = user && user.exp * 1000 > Date.now();
    const userRole =
      user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const hasRole = role ? userRole === role : true;
    if (isAuthenticated && hasRole) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error("Token decoding error:", error);
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
