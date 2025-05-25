import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Product = ({ product, addToCart }) => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const navigate = useNavigate();
  const handleOpenDetails = () => {
    navigate(`/producto/${product.id}`);
  };

  return (
    <div
      className="col-md-4 mb-4"
      data-aos="zoom-in-up"
      data-aos-duration="2000"
    >
      <div className="card h-100 shadow-sm">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="card-img-top"
          style={{ objectFit: "cover", maxWidth: "350",  cursor: "pointer" }}
          onClick={handleOpenDetails}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text garantia">
            Garantía: {product.warrantyInformation || "No especificada"}
          </p>
          <p className="card-text stock">Stock: {product.stock} u.</p>
          <p className="card-text">
            Precio: ${product.price.toLocaleString()}
          </p>
          <div className="mt-auto d-flex justify-content-between flex-wrap gap-2">
            <button
              onClick={() => addToCart({ ...product })}
              className="btn btn-primary btn-sm"
            >
              Añadir al Carrito
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handleOpenDetails}
            >
              Ver detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

