import React from "react";
import propTypes from "prop-types";

const ChamadoStub = ({ id, impressora, abertura, marca, modelo, local }) => (
  <button type="button" className="list-group-item list-group-item-action">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">Chamado #{id}</h5>
      <small>{abertura}</small>
    </div>
    <p className="mb-1">
      Impressora {marca} {modelo} <br /> Número de Série {impressora}
    </p>
    <small>
      Alocada em <em>{local}</em>
    </small>
  </button>
);

ChamadoStub.propTypes = {
  id: propTypes.number.isRequired,
  impressora: propTypes.string.isRequired,
  abertura: propTypes.string.isRequired,
  marca: propTypes.string.isRequired,
  modelo: propTypes.string.isRequired,
  local: propTypes.string.isRequired,
};

export default ChamadoStub;
