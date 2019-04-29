import { useAxiosApi } from "../Hooks/useAxiosApi";

export function useRecipeService() {
  const api = useAxiosApi("Recipe");

  function getAllRecipes(handleResponse, handleError) {
    api.get("/")
      .then(handleResponse)
      .catch(handleError);
  }

  function getRecipeById(id, handleResponse, handleError) {
    api.get(`/${id}`)
      .then(handleResponse)
      .catch(handleError);
  }

  function createRecipe(recipe, handleResponse, handleError) {
    api.post("/", recipe)
      .then(handleResponse)
      .catch(handleError);
  }

  function updateRecipe(id, recipe, handleResponse, handleError) {
    api.put(`/${id}`, recipe)
      .then(handleResponse)
      .catch(handleError);
  }

  function deleteRecipe(id, handleResponse, handleError) {
    api.delete(`/${id}`)
      .then(handleResponse)
      .catch(handleError)
  }

  return {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
  };
}
