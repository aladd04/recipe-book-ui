import { PageHeader } from "../../Shared/PageHeader";
import YesNoModal from "../../Shared/YesNoModal";
import { useRecipeService } from "../../Hooks/useRecipeService";
import { useRecipeForm } from "../../Hooks/useRecipeForm";
import { RecipeFormFields } from "./Components/RecipeFormFields";
import { RecipeCreateActions } from "./Components/RecipeCreateActions";
import { RecipeCreatedSnackbar } from "./Components/RecipeCreatedSnackbar";
import { RecipeValidationSummary } from "./Components/RecipeValidationSummary";
import React, {
  useState
} from "react";
import {
  Paper,
  Divider
} from "@material-ui/core";

export function CreateRecipe() {
  const recipeService = useRecipeService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [newRecipeId, setNewRecipeId] = useState("");
  const recipeForm = useRecipeForm({
    name: "",
    description: "",
    ingredients: "",
    instructions: ""
  });

  function onNameChange(e) {
    recipeForm.handleNameChange(e.target.value);
  }

  function onDescriptionChange(e) {
    recipeForm.handleDescriptionChange(e.target.value);
  }

  function onIngredientsChange(e) {
    recipeForm.handleIngredientsChange(e.target.value);
  }

  function onInstructionsChange(e) {
    recipeForm.handleInstructionsChange(e.target.value);
  }

  function onYesModal() {
    setIsModalOpen(false);
    recipeForm.reset();
  }

  function onNoModal() {
    setIsModalOpen(false);
  }

  function onCancelClick() {
    setIsModalOpen(true);
  }

  function onToastClose() {
    setToastOpen(false);
    setNewRecipeId("");
  }

  function createRecipe() {
    if (recipeForm.validate(true)) {
      recipeService.createRecipe(recipeForm.recipe, (response) => {
        if (response && response.status === 200 && response.data) {
          setNewRecipeId(response.data);
          setToastOpen(true);
          recipeForm.reset();
        } else {
          console.log(response);
        }
      }, (error) => {
        console.log(error.response);
      });
    }
  }

  return (
    <React.Fragment>
      <PageHeader text="Create a new Recipe" />
      <Paper style={{ padding: 12 }}>
        <RecipeValidationSummary errors={recipeForm.errors} />
        <RecipeFormFields
          recipe={recipeForm.recipe}
          errors={recipeForm.errors}
          onNameChange={onNameChange}
          onDescriptionChange={onDescriptionChange}
          onIngredientsChange={onIngredientsChange}
          onInstructionsChange={onInstructionsChange} />
        <Divider className="rb-divider" />
        <RecipeCreateActions
          onSaveClick={createRecipe}
          onCancelClick={onCancelClick} />
        <YesNoModal
          isOpen={isModalOpen}
          title="Cancel Changes"
          question="Are you sure you want to cancel all changes?"
          onYes={onYesModal}
          onNo={onNoModal} />
        <RecipeCreatedSnackbar
          toastOpen={toastOpen}
          onToastClose={onToastClose}
          newRecipeId={newRecipeId} />
      </Paper>
    </React.Fragment>
  );
}
