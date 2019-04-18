import { AuthTokenKey } from "../config";
import { useAxiosApi } from "../Hooks/useAxiosApi";

export function useAuthService() {
  const api = useAxiosApi("Auth");

  function login(token, handleResponse, handleError) {
    const body = {
      token: token
    };
  
    api.post("/login", body)
      .then((response) => {
        if (response && response.status === 200 && response.data.token) {
          localStorage.setItem(AuthTokenKey, token);
          handleResponse(true);
        } else {
          logout();
          handleResponse(false);
        }
      })
      .catch((error) => {
        logout();
        if (handleError) {
          handleError(error);
        }
      });
  }

  function logout() {
    localStorage.removeItem(AuthTokenKey);
  }

  return {
    login,
    logout
  };
}