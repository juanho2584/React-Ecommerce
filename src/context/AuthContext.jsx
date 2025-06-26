import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const handleSubmit = async (e, setIsAuth) => {
    e.preventDefault();
    let validationErrors = {};
    if (!email) validationErrors.email = "Email es requerido";
    if (!password) validationErrors.password = "La contraseña es requerida";

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      // Cambiar para consumir la API de usuarios
      const response = await fetch(`https://685c9590769de2bf085d24be.mockapi.io/usuarios`);
      const users = await response.json();

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        setError({ email: "Credenciales inválidas" });
      } else {
        setIsAuth(true);
        if (foundUser.role === "admin") {
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
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        error,
        setError,
        handleSubmit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
