import React, { useContext, useEffect, useState } from "react";
import ImpressoraStub from "./ImpressoraStub";
import ApiService from "../services/ApiService";
import AppContext from "../contexts/AppContext";

export default () => {
  const { devices, setDevices } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    ApiService.getDevices()
      .then(({ data }) => {
        setLoading(false);
        setDevices(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, [setDevices]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  console.log(devices);
  return (
    <div className="impressoras">
      <h1 className="h3 font-weight-normal text-center">Abrindo Chamado</h1>
      <p>Selecione a Impressora</p>
      <div className="list-group mt-3">
        {devices.map((impressora) => (
          <ImpressoraStub
            key={impressora.id}
            id={impressora.id}
            serie={impressora.serial}
            marca={impressora.family.brand.name}
            modelo={impressora.family.name}
            local={impressora.location.label}
          />
        ))}
      </div>
    </div>
  );
};
