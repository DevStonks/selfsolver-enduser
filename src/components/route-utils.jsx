import React from "react";
import { withRouter, Redirect, Route } from "react-router-dom";

const privateCheck = () => localStorage.getItem("access-token");
const publicOnlyCheck = () => !localStorage.getItem("access-token");

const CheckedRoute = (check) =>
  withRouter(({ redirectTo = "/", ...props }) => {
    const routeProps = { ...props };
    if (!check()) {
      // Use children prop to override any Route renderable prop.
      routeProps.children = () => <Redirect to={redirectTo} />;
    }
    return (
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      <Route {...routeProps} />
    );
  });

export const PrivateRoute = CheckedRoute(privateCheck);
export const PublicOnlyRoute = CheckedRoute(publicOnlyCheck);
