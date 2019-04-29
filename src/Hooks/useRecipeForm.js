import {
  useState,
  useEffect
} from "react";

export function useRecipeForm(initialRecipe) {
  const [recipe, setRecipe] = useState(initialRecipe);
  const [errors, setErrors] = useState(() => getBlankErrors());

  useEffect(() => {
    validate(false);
  }, [recipe]);

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

  function markFieldDirty(field) {
    const updatingErrors = Object.assign({}, errors);
    updatingErrors[field].isDirty = true;

    setErrors(updatingErrors);
  }

  function reset() {
    setRecipe(initialRecipe);
    setErrors(getBlankErrors());
  }

  function validate(markAllDirty) {
    const foundErrors = Object.assign({}, errors);
    Object.keys(foundErrors).forEach(k => {
      if (markAllDirty) {
        foundErrors[k].isDirty = true;
      }

      if (foundErrors[k].isDirty) {
        foundErrors[k].isValid = recipe[k].trim() !== "";
      }
    });

    setErrors(foundErrors);
    return Object.keys(foundErrors).every(k => foundErrors[k].isValid);
  }

  function handleNameChange(value) {
    setRecipe({ ...recipe, name: value});
    markFieldDirty("name");
  }

  function handleDescriptionChange(value) {
    setRecipe({ ...recipe, description: value });
  }

  function handleIngredientsChange(value) {
    setRecipe({ ...recipe, ingredients: value });
    markFieldDirty("ingredients");
  }

  function handleInstructionsChange(value) {
    setRecipe({ ...recipe, instructions: value });
    markFieldDirty("instructions");
  }

  return {
    recipe,
    errors,
    validate,
    reset,
    handleNameChange,
    handleDescriptionChange,
    handleIngredientsChange,
    handleInstructionsChange
  };
}