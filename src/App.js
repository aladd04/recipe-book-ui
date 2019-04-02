import { Menu } from "./Layout/Menu";
import Footer from "./Layout/Footer";
import { RecipesGrid } from "./Routes/RecipesGrid/RecipesGrid";
import { RecipeView } from "./Routes/RecipeView/RecipeView";
import { RecipeEdit } from "./Routes/RecipeEdit/RecipeEdit";
import { Login } from "./Routes/Login/Login";
import { SignUp } from "./Routes/SignUp/SignUp";
import { Settings } from "./Routes/Settings/Settings";
import { SignOut } from "./Routes/SignOut/SignOut";
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
          <Route exact path="/" component={RecipesGrid} />
          <Route exact path="/recipe/:id" component={RecipeView} />
          <Route exact path="/recipe/edit/:id" component={RecipeEdit} />
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