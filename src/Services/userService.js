import {
  createApiInstance,
  saveAuthToken,
  removeAuthToken
} from "./serviceConfig";

export function createUserService() {
  const api = createApiInstance("AppUser");

  function authenticateWithGoogle(token, handleResponse, handleError) {
    const body = {
      token: token
    };
  
    api.post("/authenticate/google", body)
      .then((response) => {
        if (response && response.status === 200 && response.data.token) {
          saveAuthToken(response.data.token);
          handleResponse(true);
        } else {
          removeAuthToken();
          handleResponse(false);
        }
      })
      .catch((error) => {
        removeAuthToken();
        console.log(error);
      });
  }

  return {
    authenticateWithGoogle
  };
}