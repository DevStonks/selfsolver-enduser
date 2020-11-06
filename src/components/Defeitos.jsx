import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import ApiService from "../services/ApiService";
import AppContext from "../contexts/AppContext";

const navigate = (history) => (event) => {
  history.push(`/chamado/sugestao/${event.target.value}`);
};

const Defeitos = () => {
  const { deviceId } = useParams();
  const history = useHistory();
  const { devices, defects, setDefects, setDevices } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([ApiService.getDefects(), ApiService.getDevices()])
      .then(([defects, devices]) => {
        setLoading(false);
        setDefects(defects.data);
        setDevices(devices.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, [setDefects, setDevices]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <div>{error}</div>;
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
