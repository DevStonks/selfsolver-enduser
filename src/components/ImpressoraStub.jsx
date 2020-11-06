import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

const ImpressoraStub = ({ id, serie, marca, modelo, local }) => (
  <Link
    to={`/chamado/${id}/defeitos`}
    className="list-group-item list-group-item-action"
  >
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">Impressora #{serie}</h5>
    </div>
    <p className="mb-1">
      Impressora {marca} {modelo}
    </p>
    <small>
      Alocada em <em>{local}</em>
    </small>
  </Link>
);

ImpressoraStub.propTypes = {
  serie: propTypes.string.isRequired,
  marca: propTypes.string.isRequired,
  modelo: propTypes.string.isRequired,
  local: propTypes.string.isRequired,
};

export default ImpressoraStub;
