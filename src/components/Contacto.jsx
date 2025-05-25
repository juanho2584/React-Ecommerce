import React from "react";
import Swal from "sweetalert2";

const Contacto = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "¡Mensaje enviado!",
      text: "Gracias por contactarnos. Pronto te responderemos.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });

    e.target.reset();
  };

  return (
    <div className="container mt-5 formulario" id="formulario">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-gradient text-white text-center py-4 rounded-top-4">
          <h2 className="mb-0">Contacto</h2>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            {/* Nombre */}
            <div className="form-group mb-4">
              <label htmlFor="name" className="form-label">
                <i
                  className="fa-solid fa-user fa-lg me-2"
                  style={{ color: "#007bff" }}
                ></i>
                Nombre
              </label>
              <input
                type="text"
                className="form-control rounded-pill shadow-sm"
                id="name"
                required
                placeholder="Ingrese su Nombre"
              />
            </div>

            {/* Correo */}
            <div className="form-group mb-4">
              <label htmlFor="email" className="form-label">
                <i
                  className="fa-solid fa-at fa-lg me-2"
                  style={{ color: "#007bff" }}
                ></i>
                Correo Electrónico
              </label>
              <input
                type="email"
                className="form-control rounded-pill shadow-sm"
                id="email"
                required
                placeholder="Ingrese su e-mail"
              />
            </div>

            {/* Mensaje */}
            <div className="form-group mb-4">
              <label htmlFor="message" className="form-label">
                <i
                  className="fa-solid fa-message fa-lg me-2"
                  style={{ color: "#007bff" }}
                ></i>
                Mensaje
              </label>
              <textarea
                className="form-control rounded-4 shadow-sm"
                id="message"
                rows="4"
                required
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>

            {/* Botón enviar */}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary px-5 py-2 rounded-pill shadow-sm"
              >
                <i className="fa-solid fa-paper-plane me-2"></i> Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
