import React from "react";
import { Link } from "react-router-dom";
import ChamadoStub from "./ChamadoStub";
import { useTickets } from "../hooks/data";

export default () => {
  const [tickets, loading, error] = useTickets();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <div>{error.message || "Um erro aconteceu."}</div>;
  }
  return (
    <div className="dashboard">
      <h1 className="h3 font-weight-normal text-center">Chamados em aberto</h1>
      <div className="list-group mt-3">
        {tickets.map((chamado) => (
          <ChamadoStub
            key={chamado.id}
            id={chamado.id}
            impressora={chamado.device.serial}
            abertura={chamado.created}
            marca={chamado.device.family.brand.name}
            modelo={chamado.device.family.name}
            local={chamado.device.location.label}
          />
        ))}
      </div>
      <Link to="/chamado/impressora" className="btn btn-primary btn-block mt-3">
        Abrir Novo Chamado
      </Link>
    </div>
  );
};
