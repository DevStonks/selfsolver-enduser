import React from "react";
import Moment from "react-moment";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

const ChamadoStub = ({
  id,
  impressora,
  abertura,
  marca,
  modelo,
  local,
  encaminhado,
}) => {
  const components = (
    <li
      className={
        "list-group-item list-group-item-action" +
        (encaminhado ? " list-item-disabled" : "")
      }
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">
          Chamado #{id}{" "}
          {encaminhado && (
            <span
              class="badge badge-primary badge-pill"
              style={{ verticalAlign: "text-bottom" }}
            >
              <small>Encaminhado</small>
            </span>
          )}
        </h5>
        <small>
          <Moment fromNow>{abertura}</Moment>
        </small>
      </div>
      <p className="mb-1">
        Impressora {marca} {modelo} <br /> Número de Série {impressora}
      </p>
      <small>
        Alocada em <em>{local}</em>
      </small>
    </li>
  );
  return encaminhado ? (
    components
  ) : (
    <Link to={`chamado/${id}/solucao`}>{components}</Link>
  );
};

ChamadoStub.propTypes = {
  id: propTypes.number.isRequired,
  impressora: propTypes.string.isRequired,
  abertura: propTypes.string.isRequired,
  marca: propTypes.string.isRequired,
  modelo: propTypes.string.isRequired,
  local: propTypes.string.isRequired,
};

export default ChamadoStub;
