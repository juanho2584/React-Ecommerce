import React from "react";
import { Link } from "react-router-dom";
import Notfound from "../assets/imgs/logo/Logo.png";

const NotFound = () => {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center bg-light px-3">
      <img
        src={Notfound}
        alt="Error 404"
        className="img-fluid mb-4"
        style={{ maxWidth: "200px" }}
      />
      <h1 className="display-3 text-danger fw-bold">404</h1>
      <h3 className="text-secondary mb-2">Página no encontrada</h3>
      <p className="lead mb-3">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
