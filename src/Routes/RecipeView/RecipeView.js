import useRecipeService from "../../Hooks/useRecipeService";
import { LoadingWrapper } from "../../Helpers/LoadingWrapper";
import { RecipeInfo } from "./Components/RecipeInfo";

import React, {
  useState,
  useEffect
} from "react";

export function RecipeView(props) {
  const recipeService = useRecipeService();
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    setIsLoading(true);
    recipeService.getRecipeById(props.match.params.id, (response) => {
      setRecipe(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <LoadingWrapper isLoading={isLoading}>
      <RecipeInfo recipe={recipe} />
    </LoadingWrapper>
  );
}