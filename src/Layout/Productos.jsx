// src/pages/Productos.js
import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import LoadingHandler from "../components/LoadingHandler";
import CartSidebar from "../components/SidebarCart";
import Footer from "../components/Footer";
import { ProductosContext } from "../context/ProductosContext";

const Productos = () => {
  const {
    productosAMostrar,
    productosFiltrados,
    paginaActual,
    setPaginaActual,
    productosPorPagina,
    loading,
    error,
    cartItems,
    showCart,
    toggleCart,
    addToCart,
    removeFromCart,
    removeAllFromCart,
    clearCart,
    busqueda,
    setBusqueda,
  } = useContext(ProductosContext);

  return (
    <>
      <NavBar />
      <div className="container my-4">
        <div className="mx-auto" style={{ maxWidth: "600px" }}>
          <div className="input-group search-bar shadow rounded-pill overflow-hidden">
            <span className="input-group-text bg-white border-0">
              <i className="bi bi-search text-primary fs-5"></i>
            </span>
            <input
              type="text"
              className="form-control border-0 px-3 py-2 search-input"
              placeholder="🔍 Buscar productos por nombre o descripción..."
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setPaginaActual(1);
              }}
            />
          </div>
        </div>
      </div>

      <LoadingHandler loading={loading} error={error}>
        <ProductList products={productosAMostrar} addToCart={addToCart} />
        <Pagination paginaActual={paginaActual} totalProductos={productosFiltrados.length} productosPorPagina={productosPorPagina} setPaginaActual={setPaginaActual}/>
      </LoadingHandler>
      <CartSidebar
        show={showCart}
        onClose={toggleCart}
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        removeAllFromCart={removeAllFromCart}
        clearCart={clearCart}/>
      <button onClick={toggleCart} className="btn btn-primary cart-toggle-btn">
        🛒 {cartItems.length}
      </button>
      <Footer />
    </>
  );
};

export default Productos;
