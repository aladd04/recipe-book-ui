import axios from "axios";

export default function useRecipeService() {
  const urlPrefix = "http://localhost:51301/api/";

  function handleError(error) {
    console.log(error);
  }

  function getAllRecipes(handleResponse) {
    axios.get(`${urlPrefix}/Recipe`)
      .then(handleResponse)
      .catch(handleError);
  }

  function getRecipeById(id, handleResponse) {
    axios.get(`${urlPrefix}/Recipe/${id}`)
      .then(handleResponse)
      .catch(handleError);
  }
  
  return {
    getAllRecipes,
    getRecipeById
  }
}