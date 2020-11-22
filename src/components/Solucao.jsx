import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown/with-html";
import gfm from "remark-gfm";
import { useSolutions, useTickets } from "../hooks/data";
import youtube from "../remark-youtube";
import ApiService from "../services/ApiService";
import Forwarding from "./Forwarding";

const Solucao = (props) => {
  const history = useHistory();
  const { ticketId } = useParams();

  const [tickets, ticketsLoading, ticketsError] = useTickets();
  const [solutions, solutionsLoading, solutionsError] = useSolutions(ticketId);
  const [current, setCurrent] = useState(0);

  const ticket = tickets.find((ticket) => ticket.id === parseInt(ticketId));
  const device = ticket?.device;

  if (solutionsLoading || ticketsLoading) {
    return <p>Loading...</p>;
  }

  if (solutionsError || ticketsError) {
    const error = solutionsError || ticketsError;
    return <div>{error.message || "Um erro aconteceu."}</div>;
  }

  if (current >= solutions.length) {
    return <Forwarding ticketId={ticketId} />;
  }

  const solution = solutions[current];

  const markAsSolved = (event) =>
    event.preventDefault() ||
    ApiService.closeTicket(ticketId, solution.id)
      .then(() => history.push(`/dashboard`))
      .catch((err) => console.log(err));

  return (
    <div className="sugestao">
      <h1 className="h3 font-weight-normal text-center">Solução Sugerida</h1>
      <div className="solucao">
        <ReactMarkdown
          children={solution.description}
          plugins={[gfm, youtube]}
          allowDangerousHtml
        />
      </div>
      <button
        className="btn btn-primary btn-block mt-3"
        type="button"
        onClick={markAsSolved}
      >
        Problema Resolvido!
      </button>
      <button
        className="btn btn-secondary btn-block"
        type="button"
        onClick={() => setCurrent(current + 1)}
      >
        Ainda não resolveu!
      </button>
      <small>
        Apresentando soluções para Impressora {device.family.brand.name}{" "}
        {device.family.name} número de série {device.serial} alocada em{" "}
        <em>{device.location.label}</em>.
      </small>
    </div>
  );
};

export default Solucao;
