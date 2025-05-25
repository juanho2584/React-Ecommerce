import React, { useState } from "react";
import Home from "./Layout/Home";
import { Routes, Route } from "react-router-dom";
import NotFound from "./Layout/NotFound";
import Registro from "./Layout/Registro";
import Productos from "./Layout/Productos";
import ScrollToTop from "./components/ScrollToTop";
import Admin from "./Layout/Admin";
import ProductModal from "./components/ProductModal";
import RutaProtegidas from "./auth/RutaProtegidas";
import "./EstilosGenerales.css";

function App() {
  const [isAuthenticated, setIsAuth] = useState(false);
  const [cart, setCart] = useState([]);
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home cart={cart} handleAddToCart={handleAddToCart} />}/>
        <Route path="/Productos"element={<Productos cart={cart} handleAddToCart={handleAddToCart} />}/>
        <Route path="/Producto/:id" element={<ProductModal />} />
        <Route path="/Registro" element={<Registro/>} />
        <Route path="/Admin" element={<RutaProtegidas isAuthenticated={isAuthenticated}> <Admin/> </RutaProtegidas>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
