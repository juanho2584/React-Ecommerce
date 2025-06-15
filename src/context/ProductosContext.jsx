// src/context/ProductosContext.js
import { createContext, useEffect, useState } from "react";

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [busqueda, setBusqueda] = useState("");

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

  const productosFiltrados = busqueda
    ? productos.filter((p) =>
        `${p.title} ${p.description}`
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      )
    : productos;

  const indexInicio = (paginaActual - 1) * productosPorPagina;
  const indexFin = indexInicio + productosPorPagina;
  const productosAMostrar = productosFiltrados.slice(indexInicio, indexFin);

  return (
    <ProductosContext.Provider
      value={{
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
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
