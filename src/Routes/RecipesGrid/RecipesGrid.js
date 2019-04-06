import { getAllRecipes } from "../../Services/recipeService";
import { LoadingWrapper } from "../../Shared/LoadingWrapper";
import { PageHeader } from "../../Shared/PageHeader";
import { FilterableRecipesGrid } from "./Components/FilterableRecipesGrid";

import React, {
  useState,
  useEffect
} from "react";

export function RecipesGrid() {
  const [isLoading, setIsLoading] = useState(true);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getAllRecipes((response) => {
      setAllRecipes(response.data);
      setIsLoading(false);
    });
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