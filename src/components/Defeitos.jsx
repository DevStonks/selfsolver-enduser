import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDefects, useDevices } from "../hooks/data";

const navigate = (history) => (event) => {
  history.push(`/chamado/sugestao/${event.target.value}`);
};

const Defeitos = () => {
  const { deviceId } = useParams();
  const history = useHistory();
  const [defects, defectsLoading, defectsError] = useDefects();
  const [devices, devicesLoading, devicesError] = useDevices();

  if (defectsLoading || devicesLoading) {
    return <p>Loading...</p>;
  }
  if (defectsError || devicesError) {
    return <div>{defectsError || devicesError}</div>;
  }

  const device = devices.find((device) => device.id === parseInt(deviceId));

  if (!device) {
    return <div>Um erro ocorreu ao carregar informações sobre o aparelho.</div>;
  }

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
        Abrindo chamado para Impressora {device.family.brand.name}{" "}
        {device.family.name} número de série {device.serial} alocada em{" "}
        <em>{device.location.label}</em>.
      </small>
    </form>
  );
};

export default Defeitos;
