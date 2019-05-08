import { createAxiosApi } from "../Helpers/axiosApiHelper";
import authHelper from "../Helpers/authHelper";

function createAuthService() {
  const resource = "Auth";

  function login(token, handleResponse, handleError) {
    const body = {
      token: token
    };

    createAxiosApi(resource)
      .post("/login", body)
      .then((response) => {
        if (response && response.status === 200 && response.data.token) {
          authHelper.setUserToken(response.data.token);
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
    authHelper.removeUserToken();
  }

  return {
    login,
    logout
  };
}

const authService = createAuthService();
export default authService;
