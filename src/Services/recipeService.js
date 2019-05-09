import { createAxiosApi } from "../Helpers/axiosApiHelper";

function createRecipeService() {
  const resource = "Recipe";

  function getAllRecipes(handleResponse, handleError) {
    createAxiosApi(resource)
      .get("/")
      .then(handleResponse)
      .catch(handleError);
  }

  function getRecipeById(id, handleResponse, handleError) {
    createAxiosApi(resource)
      .get(`/${id}`)
      .then(handleResponse)
      .catch(handleError);
  }

  function createRecipe(recipe, handleResponse, handleError) {
    createAxiosApi(resource)
      .post("/", recipe)
      .then(handleResponse)
      .catch(handleError);
  }

  function updateRecipe(id, recipe, handleResponse, handleError) {
    createAxiosApi(resource)
      .put(`/${id}`, recipe)
      .then(handleResponse)
      .catch(handleError);
  }

  function deleteRecipe(id, handleResponse, handleError) {
    createAxiosApi(resource)
      .delete(`/${id}`)
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

const recipeService = createRecipeService();
export default recipeService;
