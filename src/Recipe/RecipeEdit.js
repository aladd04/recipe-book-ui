import useRecipeService from "../Hooks/useRecipeService";
import { PageHeader } from "../Helpers/PageHeader";

import React, {
  useState
} from "react";

export function RecipeEdit(props) {
  const recipeService = useRecipeService();

  return (
    <React.Fragment>
      <PageHeader text="Edit Recipe" />
    </React.Fragment>
  );
}