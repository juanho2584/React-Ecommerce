import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../components/utils/users";

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
