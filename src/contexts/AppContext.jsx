import React, { useState } from "react";
import propTypes from "prop-types";

const AppContext = React.createContext({
  defects: [],
  devices: [],
  tickets: [],
  setDefects: () => {},
  setDevices: () => {},
  setTickets: () => {},
});

export const AppProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [defects, setDefects] = useState([]);
  const [devices, setDevices] = useState([]);
  return (
    <AppContext.Provider
      value={{ defects, devices, tickets, setDefects, setDevices, setTickets }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default AppContext;
