import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import propTypes from "prop-types";
import AuthContext from "../contexts/AuthContext";

export const PrivateRoute = ({ redirectTo, ...props }) => {
  const { user } = useContext(AuthContext);
  const routeProps = { ...props };
  if (!user) {
    // Use children prop to override any Route renderable prop.
    routeProps.children = () => <Redirect to={redirectTo} />;
  }
  return (
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <Route {...routeProps} />
  );
};

PrivateRoute.defaultProps = {
  redirectTo: "/",
};

PrivateRoute.propTypes = {
  redirectTo: propTypes.string,
};

export const PublicOnlyRoute = ({ redirectTo, ...props }) => {
  const { user } = useContext(AuthContext);
  const routeProps = { ...props };
  if (user) {
    // Use children prop to override any Route renderable prop.
    routeProps.children = () => <Redirect to={redirectTo} />;
  }
  return (
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <Route {...routeProps} />
  );
};

PublicOnlyRoute.defaultProps = {
  redirectTo: "/",
};

PublicOnlyRoute.propTypes = {
  redirectTo: propTypes.string,
};
