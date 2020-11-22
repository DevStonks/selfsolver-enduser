import React from "react";
import { useHistory } from "react-router-dom";
import ApiService from "../services/ApiService";

export default ({ ticketId }) => {
  const history = useHistory();

  const markAsForwarded = (event) =>
    event.preventDefault() ||
    ApiService.forwardTicket(ticketId)
      .then(() => history.push(`/dashboard`))
      .catch((err) => console.log(err));

  return (
    <div className="sugestao">
      <p className="lead">
        Nossas soluções de auto-atendimento se esgotaram. Por favor, encaminhe o
        atendimento para o nosso suporte usando o botão abaixo.
      </p>
      <button
        className="btn btn-primary btn-block mt-3"
        type="button"
        onClick={markAsForwarded}
      >
        Encaminhar para o suporte
      </button>
    </div>
  );
};
