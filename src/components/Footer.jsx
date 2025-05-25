import React from "react";
import Facebook from "../assets/imgs/redes/Facebook.png";
import Instagram from "../assets/imgs/redes/Instagram.png";
import Linkedin from "../assets/imgs/redes/Linkedin.png";
import ReactLogo from "../assets/react.svg";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  // Verifica si estamos en la página de inicio para usar anclas
  const isHome = location.pathname === "/";

  return (
    <footer className="bg-light text-center text-lg-start mt-4">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4">
            <h5 className="text-uppercase texto">- Sobre Nosotros -</h5>
            <p className="texto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto nihil fuga voluptatibus sunt accusamus saepe maxime
              quasi autem neque temporibus eum odio aspernatur minus, ducimus
              dolorem perspiciatis aliquid molestias!
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-uppercase texto">Enlaces</h5>
            <ul className="list-unstyled mb-0 texto">
              <li>
                <a href="#" className="text-dark">
                  Inicio
                </a>
              </li>
              <li>
                <Link className="text-dark" to="/Productos">
                  Productos
                </Link>
              </li>
              <li>
                {isHome ? (
                  <a className="text-dark" href="#formulario">
                    Contacto
                  </a>
                ) : (
                  <Link className="text-dark" to="/#formulario">
                    Contacto
                  </Link>
                )}
              </li>
              <li>
                {isHome ? (
                  <a className="text-dark" href="#destacados">
                    Destacados
                  </a>
                ) : (
                  <Link className="text-dark" to="/#destacados">
                    Destacados
                  </Link>
                )}
              </li>
              <li>
                {isHome ? (
                  <a className="text-dark" href="#carrusel">
                    Ofertas
                  </a>
                ) : (
                  <Link className="text-dark" to="/#carrusel">
                    Ofertas
                  </Link>
                )}
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-uppercase texto">Síguenos</h5>
            <ul className="list-unstyled texto">
              <li>
                <a href="#" className="text-dark">
                  <img
                    className="footer-img"
                    src={Facebook}
                    width="20%"
                    alt="Facebook"
                  />
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  <img
                    className="footer-img"
                    src={Instagram}
                    width="20%"
                    alt="Instagram"
                  />
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  <img
                    className="footer-img"
                    src={Linkedin}
                    width="20%"
                    alt="Linkedin"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3 bg-dark text-white">
        © 2025 - Free Ecommerce{" "}
        <img
          src={ReactLogo}
          alt="logo React"
          style={{ width: "20px", marginTop: "-10px" }}
        />{" "}
        - Todos los derechos reservados.
        <br />
        Desarrollado por Juan Manuel Pinto
      </div>
    </footer>
  );
};

export default Footer;
