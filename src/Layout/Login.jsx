import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import users from "../components/utils/users"; // simula usuarios

const Login = () => {
  const { setIsAuth } = useContext(CartContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    if (!email) validationErrors.email = "Email es requerido";
    if (!password) validationErrors.password = "La contraseña es requerida";

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        setError({ email: "Credenciales inválidas" });
      } else {
        if (foundUser.role === "admin") {
          setIsAuth(true);
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setError({ email: "Algo salió mal. Por favor, intentalo más tarde." });
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card p-4">
            <h2 className="text-center mb-4">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <label htmlFor="formBasicEmail" className="form-label">Email:</label>
                <input
                  id="formBasicEmail"
                  type="email"
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`form-control ${error.email ? 'is-invalid' : ''}`}
                />
                {error.email && <div className="text-danger">{error.email}</div>}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="formBasicPassword" className="form-label">Contraseña:</label>
                <input
                  id="formBasicPassword"
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`form-control ${error.password ? 'is-invalid' : ''}`}
                />
                {error.password && <div className="text-danger">{error.password}</div>}
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
