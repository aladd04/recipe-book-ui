import { PageHeader } from "../../../Shared/PageHeader";
import YesNoModal from "../../../Shared/YesNoModal";
import { useRecipeForm } from "../../../Hooks/useRecipeForm";
import { RecipeFormFields } from "./RecipeFormFields";
import { RecipeFormActions } from "./RecipeFormActions";
import { RecipeValidationSummary } from "./RecipeValidationSummary";
import React, {
  useState
} from "react";
import {
  Paper,
  Divider,
  LinearProgress
} from "@material-ui/core";

export function RecipeForm(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const recipeForm = useRecipeForm(props.recipe);

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

  function onSaveClick() {
    if (recipeForm.isValid()) {
      props.onSaveClick(recipeForm.recipe);
    }
  }

  return (
    <React.Fragment>
      <PageHeader text={props.pageTitle} />
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
        {props.isSaveExecuting ? (<LinearProgress />) : (null)}
        <RecipeFormActions
          onSaveClick={onSaveClick}
          onCancelClick={onCancelClick} />
        <YesNoModal
          isOpen={isModalOpen}
          title="Cancel Changes"
          question="Are you sure you want to cancel all changes?"
          onYes={onYesModal}
          onNo={onNoModal} />
      </Paper>
    </React.Fragment>
  );
}
