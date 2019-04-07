import { ApiUrl } from "./serviceConfig";

import axios from "axios";

export function getAllRecipes(handleResponse, handleError) {
  axios.get(`${ApiUrl}/Recipe`)
    .then(handleResponse)
    .catch(handleError);
}

export function getRecipeById(id, handleResponse, handleError) {
  axios.get(`${ApiUrl}/Recipe/${id}`)
    .then(handleResponse)
    .catch(handleError);
}