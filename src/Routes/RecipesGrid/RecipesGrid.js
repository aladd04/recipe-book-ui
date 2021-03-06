import { useRecipeService } from "../../Hooks/useRecipeService";
import { LoadingWrapper } from "../../Shared/LoadingWrapper";
import { PageHeader } from "../../Shared/PageHeader";
import { RouteAlertMessage } from "../../Shared/RouteAlertMessage";
import { FilterableRecipesGrid } from "./Components/FilterableRecipesGrid";
import React, {
  useState,
  useEffect
} from "react";

export function RecipesGrid(props) {
  const recipeService = useRecipeService();
  const [isLoading, setIsLoading] = useState(true);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    recipeService.getAllRecipes((response) => {
      setAllRecipes(response.data);
      setIsLoading(false);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function createRecipe() {
    props.history.push("/recipe/create");
  }

  return (
    <React.Fragment>
      <RouteAlertMessage {...props} />
      <PageHeader
        text="Recipes"
        actionText="Create a new Recipe"
        actionClick={createRecipe} />
      <LoadingWrapper isLoading={isLoading}>
        <FilterableRecipesGrid allRecipes={allRecipes} />
      </LoadingWrapper>
    </React.Fragment>
  );
}
