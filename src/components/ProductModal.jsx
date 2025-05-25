// src/components/ProductModal.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button, Spinner } from "react-bootstrap";

const ProductModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleClose = () => navigate(-1); // Vuelve a la ruta anterior

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener el producto.");
        return res.json();
      })
      .then((data) => {
        setProducto(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando producto:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Modal show onHide={handleClose} centered>
        <Modal.Body className="text-center">
          <Spinner animation="border" variant="primary" />
        </Modal.Body>
      </Modal>
    );
  }

  if (!producto) return null;

  return (
    <Modal show onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{producto.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <img
            src={producto.thumbnail}
            alt={producto.title}
            className="img-fluid mb-3"
            style={{ maxHeight: "300px" }}
          />
        </div>
        <p>{producto.description}</p>
        <p><strong>Precio:</strong> ${producto.price}</p>
        <p><strong>Stock:</strong> {producto.stock}</p>
        <p><strong>Rating:</strong> ⭐ {producto.rating}</p>
        <p><strong>Marca:</strong> {producto.brand}</p>
        <p><strong>Categoría:</strong> {producto.category}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
