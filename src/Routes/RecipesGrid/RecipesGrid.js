import useRecipeService from "../../Hooks/useRecipeService";
import { LoadingWrapper } from "../../Helpers/LoadingWrapper";
import { PageHeader } from "../../Helpers/PageHeader";
import { FilterableRecipesGrid } from "./Components/FilterableRecipesGrid";

import React, {
  useState,
  useEffect
} from "react";

export function RecipesGrid() {
  let delayStartLoadingTimer;

  const recipeService = useRecipeService();
  const [isLoading, setIsLoading] = useState(true);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    delayStartLoadingTimer = setTimeout(() => {
      recipeService.getAllRecipes((response) => {
        setAllRecipes(response.data);
        setIsLoading(false);
      });
    }, 300);

    return () => {
      clearTimeout(delayStartLoadingTimer);
    };
  }, []);

  return (
    <React.Fragment>
      <PageHeader text="Recipes" />
      <LoadingWrapper isLoading={isLoading}>
        <FilterableRecipesGrid allRecipes={allRecipes} />
      </LoadingWrapper>
    </React.Fragment>
  );
}