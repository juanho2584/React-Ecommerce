import React from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Importa el archivo CSS
import { Link } from "react-router-dom";

const HeroSection = () => {
  React.useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section
      data-aos="zoom-in"
      data-aos-duration="1000"
      className="sectionPrincipal"
    >
      <h1 className="tituloPrincipal">
        Los mejores productos para tu hogar <br />
        en un solo lugar.
      </h1>
      <h2 className="subtituloPrincipal">
        Registrate para obtener <br />
        nuestras ofertas.
      </h2>

      <Link className="botonRegistrarse" to="/Registro">
        Registrar
      </Link>
    </section>
  );
};

export default HeroSection;
