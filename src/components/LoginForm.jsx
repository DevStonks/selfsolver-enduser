import React, { useContext, useState } from "react";
import propTypes from "prop-types";
import styles from "./LoginForm.module.css";
import AuthContext from "../contexts/AuthContext";
import ApiService from "../services/ApiService";

const onLogin = (setError, login) => (event) => {
  event.preventDefault();
  const form = event.target;
  const { email, password } = form;
  ApiService.login(email.value, password.value)
    .then((response) => {
      login(response.data.access_token);
    })
    .catch((error) => {
      if (error?.response?.status === 401) {
        setError("Usuário ou senha não conferem.");
      }
    });
};

const LoginForm = () => {
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  return (
    <form className="form-signin" onSubmit={onLogin(setError, login)}>
      <h1 className="h3 mb-3 font-weight-normal">Olá, querido cliente!</h1>
      <p>Entre com seu email e senha para acessar a ferramenta!</p>
      <label htmlFor="inputEmail" className={styles.label}>
        <span className="sr-only">Email address</span>
        <input
          name="email"
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required=""
        />
      </label>
      <label htmlFor="inputPassword" className={styles.label}>
        <span className="sr-only">Password</span>
        <input
          name="password"
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required=""
        />
      </label>
      {error && <div className="alert alert-danger">{error}</div>}
      <button className="btn btn-primary btn-block mt-2" type="submit">
        Entrar
      </button>
      <button className="btn btn-secondary btn-block" type="button">
        Esqueci minha senha!
      </button>
      <p className="mt-5 mb-3 text-muted">Um projeto de GTI Fatec Campinas</p>
    </form>
  );
};
LoginForm.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
export default LoginForm;
