import { Menu } from "./MenuComponent/Menu";
import { RecipeList } from "./RecipeComponent/RecipeList";
import { Login } from "./UserComponent/Login";

import "typeface-roboto";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route exact path="/" component={RecipeList} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}