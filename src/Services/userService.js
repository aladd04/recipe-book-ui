import {
  createApiInstance,
  saveAuthToken,
  removeAuthToken
} from "./serviceConfig";

const api = createApiInstance("AppUser");

export function authenticateWithGoogle(token, handleResponse, handleError) {
  const body = {
    token: token
  };

  api.post("/authenticate/google", body)
    .then((response) => {
      if (response.token) {
        saveAuthToken(response.token);
        handleResponse(true);
      } else {
        removeAuthToken();
        handleResponse(false);
      }
    })
    .catch((error) => {
      removeAuthToken();
      handleError(error);
    });
}