import { useRecipeService } from "../../Hooks/useRecipeService";
import { RecipeForm } from "./Components/RecipeForm";
import React, {
  useState
} from "react";

export function CreateRecipe(props) {
  const recipeService = useRecipeService();
  const [recipe] = useState(setInitialRecipe());
  const [isExecuting, setIsExecuting] = useState(false);

  function createRecipe(newRecipe) {
    setIsExecuting(true);
    recipeService.createRecipe(newRecipe, (response) => {
      if (response && response.status === 200 && response.data) {
        props.history.push(`/recipe/${response.data}`, { 
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
    <RecipeForm
      pageTitle="Create a new Recipe"
      recipe={recipe}
      onSaveClick={createRecipe}
      isSaveExecuting={isExecuting} />
  );
}

function setInitialRecipe() {
  return {
    name: "",
    description: "",
    ingredients: "",
    instructions: ""
  };
}
