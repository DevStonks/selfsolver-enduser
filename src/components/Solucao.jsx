import React, { useState } from "react";
import { useDevices, useSolutions, useTickets } from "../hooks/data";
import { useParams } from "react-router-dom";

const impressora = {
  id: 45,
  serie: "28868816954",
  marca: "Epson",
  modelo: "EcoTank L3110",
  local: "Campus Campinas",
};

const Solucao = (props) => {
  const { serie, marca, modelo, local } = impressora;
  const { ticketId } = useParams();

  const [tickets, ticketsLoading, ticketsError] = useTickets();
  const [devices, devicesLoading, devicesError] = useDevices();
  const [solutions, solutionsLoading, solutionsError] = useSolutions(ticketId);

  const ticket = tickets.find((ticket) => ticket.id === parseInt(ticketId));
  const device =
    ticket &&
    ticket.device &&
    devices.find((device) => device.id === ticket.device.id);
  console.log([ticket, device, solutions]);

  if (devicesLoading || solutionsLoading || ticketsLoading) {
    return <p>Loading...</p>;
  }

  if (devicesError || solutionsError || ticketsError) {
    const error = devicesError || solutionsError || ticketsError;
    return <div>{error.message || "Um erro aconteceu."}</div>;
  }

  return (
    <div className="sugestao">
      <h1 className="h3 font-weight-normal text-center">Solução Sugerida</h1>
      <ol className="solucao">oi</ol>
      <button className="btn btn-primary btn-block mt-3" type="button">
        Problema Resolvido!
      </button>
      <button className="btn btn-secondary btn-block" type="button">
        Ainda não resolveu!
      </button>
      <small>
        Apresentando soluções para Impressora {marca} {modelo} número de série{" "}
        {serie} alocada em <em>{local}</em>.
      </small>
    </div>
  );
};

export default Solucao;
