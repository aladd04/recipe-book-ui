import { Menu } from "./Layout/Menu";
import Footer from "./Layout/Footer";
import { RecipeGridFilterable } from "./Recipe/RecipeGridFilterable";
import { RecipeInfo } from "./Recipe/RecipeInfo";
import { Login } from "./User/Login";
import { SignUp } from "./User/SignUp";
import { Settings } from "./User/Settings";
import { SignOut } from "./User/SignOut";
import { RouteNotFound } from "./Helpers/RouteNotFound";

import "typeface-roboto";
import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./site.css";

export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Menu signedIn={false} />
      <main id="main-content">
        <Switch>
          <Route exact path="/" component={RecipeGridFilterable} />
          <Route exact path="/recipe/:id" component={RecipeInfo} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/settings" component={Settings} />
          <Route path="/signout" component={SignOut} />
          <Route component={RouteNotFound} />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}