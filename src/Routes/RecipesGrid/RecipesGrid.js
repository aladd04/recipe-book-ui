import { SiteMessageContext } from "../../Contexts/SiteMessageContext";
import { useRecipeService } from "../../Hooks/useRecipeService";
import { LoadingWrapper } from "../../Shared/LoadingWrapper";
import { PageHeader } from "../../Shared/PageHeader";
import { FilterableRecipesGrid } from "./Components/FilterableRecipesGrid";
import React, {
  useState,
  useEffect,
  useContext
} from "react";

export function RecipesGrid(props) {
  const [, setSiteMessage] = useContext(SiteMessageContext);
  const recipeService = useRecipeService();
  const [isLoading, setIsLoading] = useState(true);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    if (props.location.state && props.location.state.alertMessage) {
      setSiteMessage(props.location.state.alertMessage);
    }

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
