import { Menu } from "./Layout/Menu";
import { Footer } from "./Layout/Footer";
import { RecipesGrid } from "./Routes/RecipesGrid/RecipesGrid";
import { RecipeView } from "./Routes/RecipeView/RecipeView";
import { CreateRecipe } from "./Routes/CreateRecipe/CreateRecipe";
import { EditRecipe } from "./Routes/EditRecipe/EditRecipe";
import { Login } from "./Routes/Login/Login";
import { Logout } from "./Routes/Logout/Logout";
import { RouteNotFound } from "./Shared/RouteNotFound";
import "typeface-roboto";
import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./site.scss";

export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Menu />
      <main id="main-content">
        <Switch>
          <Route exact path="/" component={RecipesGrid} />
          <Route exact path="/recipe/create" component={CreateRecipe} />
          <Route exact path="/recipe/:id" component={RecipeView} />
          <Route exact path="/recipe/:id/edit" component={EditRecipe} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route component={RouteNotFound} />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
