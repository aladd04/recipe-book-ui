import { useRecipeService } from "../../Hooks/useRecipeService";
import { RecipeSavedSnackbar } from "./Components/RecipeSavedSnackbar";
import { RecipeForm } from "./Components/RecipeForm";
import React, {
  useState
} from "react";

export function CreateRecipe() {
  const recipeService = useRecipeService();
  const [recipe, setRecipe] = useState(setInitialRecipe());
  const [toastOpen, setToastOpen] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [newRecipeId, setNewRecipeId] = useState("");

  function onToastClose() {
    setToastOpen(false);
    setNewRecipeId("");
  }

  function createRecipe(newRecipe) {
    setIsExecuting(true);
    recipeService.createRecipe(newRecipe, (response) => {
      if (response && response.status === 200 && response.data) {
        setNewRecipeId(response.data);
        setToastOpen(true);
        setRecipe(setInitialRecipe());
      } else {
        console.log(response);
      }

      setIsExecuting(false);
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
      <RecipeForm
        pageTitle="Create a new Recipe"
        recipe={recipe}
        onSaveClick={createRecipe}
        isSaveExecuting={isExecuting} />
      <RecipeSavedSnackbar
        toastOpen={toastOpen}
        onToastClose={onToastClose}
        recipeId={newRecipeId} />
    </React.Fragment>
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
