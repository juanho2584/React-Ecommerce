// src/components/RegisterForm.js
import React, { useContext } from "react";
import { RegisterContext } from "../context/RegisterContext.jsx";

const RegisterForm = () => {
  const { formData, errors, handleChange, validarFormulario } =
    useContext(RegisterContext);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card p-4">
            <h2 className="text-center mb-4">Registro</h2>
            <form onSubmit={validarFormulario}>
              {/* Nombre */}
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre:
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.nombre ? "is-invalid" : ""
                  }`}
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
                {errors.nombre && (
                  <div className="text-danger">{errors.nombre}</div>
                )}
              </div>

              {/* Apellido */}
              <div className="mb-3">
                <label htmlFor="apellido" className="form-label">
                  Apellido:
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.apellido ? "is-invalid" : ""
                  }`}
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                />
                {errors.apellido && (
                  <div className="text-danger">{errors.apellido}</div>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo Electrónico:
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>

              {/* Contraseña */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña:
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="text-danger">{errors.password}</div>
                )}
              </div>

              {/* País */}
              <div className="mb-3">
                <label htmlFor="pais" className="form-label">
                  País:
                </label>
                <select
                  className={`form-select ${errors.pais ? "is-invalid" : ""}`}
                  id="pais"
                  name="pais"
                  value={formData.pais}
                  onChange={handleChange}
                >
                  <option value="">Selecciona tu país</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Chile">Chile</option>
                  <option value="México">México</option>
                </select>
                {errors.pais && (
                  <div className="text-danger">{errors.pais}</div>
                )}
              </div>

              {/* Fecha de nacimiento */}
              <div className="mb-3">
                <label htmlFor="fechaNacimiento" className="form-label">
                  Fecha de Nacimiento:
                </label>
                <input
                  type="date"
                  className={`form-control ${
                    errors.fechaNacimiento ? "is-invalid" : ""
                  }`}
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                />
                {errors.fechaNacimiento && (
                  <div className="text-danger">{errors.fechaNacimiento}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Registrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
