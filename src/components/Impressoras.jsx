import React from "react";
import ImpressoraStub from "./ImpressoraStub";

const impressoras = [
  {
    id: 45,
    serie: "28868816954",
    marca: "Epson",
    modelo: "EcoTank L3110",
    local: "Campus Campinas",
  },
  {
    id: 60,
    serie: "55465785451",
    marca: "Samsung",
    modelo: "SL-M2070W",
    local: "Campus Sumaré",
  },
];

export default () => (
  <div className="impressoras">
    <h1 className="h3 font-weight-normal text-center">Abrindo Chamado</h1>
    <p>Selecione a Impressora</p>
    <div className="list-group mt-3">
      {impressoras.map((impressora) => (
        <ImpressoraStub
          key={impressora.id}
          id={impressora.id}
          serie={impressora.serie}
          marca={impressora.marca}
          modelo={impressora.modelo}
          local={impressora.local}
        />
      ))}
    </div>
  </div>
);
