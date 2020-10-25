import React, { useState } from "react";
import propTypes from "prop-types";
import TokenService from "../services/TokenService";

const AuthContext = React.createContext({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (token) => {
    TokenService.save(token);
    const { identity } = TokenService.read();
    setUser(identity);
  };
  const logout = () => {
    TokenService.delete();
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default AuthContext;
