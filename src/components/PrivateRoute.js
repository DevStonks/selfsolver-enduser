import React from "react";
import { withRouter, Redirect, Route } from "react-router-dom";

export default withRouter((props) => {
  const token = localStorage.getItem("access-token");
  return token ? (
    <Route {...props} />
  ) : (
    <Route {...props} children={() => <Redirect to="/" />} />
  );
});
