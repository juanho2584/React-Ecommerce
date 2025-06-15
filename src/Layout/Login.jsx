import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { setIsAuth } = useContext(CartContext);
  const {email,setEmail,password,setPassword,error,handleSubmit,} = useContext(AuthContext);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card p-4">
            <h2 className="text-center mb-4">Iniciar Sesión</h2>
            <form onSubmit={(e) => handleSubmit(e, setIsAuth)}>
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
