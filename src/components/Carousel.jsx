import React from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Importa el archivo CSS
import Banner01 from "../assets/imgs/banners/banner01.jpg";
import Banner02 from "../assets/imgs/banners/banner02.jpg";
import Banner03 from "../assets/imgs/banners/banner03.jpg";

const Carousel = () => {
  React.useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section
      data-aos="fade-up"
      data-aos-duration="3000"
      id="carrusel"
      className="carousel slide mt-4"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={Banner01} className="d-block w-100" alt="Banner 1" />
        </div>
        <div className="carousel-item">
          <img src={Banner02} className="d-block w-100" alt="Banner 2" />
        </div>
        <div className="carousel-item">
          <img src={Banner03} className="d-block w-100" alt="Banner 3" />
        </div>
      </div>
      {/* Controles  */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carrusel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carrusel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </section>
  );
};

export default Carousel;
