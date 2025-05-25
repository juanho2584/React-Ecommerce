import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import LoadingHandler from "../components/LoadingHandler";
import CartSidebar from "../components/SidebarCart";
import Footer from "../components/Footer";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

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

  const clearCart = () => setCartItems([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("https://dummyjson.com/products?limit=200")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos.");
        return res.json();
      })
      .then((data) => {
        setProductos(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error al cargar los productos.");
        setLoading(false);
      });
  }, []);

  const totalProductos = productos.length;
  const indexInicio = (paginaActual - 1) * productosPorPagina;
  const indexFin = indexInicio + productosPorPagina;
  const productosPagina = productos.slice(indexInicio, indexFin);

  return (
    <>
      <NavBar />
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

      <Footer />
    </>
  );
};

export default Productos;
