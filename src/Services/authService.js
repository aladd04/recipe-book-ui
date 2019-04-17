import { createApiInstance } from "../Factories/apiFactory";
import {
  saveToken,
  removeToken
} from "../Factories/authFactory";

export function createAuthService() {
  const api = createApiInstance("Auth");

  function login(token, handleResponse, handleError) {
    const body = {
      token: token
    };
  
    api.post("/login", body)
      .then((response) => {
        if (response && response.status === 200 && response.data.token) {
          saveToken(response.data.token);
          handleResponse(true);
        } else {
          removeToken();
          handleResponse(false);
        }
      })
      .catch((error) => {
        removeToken();
      });
  }

  function logout() {
    removeToken();
  }

  return {
    login,
    logout
  };
}