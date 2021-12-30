import React, { useState, useEffect } from "react";
import "./Register.css";
import { registerPost, loginPost } from "../API/userAPI";
import { Link, useNavigate } from "react-router-dom";
export const Register = () => {
  const [emailUsuario, setEmailUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmaContraseña, setConfirmaContraseña] = useState("");
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState("");
  /*----------------REDIRECT------------------------------*/
  let navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      return navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  async function handleSubmitRegister(e) {
    e.preventDefault();
    if (!emailUsuario || !contraseña || !confirmaContraseña) {
      return setError(["No puede haber campos vacíos."]);
    }
    try {
      await registerPost({
        emailUsuario,
        contraseña,
        confirmaContraseña,
      });
      setError([]);
      setSuccess("Te registraste exitosamente. Podés iniciar sesión.");
      return navigate("/login");
    } catch (error) {
      if (!error.response) {
        return setError(["Ocurrió un error. Intentá de nuevo más tarde."]);
      }
      setError([error.response.data]);
    }
  }
  /*----------HACER LOGIN---------*/
  async function handleSubmitLogin(e) {
    e.preventDefault();
    if (!emailUsuario || !contraseña) {
      return setError(["No puede haber campos vacíos."]);
    }
    try {
      const { data: token } = await loginPost({ emailUsuario, contraseña });
      setError([]);
      console.log(token);
      localStorage.setItem("token", JSON.stringify(token));
      return window.location.replace("/");
    } catch (error) {
      console.log(error);
      if (!error.response) {
        return setError(["Ocurrió un error. Intentá de nuevo más tarde."]);
      }
      setError([error.response.data]);
      console.log(error);
    }
  }
  return (
    <form
      onSubmit={
        window.location.pathname === "/register"
          ? handleSubmitRegister
          : handleSubmitLogin
      }
    >
      <header>
        <h2>
          {window.location.pathname === "/register"
            ? "Registrate"
            : "Iniciá sesión"}
        </h2>
      </header>
      {error.length > 0 ? (
        <div className="errorContainer">
          <div>{error}</div>
          <i className="fas fa-times" onClick={() => setError([])}></i>
        </div>
      ) : (
        ""
      )}
      {success && (
        <div className="errorContainer success">
          <div>{success}</div>
          <i className="fas fa-times" onClick={() => setSuccess("")}></i>
        </div>
      )}
      <div className="formControl">
        <input
          type="text"
          id="emailUsuario"
          placeholder={
            window.location.pathname === "/register"
              ? "Email nuevo usuario"
              : "Email"
          }
          value={emailUsuario}
          onChange={(e) => {
            setEmailUsuario(e.target.value);
          }}
        />
        <label htmlFor="emailUsuario"></label>
      </div>
      <div className="formControl">
        <input
          type="password"
          id="contraseña"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => {
            setContraseña(e.target.value);
          }}
        />
        <label htmlFor="contraseña"></label>
      </div>
      {window.location.pathname === "/register" && (
        <div className="formControl">
          <input
            type="password"
            id="confirmaContraseña"
            placeholder="Confirmá la contraseña"
            value={confirmaContraseña}
            onChange={(e) => {
              setConfirmaContraseña(e.target.value);
            }}
          />
          <label htmlFor="confirmaContraseña"></label>
        </div>
      )}

      <input
        type="submit"
        value={
          window.location.pathname === "/register"
            ? "Registrarse"
            : "Iniciar sesión"
        }
      />
      <div className="marginLine"></div>
      <Link
        to={window.location.pathname === "/register" ? "/login" : "/register"}
      >
        <button className="redirect">
          {window.location.pathname === "/register"
            ? "Iniciar sesión"
            : "Crear cuenta nueva"}
        </button>
      </Link>
    </form>
  );
};
