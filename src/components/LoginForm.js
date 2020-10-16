import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const onLogin = (setError, history) => (event) => {
  event.preventDefault();
  const form = event.target;
  const { email, password } = form;
  axios
    .post(`${process.env.REACT_APP_SELFSOLVER_API}/login`, {
      email: email.value,
      password: password.value,
    })
    .then((response) => {
      console.log(response)
      const token = response.data.access_token
      localStorage.setItem('access-token', token)
      history.push('/dashboard')
    })
    .catch((error) => {
      if (error.response.status === 401) {
        setError("Usuário ou senha não conferem.");
      }
    });
};

export default ({ history, location }) => {
  const [error, setError] = useState("");

  return (
    <form className="form-signin" onSubmit={onLogin(setError, history)}>
      <h1 className="h3 mb-3 font-weight-normal">Olá, querido cliente!</h1>
      <p>Entre com seu email e senha para acessar a ferramenta!</p>
      <label htmlFor="inputEmail" className="sr-only">
        Email address
      </label>
      <input
        name="email"
        type="email"
        id="inputEmail"
        className="form-control"
        placeholder="Email address"
        required=""
        autoFocus=""
      />
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        name="password"
        type="password"
        id="inputPassword"
        className="form-control"
        placeholder="Password"
        required=""
      />
      {error && <div className="alert alert-danger">{error}</div>}
      <button className="btn btn-primary btn-block mt-2">Entrar</button>
      <button className="btn btn-secondary btn-block" type="button">
        Esqueci minha senha!
      </button>
      <p className="mt-5 mb-3 text-muted">Um projeto de GTI Fatec Campinas</p>
    </form>
  );
};
