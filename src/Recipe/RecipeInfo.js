import { RouterLink } from "../Helpers/RouterLink";
import { PageHeader } from "../Helpers/PageHeader";
import { RecipeInfoSection } from "./RecipeInfoSection";
import { getRecipeById } from "./recipeService";

import React, {
  useState
} from "react";
import {
  Paper,
  Button
} from "@material-ui/core";

export function RecipeInfo(props) {
  const [recipe] = useState(() => {
    return getRecipeById(props.match.params.id);
  });

  const dateString = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(new Date(recipe.UpdateDate));

  const timeString = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "numeric",
    hour12: "true"
  }).format(new Date(recipe.UpdateDate));

  const dateTimeString = `${dateString} at ${timeString}`;
  const ownerBlurb = 
    `${recipe.OwnerName} last updated this recipe on ${dateTimeString}.`;

  return (
    <React.Fragment>
      <PageHeader text={recipe.Name} />
      <Paper style={{ padding: 12 }}>
        <RecipeInfoSection
          title="Owner"
          body={ownerBlurb} />
        <RecipeInfoSection
          title="Description"
          body={recipe.Description} />
        <RecipeInfoSection
          title="Ingredients"
          body={recipe.Ingredients} />
        <RecipeInfoSection
          title="Instructions"
          body={recipe.Instructions} />
        <Button size="small" color="primary">Edit Recipe</Button>
        <RouterLink to="/">
          <Button size="small" color="primary">Back to Recipes</Button>
        </RouterLink>
      </Paper>
    </React.Fragment>
  );
}