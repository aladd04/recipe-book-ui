import { createApiInstance } from "./serviceConfig";

const api = createApiInstance("Recipe");

export function getAllRecipes(handleResponse, handleError) {
  api.get()
    .then(handleResponse)
    .catch(handleError);
}

export function getRecipeById(id, handleResponse, handleError) {
  api.get(`/${id}`)
    .then(handleResponse)
    .catch(handleError);
}