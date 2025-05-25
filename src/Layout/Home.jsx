import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../SidebarCart.css";
import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import Carousel from "../components/Carousel";
import CartSidebar from "../components/SidebarCart";
import Contacto from "../components/Contacto";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import LoadingHandler from "../components/LoadingHandler"; // NUEVO

const Home = () => {
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;
  const [totalProductos, setTotalProductos] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clearCart = () => setCartItems([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar los productos.");
        return res.json();
      })
      .then((datos) => {
        const filtrados = datos.products.filter(
          (producto) => producto.rating >= 4.5
        );
        setProductosFiltrados(filtrados);
        setTotalProductos(filtrados.length);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        setError(
          "Hubo un problema al cargar los productos. Intenta más tarde."
        );
        setLoading(false);
      });
  }, []);

  const indexInicio = (paginaActual - 1) * productosPorPagina;
  const indexFin = indexInicio + productosPorPagina;
  const productosPagina = productosFiltrados.slice(indexInicio, indexFin);

  const toggleCart = () => setShowCart(!showCart);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        if (existing.cantidad < product.stock) {
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          );
        } else {
          alert("No hay más stock disponible.");
          return prevItems;
        }
      } else {
        setShowCart(true);
        return [...prevItems, { ...product, cantidad: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const removeAllFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <NavBar />
      <HeroSection />
      <Carousel />

      <LoadingHandler loading={loading} error={error}>
        <ProductList products={productosPagina} addToCart={addToCart} />
        <Pagination
          paginaActual={paginaActual}
          totalProductos={totalProductos}
          productosPorPagina={productosPorPagina}
          setPaginaActual={setPaginaActual}
        />
      </LoadingHandler>

      <CartSidebar
        show={showCart}
        onClose={toggleCart}
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        removeAllFromCart={removeAllFromCart}
        clearCart={clearCart}
      />
      <button onClick={toggleCart} className="btn btn-primary cart-toggle-btn">
        🛒 {cartItems.length}
      </button>
      <Contacto />
      <Footer />
    </>
  );
};

export default Home;
