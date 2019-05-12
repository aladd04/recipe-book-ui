import { useUser } from "./useUser";
import { createAxiosApi } from "../Helpers/axiosApiHelper";
import {
  useState,
  useEffect
} from "react";

export function useRecipeService() {
  const user = useUser();
  const [recipeService, setRecipeService] = useState(() => {
    return createRecipeService(user);
  });

  useEffect(() => {
    setRecipeService(createRecipeService(user));
  }, [user]);

  return recipeService;
}

function createRecipeService(user) {
  const api = createAxiosApi("Recipe", user);

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
