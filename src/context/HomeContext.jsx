import { createContext, useState, useEffect } from "react";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;
  const [totalProductos, setTotalProductos] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError("Hubo un problema al cargar los productos. Intenta más tarde.");
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

  const clearCart = () => setCartItems([]);

  return (
    <HomeContext.Provider
      value={{
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
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
