import React, { useContext } from "react";
import { Modal, Button, Card, Row, Col } from "react-bootstrap";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const Admin = () => {
  const {
    productos,
    loading,
    guardando,
    agregando,
    eliminandoId,
    error,
    modal,
    setModal,
    nuevoProducto,
    handleInputChange,
    agregarProducto,
    eliminarProducto,
    editarProducto,
    guardarCambios,
  } = useContext(AdminContext);

  const navigate = useNavigate(); // Hook para navegación

  // Función para volver a la página principal
  const volverPaginaPrincipal = () => {
    navigate("/"); // Redirige a la página principal
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Panel de Administración</h2>

      {/* Card para agregar producto */}
      <Card className="mb-4">
        <Card.Header>
          <h4>Agregar Producto</h4>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col sm={12} md={6} lg={3}>
              <input
                name="title"
                value={nuevoProducto.title}
                onChange={handleInputChange}
                placeholder="Nombre"
                className="form-control mb-2"
              />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <input
                name="price"
                type="number"
                value={nuevoProducto.price}
                onChange={handleInputChange}
                placeholder="Precio"
                className="form-control mb-2"
              />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <input
                name="image"
                value={nuevoProducto.image}
                onChange={handleInputChange}
                placeholder="URL de imagen"
                className="form-control mb-2"
              />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <input
                name="stock"
                type="number"
                value={nuevoProducto.stock}
                onChange={handleInputChange}
                placeholder="Stock"
                className="form-control mb-2"
              />
            </Col>
          </Row>
          <button
            onClick={agregarProducto}
            className="btn btn-success mt-3"
            disabled={agregando}
          >
            {agregando ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Agregando...
              </>
            ) : (
              "Agregar"
            )}
          </button>
        </Card.Body>
      </Card>

      {/* Mensajes de carga y error */}
      {loading && <p className="text-center">Cargando productos...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Si no hay errores y no está cargando, mostramos la tabla */}
      {!loading && !error && (
        <>
          {/* Tabla de productos */}
          <div className="table-responsive">
            <table className="table table-striped table-bordered mt-4">
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
                  <tr key={producto.id} className="table-hover">
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
                        disabled={eliminandoId === producto.id}
                      >
                        {eliminandoId === producto.id ? (
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          "Eliminar"
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Botón para guardar los cambios */}
          <button
            onClick={guardarCambios}
            className="btn btn-outline-primary mt-3"
            disabled={guardando}
          >
            {guardando ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Guardando...
              </>
            ) : (
              "Guardar Cambios"
            )}
          </button>
        </>
      )}

      {/* Botón para volver a la página principal */}
      <button
        onClick={volverPaginaPrincipal}
        className="btn btn-outline-warning mt-3"
      >
        Volver a la página principal
      </button>

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
