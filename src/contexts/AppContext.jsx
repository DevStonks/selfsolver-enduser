import React, { useState } from "react";
import propTypes from "prop-types";

const AppContext = React.createContext({
  devices: [],
  tickets: [],
  setDevices: () => {},
  setTickets: () => {},
});

export const AppProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [devices, setDevices] = useState([]);
  return (
    <AppContext.Provider value={{ devices, tickets, setDevices, setTickets }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default AppContext;
