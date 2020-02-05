import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isLogged } from "../helpers/AuthHandler";

// children: é o conteúdo que vem da
// tag <RouteHandler> definido no arquivo Routes.js
// Ex:  <RouteHandler exact path="/signup">
//          <SignUp />
//      </RouteHandler>
// Nesse caso <SignUp /> é o children

export default ({ children, ...rest }) => {
  let logged = isLogged();
  let authorized = rest.private && !logged ? false : true;

  return (
    <Route
      {...rest}
      render={() => (authorized ? children : <Redirect to="/signin" />)}
    />
  );
};
