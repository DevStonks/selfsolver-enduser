import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import propTypes from "prop-types";
import ApiService from "../services/ApiService";
import AppContext from "../contexts/AppContext";

const impressora = {
  id: 45,
  serie: "28868816954",
  marca: "Epson",
  modelo: "EcoTank L3110",
  local: "Campus Campinas",
};

const navigate = (history) => (event) => {
  history.push(`/chamado/sugestao/${event.target.value}`);
};

const Defeitos = ({ history }) => {
  const { defects, setDefects } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    ApiService.getDefects()
      .then(({ data }) => {
        setLoading(false);
        setDefects(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, [setDefects]);

  const { serie, marca, modelo, local } = impressora;

  return (
    <form className="defeito" onChange={navigate(history)}>
      <h1 className="h3 font-weight-normal text-center">Abrindo Chamado</h1>
      <div className="form-group">
        <label htmlFor="defeito">
          Selecione um defeito que sua impressora está apresentando:
          <select className="form-control" id="defeito">
            {defects.map((defeito) => (
              <option key={defeito.id} value={defeito.id}>
                {defeito.description}
              </option>
            ))}
          </select>
        </label>
      </div>
      <small>
        Abrindo chamado para Impressora {marca} {modelo} número de série {serie}{" "}
        alocada em <em>{local}</em>.
      </small>
    </form>
  );
};

Defeitos.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default Defeitos;
