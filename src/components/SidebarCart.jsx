import React from "react";
import Swal from "sweetalert2";

const SidebarCart = ({
  show,
  onClose,
  cartItems,
  addToCart,
  removeFromCart,
  removeAllFromCart,
  clearCart,
}) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.cantidad,
    0
  );

  const handleCompra = async () => {
    const result = await Swal.fire({
      title: "¿Confirmar compra?",
      text: `Total a pagar: $${total.toLocaleString()}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, comprar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      clearCart();
      Swal.fire({
        title: "¡Compra exitosa!",
        text: "Gracias por tu compra. Pronto recibirás tu pedido.",
        icon: "success",
      });
      onClose(); // opcional: cerrar el carrito tras la compra
    }
  };

  return (
    <div className={`sidebar-cart ${show ? "show" : ""}`}>
      <div className="sidebar-cart-header d-flex justify-content-between align-items-center">
        <h5>🛒 Carrito de Compras</h5>
        <button className="btn btn-sm btn-outline-danger" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="sidebar-cart-content">
        {cartItems.length === 0 ? (
          <p className="text-center mt-4">El carrito está vacío.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item mb-3">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="cart-item-img"
              />
              <div className="cart-item-info">
                <h6>{item.title}</h6>
                <p>Cantidad: {item.cantidad}</p>
                <p>Precio: {item.price}</p>
                <p>Stock: {item.stock - item.cantidad}</p>
                <div className="btn-group btn-group-sm" role="group">
                  <button
                    className="btn btn-success"
                    onClick={() => addToCart(item)}
                    disabled={item.cantidad >= item.stock}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => removeFromCart(item.id)}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeAllFromCart(item.id)}
                  >
                    x
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="sidebar-cart-footer">
          <strong>Total: ${total.toLocaleString()}</strong>
          <button className="btn btn-primary w-100 mt-3" onClick={handleCompra}>
            Comprar
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarCart;
