import React from "react";
import logo from "../assets/imgs/logo/Logo_Freee_Comerce.png";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  // Verifica si estamos en la página de inicio para usar anclas
  const isHome = location.pathname === "/";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" to="/">
          <img src={logo} width="30%" alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Productos">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              {isHome ? (
                <a className="nav-link" href="#destacados">
                  Destacados
                </a>
              ) : (
                <Link className="nav-link" to="/#destacados">
                  Destacados
                </Link>
              )}
            </li>
            <li className="nav-item">
              {isHome ? (
                <a className="nav-link" href="#carrusel">
                  Ofertas
                </a>
              ) : (
                <Link className="nav-link" to="/#carrusel">
                  Ofertas
                </Link>
              )}
            </li>
            <li className="nav-item">
              {isHome ? (
                <a className="nav-link" href="#formulario">
                  Contacto
                </a>
              ) : (
                <Link className="nav-link" to="/#formulario">
                  Contacto
                </Link>
              )}
            </li>
             <li className="nav-item">
              <Link className="nav-link" to="/Login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
