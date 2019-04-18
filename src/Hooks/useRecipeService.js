import { useAxiosApi } from "../Hooks/useAxiosApi";

export function useRecipeService() {
  const api = useAxiosApi("Recipe");

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
  };
}
