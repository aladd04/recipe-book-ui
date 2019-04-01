import useRecipeService from "../Hooks/useRecipeService";
import { RouterLink } from "../Helpers/RouterLink";
import { PageHeader } from "../Helpers/PageHeader";
import { RecipeInfoSection } from "./RecipeInfoSection";

import React, {
  useState,
  useEffect
} from "react";
import {
  Paper,
  Button
} from "@material-ui/core";

export function RecipeInfo(props) {
  const recipeService = useRecipeService();
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    recipeService.getRecipeById(props.match.params.id,
      (response) => {
        setRecipe(response.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <RecipeInfoView recipe={recipe} {...props} />
      )}
    </React.Fragment>
  );
}

function RecipeInfoView({ recipe, ...props }) {
  function navigateToAllRecipes() {
    props.history.goBack();
  }

  const dateString = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(new Date(recipe.updateDate));

  const timeString = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "numeric",
    hour12: "true"
  }).format(new Date(recipe.updateDate));

  const dateTimeString = `${dateString} at ${timeString}`;
  const ownerBlurb = 
    `${recipe.ownerName} last updated this recipe on ${dateTimeString}`;

  return (
    <React.Fragment>
      <PageHeader text={recipe.name} subText={ownerBlurb} />
      <Paper style={{ padding: 12 }}>
        <RecipeInfoSection
          title="Description"
          body={recipe.description} />
        <RecipeInfoSection
          title="Ingredients"
          body={recipe.ingredients} />
        <RecipeInfoSection
          title="Instructions"
          body={recipe.instructions} />
        <RouterLink to={`/recipe/edit/${recipe.id}`}>
          <Button size="small" color="primary">Edit Recipe</Button>
        </RouterLink>
        <Button size="small" color="primary" onClick={navigateToAllRecipes}>
          Back to Recipes
        </Button>
      </Paper>
    </React.Fragment>
  );
}