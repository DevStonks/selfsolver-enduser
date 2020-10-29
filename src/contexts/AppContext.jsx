import React, { useState } from "react";
import propTypes from "prop-types";

const AppContext = React.createContext({
  tickets: [],
  loading: false,
  setLoading: () => {},
  setTickets: () => {},
});

export const AppProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  return (
    <AppContext.Provider value={{ tickets, setTickets }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default AppContext;
