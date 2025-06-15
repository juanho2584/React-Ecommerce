import React, { useContext } from "react";
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
import LoadingHandler from "../components/LoadingHandler";
import { HomeContext } from "../context/HomeContext";

const Home = () => {
  const {
    productosPagina,
    paginaActual,
    setPaginaActual,
    totalProductos,
    productosPorPagina,
    loading,
    error,
    cartItems,
    addToCart,
    removeFromCart,
    removeAllFromCart,
    clearCart,
    toggleCart,
    showCart,
  } = useContext(HomeContext);

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
