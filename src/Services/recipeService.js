import { createApiInstance } from "../Factories/apiFactory";

export function createRecipeService() {
  const api = createApiInstance("Recipe");

  function getAllRecipes(handleResponse, handleError) {
    api.get()
      .then(handleResponse)
      .catch(handleError);
  }

  function getRecipeById(id, handleResponse, handleError) {
    api.get(`/${id}`)
      .then(handleResponse)
      .catch(handleError);
  }

  return {
    getAllRecipes,
    getRecipeById
  }
}