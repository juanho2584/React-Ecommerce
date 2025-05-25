import React from "react";
import { Navigate } from "react-router-dom";

function RutaProtegida({ isAuthenticated, children }) {
  
  if (!isAuthenticated) {
    return <Navigate to="/Registro" replace />;
  }
  return children;
}
export default RutaProtegida;
