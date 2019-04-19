import { useAxiosApi } from "../Hooks/useAxiosApi";
import {
  setToken,
  removeToken
} from "../Helpers/authHelper";

export function useAuthService() {
  const api = useAxiosApi("Auth");

  function login(token, handleResponse, handleError) {
    const body = {
      token: token
    };
  
    api.post("/login", body)
      .then((response) => {
        if (response && response.status === 200 && response.data.token) {
          setToken(response.data.token);
          handleResponse(true);
        } else {
          removeToken();
          handleResponse(false);
        }
      })
      .catch((error) => {
        removeToken();
        if (handleError) {
          handleError(error);
        }
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
