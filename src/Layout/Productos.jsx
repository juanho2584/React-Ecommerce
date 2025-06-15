import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import LoadingHandler from "../components/LoadingHandler";
import CartSidebar from "../components/SidebarCart";
import Footer from "../components/Footer";
 // Estilos para la barra de búsqueda

const Productos = () => {
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

  // Filtrado por búsqueda
  const productosFiltrados = busqueda
    ? productos.filter((p) =>
        `${p.title} ${p.description}`.toLowerCase().includes(busqueda.toLowerCase())
      )
    : productos;

  // Lógica de paginación
  const indexInicio = (paginaActual - 1) * productosPorPagina;
  const indexFin = indexInicio + productosPorPagina;
  const productosFiltradosPaginados = productosFiltrados.slice(indexInicio, indexFin);
  const productosAMostrar = productosFiltradosPaginados;

  return (
    <>
      <NavBar />

      {/* Barra de búsqueda con estilo atractivo */}
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

      {/* Lista de productos + paginación */}
      <LoadingHandler loading={loading} error={error}>
        <ProductList products={productosAMostrar} addToCart={addToCart} />

        <Pagination
          paginaActual={paginaActual}
          totalProductos={productosFiltrados.length}
          productosPorPagina={productosPorPagina}
          setPaginaActual={setPaginaActual}
        />
      </LoadingHandler>

      {/* Sidebar del carrito */}
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
