import React, { useContext, useEffect } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import Impressoras from "./components/Impressoras";
import Defeitos from "./components/Defeitos";
import Solucao from "./components/Solucao";
import Header from "./components/Header";
import { PrivateRoute, PublicOnlyRoute } from "./components/route-utils";
import TokenService from "./services/TokenService";
import AuthContext from "./contexts/AuthContext";

const App = () => {
  const { login, logout } = useContext(AuthContext);
  useEffect(() => {
    if (TokenService.read()) {
      login(TokenService.get());
    }
  }, [login, logout]);
  return (
    <div className="app">
      <Header />
      <main className="container">
        <PublicOnlyRoute
          exact
          path="/"
          component={LoginForm}
          redirectTo="/dashboard"
        />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute
          exact
          path="/chamado/impressora"
          component={Impressoras}
        />
        <PrivateRoute
          exact
          path="/chamado/:deviceId/defeitos"
          component={Defeitos}
        />
        <PrivateRoute
          exact
          path="/chamado/:ticketId/solucao"
          component={Solucao}
        />
      </main>
    </div>
  );
};

export default App;
