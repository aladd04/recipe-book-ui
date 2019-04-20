import { isAuthenticated } from "../../Helpers/authHelper";
import { PageHeader } from "../../Shared/PageHeader";
import YesNoModal from "../../Shared/YesNoModal";
import { useRecipeService } from "../../Hooks/useRecipeService";
import React, {
  useState,
  useEffect
} from "react";
import {
  Paper,
  TextField,
  Button,
  Divider,
  Snackbar,
  SnackbarContent,
  Typography
} from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

export function CreateRecipe() {
  const disableActions = !isAuthenticated();
  const recipeService = useRecipeService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [recipe, setRecipe] = useState(() => getBlankRecipe());
  const [errors, setErrors] = useState(() => getBlankErrors());

  useEffect(() => {
    validateForm(false);
  }, [recipe]);

  function getBlankRecipe() {
    return {
      name: "",
      description: "",
      ingredients: "",
      instructions: ""
    };
  }

  function getBlankErrors() {
    return {
      name: {
        isDirty: false,
        isValid: true,
        message: "Name is required"
      },
      ingredients: {
        isDirty: false,
        isValid: true,
        message: "Ingredients are required"
      },
      instructions: {
        isDirty: false,
        isValid: true,
        message: "Instructions are required"
      }
    };
  }

  function validateForm(isSubmitting) {
    const foundErrors = Object.assign({}, errors);
    Object.keys(foundErrors).forEach(k => {
      if (isSubmitting) {
        foundErrors[k].isDirty = true;
      }

      if (foundErrors[k].isDirty) {
        foundErrors[k].isValid = recipe[k].trim() !== "";
      }
    });

    setErrors(foundErrors);

    return Object.keys(foundErrors).every(k => foundErrors[k].isValid);
  }

  function handleNameChange(e) {
    setRecipe({
      ...recipe,
      name: e.target.value
    });

    setErrors({
      ...errors,
      name: {
        ...errors.name,
        isDirty: true
      }
    });
  }

  function handleDescriptionChange(e) {
    setRecipe({
      ...recipe,
      description: e.target.value
    });
  }

  function handleIngredientsChange(e) {
    setRecipe({
      ...recipe,
      ingredients: e.target.value
    });

    setErrors({
      ...errors,
      ingredients: {
        ...errors.ingredients,
        isDirty: true
      }
    });
  }

  function handleInstructionsChange(e) {
    setRecipe({
      ...recipe,
      instructions: e.target.value
    });

    setErrors({
      ...errors,
      instructions: {
        ...errors.instructions,
        isDirty: true
      }
    });
  }

  function onYesModal() {
    setIsModalOpen(false);
    setRecipe(getBlankRecipe());
    setErrors(getBlankErrors());
  }

  function onNoModal() {
    setIsModalOpen(false);
  }

  function onCancelClick() {
    setIsModalOpen(true);
  }

  function handleToastClose() {
    setToastOpen(false);
  }

  function createRecipe() {
    if (validateForm(true)) {
      recipeService.createRecipe(recipe, (response) => {
        console.log(response);
        if (response && response.status === 200) {
          // TODO: show create message? redirect to all recipes? both?
          // For above, migrate snackbar code to achieve it?
        } else {
          // TODO: display error
        }
      }, (error) => {
        console.log(error);
        // TODO: display error
      });
    }
  }

  const errorsToShow = Object.keys(errors)
    .map(k => errors[k])
    .filter(e => !e.isValid);

  return (
    <React.Fragment>
      <PageHeader text="Create a new Recipe" />
      <Paper style={{ padding: 12 }}>
        <div
          className="rb-validation-summary"
          style={errorsToShow.length > 0 ? {} : { display: "none" }}>
          <ul>
            {errorsToShow.map(e => {
              return (
                <li key={e.message}>
                  <Typography variant="body1">
                    {e.message}
                  </Typography>
                </li>
              );
            })}
          </ul>
        </div>
        <TextField
          fullWidth
          required
          error={!errors.name.isValid}
          value={recipe.name}
          onChange={handleNameChange}
          label="Name"
          placeholder=""
          margin="normal"
          variant="outlined" />
        <TextField
          fullWidth
          multiline
          value={recipe.description}
          onChange={handleDescriptionChange}
          label="Description"
          placeholder=""
          margin="normal"
          variant="outlined" />
        <TextField
          fullWidth
          required
          error={!errors.ingredients.isValid}
          multiline
          value={recipe.ingredients}
          onChange={handleIngredientsChange}
          label="Ingredients"
          helperText="Separate ingredients with a newline"
          placeholder=""
          margin="normal"
          variant="outlined" />
        <TextField
          fullWidth
          required
          error={!errors.instructions.isValid}
          multiline
          value={recipe.instructions}
          onChange={handleInstructionsChange}
          label="Instructions"
          helperText="Separate instructions with a newline"
          placeholder=""
          margin="normal"
          variant="outlined" />
        <Divider className="rb-divider" />
        <Button
          variant="contained"
          color="primary"
          disabled={disableActions}
          onClick={createRecipe}>
          Save
        </Button>
        <Button
          variant="contained"
          onClick={onCancelClick}
          style={{ marginLeft: 10 }}>
          Cancel
        </Button>
        <YesNoModal
          isOpen={isModalOpen}
          title="Cancel Changes"
          question="Are you sure you want to cancel all changes?"
          onYes={onYesModal}
          onNo={onNoModal} />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={toastOpen}
          autoHideDuration={5000}
          onClose={handleToastClose}>
          <SnackbarContent
            style={{ backgroundColor: green[600] }}
            message={
              <span>
                <CheckCircleIcon />
                Recipe Created!
              </span>
            }
            action={
              <IconButton onClick={handleToastClose}>
                <CloseIcon />
              </IconButton>
            } />
        </Snackbar>
      </Paper>
    </React.Fragment>
  );
}
