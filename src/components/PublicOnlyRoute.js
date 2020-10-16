import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";

export default withRouter(({ redirectTo, ...props }) => {
  const token = localStorage.getItem("access-token");
  return !token ? (
    <Route {...props} />
  ) : (
    <Route {...props} children={() => <Redirect to={redirectTo} />} />
  );
});
