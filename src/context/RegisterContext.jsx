// src/context/RegisterContext.js
import { createContext, useState } from "react";
import Swal from "sweetalert2";

export const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    pais: "",
    fechaNacimiento: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearValidations = () => {
    setErrors({});
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      pais: "",
      fechaNacimiento: "",
    });
  };

  const validarFormulario = (e) => {
    e.preventDefault();
    clearValidations();

    const newErrors = {};
    const emailRegex =
      /^[a-z0-9]+[_a-z0-9.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/i;
    const passwordRegex =
      /^(?=.*\d.*\d)(?=.*[!@#$%^&*(),.?":{}|<>].*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{8,}$/;

    if (!formData.nombre.trim()) {
      newErrors.nombre = "Debe completar el campo Nombre";
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = "Debe completar el campo Apellido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Debe completar el campo Email";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Formato de Email incorrecto";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Debe completar el campo contraseña";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "La clave debe contener dos números, dos símbolos y una letra mayúscula";
    }

    if (!formData.pais) {
      newErrors.pais = "Debe seleccionar un país";
    }

    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = "Debe seleccionar una Fecha de Nacimiento";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    Swal.fire({
      title: "Registro Exitoso",
      text: `¡Felicitaciones ${formData.nombre.toUpperCase()} ${formData.apellido.toUpperCase()}! Tu registro ha sido exitoso.`,
      icon: "success",
      confirmButtonText: "Aceptar",
    });

    resetForm();
  };

  return (
    <RegisterContext.Provider
      value={{
        formData,
        errors,
        handleChange,
        validarFormulario,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
