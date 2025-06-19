import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    title: "",
    price: "",
    image: "",
    stock: "",
  });

  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [agregando, setAgregando] = useState(false);
  const [eliminandoId, setEliminandoId] = useState(null);
  const [error, setError] = useState("");
  const [modal, setModal] = useState({
    show: false,
    title: "",
    message: "",
    action: null,
  });

  // ✅ GET - Obtener productos
  const fetchProductos = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/products?limit=10");
      const data = await res.json();

      const productosConImagen = data.products.map((p) => ({
        ...p,
        stock: p.stock || 10,
        image: p.thumbnail || "", // Normaliza para que siempre tenga 'image'
      }));

      setProductos(productosConImagen);
    } catch (err) {
      setError("Error al cargar productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // ✅ POST - Agregar producto
  const agregarProducto = async () => {
    setAgregando(true);
    try {
      const res = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
      });
      const data = await res.json();

      setProductos([
        ...productos,
        {
          ...data,
          stock: nuevoProducto.stock,
          image: nuevoProducto.image, // Asegura que tenga 'image'
        },
      ]);

      setNuevoProducto({ title: "", price: "", image: "", stock: "" });

      setModal({
        show: true,
        title: "Producto agregado",
        message: `El producto "${data.title}" fue agregado correctamente.`,
        action: () => setModal({ ...modal, show: false }),
      });
    } catch {
      alert("Error al agregar producto.");
    } finally {
      setAgregando(false);
    }
  };

  // ✅ DELETE - Eliminar producto con confirmación
  const eliminarProducto = (id, nombre) => {
    setModal({
      show: true,
      title: "Eliminar producto",
      message: `¿Estás seguro que querés eliminar "${nombre}"?`,
      action: async () => {
        setEliminandoId(id);
        try {
          await fetch(`https://dummyjson.com/products/${id}`, {
            method: "DELETE",
          });
          setProductos(productos.filter((p) => p.id !== id));
        } catch {
          alert("Error al eliminar producto.");
        } finally {
          setEliminandoId(null);
          setModal({ ...modal, show: false });
        }
      },
    });
  };

  // ✅ PUT - Guardar cambios
  const guardarCambios = async () => {
    setGuardando(true);
    try {
      const resultados = await Promise.all(
        productos.map(async (producto) => {
          const res = await fetch(`https://dummyjson.com/products/${producto.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: producto.title,
              price: Number(producto.price),
              image: producto.image,
              stock: Number(producto.stock),
            }),
          });
          return res.json();
        })
      );

      // Actualiza estado local y conserva imagen si no viene del backend
      setProductos(
        resultados.map((p, i) => ({
          ...p,
          image: p.image || productos[i].image,
        }))
      );

      setModal({
        show: true,
        title: "Cambios guardados",
        message: "Todos los productos fueron actualizados exitosamente.",
        action: () => setModal({ ...modal, show: false }),
      });
    } catch {
      setModal({
        show: true,
        title: "Error",
        message: "Ocurrió un error al guardar los productos.",
        action: () => setModal({ ...modal, show: false }),
      });
    } finally {
      setGuardando(false);
    }
  };

  // 🧠 Actualiza campos en tiempo real
  const editarProducto = (id, campo, valor) => {
    const actualizados = productos.map((p) =>
      p.id === id ? { ...p, [campo]: valor } : p
    );
    setProductos(actualizados);
  };

  // 🧠 Controla inputs del nuevo producto
  const handleInputChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AdminContext.Provider
      value={{
        productos,
        nuevoProducto,
        loading,
        guardando,
        agregando,
        eliminandoId,
        error,
        modal,
        setModal,
        handleInputChange,
        agregarProducto,
        eliminarProducto,
        editarProducto,
        guardarCambios,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
