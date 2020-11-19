import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDefects, useDevices } from "../hooks/data";
import ApiService from "../services/ApiService";

const Defeitos = () => {
  const { deviceId } = useParams();
  const history = useHistory();
  const [defects, defectsLoading, defectsError] = useDefects();
  const [devices, devicesLoading, devicesError] = useDevices();
  const [defect, setDefect] = useState("");

  if (defectsLoading || devicesLoading) {
    return <p>Loading...</p>;
  }
  if (defectsError || devicesError) {
    const error = defectsError || devicesError;
    return <div>{error.message || "Um erro aconteceu."}</div>;
  }

  const device = devices.find((device) => device.id === parseInt(deviceId));

  if (!device) {
    return <div>Um erro ocorreu ao carregar informações sobre o aparelho.</div>;
  }

  const onSubmit = (event) =>
    event.preventDefault() ||
    ApiService.postTicket({
      device: parseInt(deviceId),
      defect: parseInt(defect),
    })
      .then(({ data: ticket }) =>
        history.push(`/chamado/sugestao/${ticket.id}`)
      )
      .catch((err) => console.log(err));

  return (
    <form className="defeito" onSubmit={onSubmit}>
      <h1 className="h3 font-weight-normal text-center">Abrindo Chamado</h1>
      <div className="form-group">
        <label htmlFor="defeito">
          Selecione um defeito que sua impressora está apresentando:
        </label>
        <select
          className="form-control"
          id="defeito"
          onChange={(event) => setDefect(event.target.value)}
        >
          <option value="">-- Escolha na lista de defeitos --</option>
          {defects.map((defeito) => (
            <option key={defeito.id} value={defeito.id}>
              {defeito.description}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary btn-block mt-3" disabled={!defect}>
        Abrir Novo Chamado
      </button>
      <small>
        Abrindo chamado para Impressora {device.family.brand.name}{" "}
        {device.family.name} número de série {device.serial} alocada em{" "}
        <em>{device.location.label}</em>.
      </small>
    </form>
  );
};

export default Defeitos;
