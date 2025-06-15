import { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({
    title: "",
    price: 0,
    image: "",
    stock: 0,
  });

  const [modal, setModal] = useState({
    show: false,
    title: "",
    message: "",
    action: null,
  });

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=20")
      .then((res) => res.json())
      .then((data) => {
        const productosAdaptados = data.products.map((prod) => ({
          ...prod,
          image: prod.images?.[0] || "",
          stock: prod.stock ?? 10,
        }));
        setProductos(productosAdaptados);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar productos.");
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const agregarProducto = () => {
    const nuevo = {
      ...nuevoProducto,
      id: Date.now(),
    };
    setModal({
      show: true,
      title: "Agregar Producto",
      message: `¿Estás seguro de agregar "${nuevo.title}"?`,
      action: () => {
        setProductos((prev) => [...prev, nuevo]);
        setNuevoProducto({ title: "", price: 0, image: "", stock: 0 });
        setModal((prev) => ({ ...prev, show: false }));
      },
    });
  };

  const eliminarProducto = (id, nombre) => {
    setModal({
      show: true,
      title: "Eliminar Producto",
      message: `¿Estás seguro de eliminar "${nombre}"?`,
      action: () => {
        setProductos((prev) => prev.filter((p) => p.id !== id));
        setModal((prev) => ({ ...prev, show: false }));
      },
    });
  };

  const editarProducto = (id, campo, valor) => {
    setProductos((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, [campo]: valor } : prod))
    );
  };

  const guardarCambios = () => {
    setModal({
      show: true,
      title: "Guardar Cambios",
      message: "¿Deseás guardar todos los cambios realizados?",
      action: () => {
        console.log("Cambios guardados:", productos);
        setModal((prev) => ({ ...prev, show: false }));
      },
    });
  };

  return (
    <AdminContext.Provider
      value={{
        productos,
        loading,
        error,
        nuevoProducto,
        handleInputChange,
        agregarProducto,
        eliminarProducto,
        editarProducto,
        guardarCambios,
        modal,
        setModal,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
