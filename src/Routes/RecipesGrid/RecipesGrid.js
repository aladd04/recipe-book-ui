import recipeService from "../../Services/recipeService";
import { LoadingWrapper } from "../../Shared/LoadingWrapper";
import { PageHeader } from "../../Shared/PageHeader";
import { FilterableRecipesGrid } from "./Components/FilterableRecipesGrid";
import React, {
  useState,
  useEffect
} from "react";

export function RecipesGrid(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    recipeService.getAllRecipes((response) => {
      setAllRecipes(response.data);
      setIsLoading(false);
    });
  }, []);

  function createRecipe() {
    props.history.push("/recipe/create");
  }

  return (
    <React.Fragment>
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
