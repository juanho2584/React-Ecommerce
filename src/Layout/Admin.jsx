import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const Admin = () => {
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
        setProductos([...productos, nuevo]);
        setNuevoProducto({ title: "", price: 0, image: "", stock: 0 });
        setModal({ ...modal, show: false });
      },
    });
  };

  const eliminarProducto = (id, nombre) => {
    setModal({
      show: true,
      title: "Eliminar Producto",
      message: `¿Estás seguro de eliminar "${nombre}"?`,
      action: () => {
        setProductos(productos.filter((p) => p.id !== id));
        setModal({ ...modal, show: false });
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
        setModal({ ...modal, show: false });
      },
    });
  };

  return (
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
        <input
          name="stock"
          type="number"
          value={nuevoProducto.stock}
          onChange={handleInputChange}
          placeholder="Stock"
          className="form-control mb-2"
        />
        <button onClick={agregarProducto} className="btn btn-success">
          Agregar
        </button>
      </div>

      {loading && <p>Cargando productos...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Imagen</th>
                <th>Stock</th>
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
                    <input
                      type="number"
                      value={producto.stock}
                      onChange={(e) =>
                        editarProducto(producto.id, "stock", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        eliminarProducto(producto.id, producto.title)
                      }
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={guardarCambios} className="btn btn-primary mt-3">
            Guardar Cambios
          </button>
        </>
      )}

      {/* Modal reutilizable */}
      <Modal show={modal.show} onHide={() => setModal({ ...modal, show: false })}>
        <Modal.Header closeButton>
          <Modal.Title>{modal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modal.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModal({ ...modal, show: false })}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={modal.action}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;
