import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown/with-html";
import gfm from "remark-gfm";
import { useSolutions, useTickets } from "../hooks/data";
import youtube from "../remark-youtube";

const Solucao = (props) => {
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
    return (
      <div className="sugestao">
        <p className="lead">
          Nossas soluções de auto-atendimento se esgotaram. Por favor, encaminhe
          o atendimento para o nosso suporte usando o botão abaixo.
        </p>
        <a
          href="https://trello.com/b/XHKI7G7o/selfsolver"
          className="btn btn-primary btn-block mt-3"
          type="button"
        >
          Encaminhar para o suporte
        </a>
      </div>
    );
  }

  const solution = solutions[current];

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
      <button className="btn btn-primary btn-block mt-3" type="button">
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
