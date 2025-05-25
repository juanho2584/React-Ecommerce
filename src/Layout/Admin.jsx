import React, { useEffect, useState } from "react";

const Admin = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({
    title: "",
    price: 0,
    image: "", // Nuevo campo para la imagen
  });

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products?limit=20")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data.products);
        setLoading(false);
      })
      .catch((err) => {
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
      stock: 10,
    };
    setProductos([...productos, nuevo]);
    setNuevoProducto({ title: "", price: 0, image: "" });
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  const editarProducto = (id, campo, valor) => {
    setProductos((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, [campo]: valor } : prod))
    );
  };

  return (
    <>
      <div className="container my-5">
        <h2>Panel de Administración</h2>

        <div className="my-3">
          <h4>Agregar Producto</h4>
          <input
            name="title"
            value={nuevoProducto.title}
            onChange={handleInputChange}
            placeholder="Nombre"
            className="form-control mb-2"
          />
          <input
            name="price"
            type="number"
            value={nuevoProducto.price}
            onChange={handleInputChange}
            placeholder="Precio"
            className="form-control mb-2"
          />
          <input
            name="image"
            value={nuevoProducto.image}
            onChange={handleInputChange}
            placeholder="URL de imagen"
            className="form-control mb-2"
          />
          <button onClick={agregarProducto} className="btn btn-success">
            Agregar
          </button>
        </div>

        {loading && <p>Cargando productos...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && (
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>
                    <input
                      value={producto.title}
                      onChange={(e) =>
                        editarProducto(producto.id, "title", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={producto.price}
                      onChange={(e) =>
                        editarProducto(producto.id, "price", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      value={producto.image || ""}
                      onChange={(e) =>
                        editarProducto(producto.id, "image", e.target.value)
                      }
                      className="form-control mb-1"
                    />
                    {producto.image && (
                      <img
                        src={producto.image}
                        alt="preview"
                        style={{ width: 60, height: "auto" }}
                      />
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => eliminarProducto(producto.id)}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Admin;
