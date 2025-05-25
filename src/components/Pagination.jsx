import React from "react";

const Pagination = ({
  paginaActual,
  totalProductos,
  productosPorPagina,
  setPaginaActual,
}) => {
  const totalPaginas = Math.ceil(totalProductos / productosPorPagina);

  const irPaginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const irPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  return (
    <div className="d-flex justify-content-center my-4">
      <button
        className="btn btn-outline-primary me-2"
        onClick={irPaginaAnterior}
        disabled={paginaActual === 1}
      >
        Anterior
      </button>
      <span className="align-self-center">
        Página {paginaActual} de {totalPaginas}
      </span>
      <button
        className="btn btn-outline-primary ms-2"
        onClick={irPaginaSiguiente}
        disabled={paginaActual === totalPaginas}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
