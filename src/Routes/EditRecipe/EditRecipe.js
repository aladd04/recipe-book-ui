import { useRecipeService } from "../../Hooks/useRecipeService";
import { LoadingWrapper } from "../../Shared/LoadingWrapper";
import { RecipeForm } from "../CreateRecipe/Components/RecipeForm";
import React, {
  useState,
  useEffect
} from "react";

export function EditRecipe(props) {
  const recipeService = useRecipeService();
  const [isLoading, setIsLoading] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [recipe, setRecipe] = useState({
    id: "",
    name: "",
    description: "",
    ingredients: "",
    instructions: ""
  });

  useEffect(() => {
    setIsLoading(true);
    recipeService.getRecipeById(props.match.params.id, (response) => {
      setRecipe(response.data);
      setIsLoading(false);
    }, (error) => {
      if (error.response.status === 404) {
        props.history.push("/notfound");
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function saveRecipe(updatedRecipe) {
    setIsExecuting(true);
    recipeService.updateRecipe(recipe.id, updatedRecipe, (response) => {
      if (response && response.status === 200) {
        props.history.push(`/recipe/${recipe.id}`, { 
          alertMessage: "Recipe Saved!"
        });
      } else {
        console.log(response);
        setIsExecuting(false);
      }
    }, (error) => {
      console.log(error);
      if (error.response) {
        console.log(error.response);
      }

      setIsExecuting(false);
    });
  }

  return (
    <React.Fragment>
      <LoadingWrapper isLoading={isLoading}>
        <RecipeForm
          pageTitle={`Edit ${recipe.name}`}
          recipe={recipe}
          onSaveClick={saveRecipe}
          isSaveExecuting={isExecuting} />
      </LoadingWrapper>
    </React.Fragment>
  );
}
