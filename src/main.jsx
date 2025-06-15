import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { RegisterProvider } from "./context/RegisterContext.jsx";
import { ProductosProvider } from "./context/ProductosContext.jsx";
import { HomeProvider } from "./context/HomeContext.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <CartProvider>
          <RegisterProvider>
            <ProductosProvider>
              <HomeProvider>
                <AdminProvider>
                  <App />
                </AdminProvider>
              </HomeProvider>
            </ProductosProvider>
          </RegisterProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
