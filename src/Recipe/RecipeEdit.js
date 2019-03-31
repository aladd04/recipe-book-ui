import { PageHeader } from "../Helpers/PageHeader";
import { getRecipeById } from "./recipeService";

import React, {
  useState
} from "react";

export function RecipeEdit(props) {
  const [originalRecipe] = useState(() => {
    return getRecipeById(props.match.params.id);
  });

  return (
    <React.Fragment>
      <PageHeader text="Edit Recipe" />
      {originalRecipe.Name}
    </React.Fragment>
  );
}