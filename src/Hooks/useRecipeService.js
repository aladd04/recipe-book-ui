import { ApiUrl } from "./serviceConfig";

import axios from "axios";

export default function useRecipeService() {
  function handleError(error) {
    console.log(error);
  }

  function getAllRecipes(handleResponse) {
    axios.get(`${ApiUrl}/Recipe`)
      .then(handleResponse)
      .catch(handleError);
  }

  function getRecipeById(id, handleResponse) {
    axios.get(`${ApiUrl}/Recipe/${id}`)
      .then(handleResponse)
      .catch(handleError);
  }
  
  return {
    getAllRecipes,
    getRecipeById
  }
}