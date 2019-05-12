import userTokenHelper from "../Helpers/userTokenHelper";
import { createAxiosApi } from "../Helpers/axiosApiHelper";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";

export function useUserContext() {
  const [user, setUser] = useContext(UserContext);

  function login(newAuthToken, handleResponse) {
    const body = {
      token: newAuthToken
    };

    createAxiosApi("Auth", user)
      .post("/login", body)
      .then((response) => {
        if (response && response.status === 200 && response.data.token) {
          userTokenHelper.setUserToken(response.data.token);
          setUser(userTokenHelper.getUserFromToken());
          handleResponse(true);
        } else {
          console.log("There was an unexpected issue logging in...");
          logout();
          handleResponse(false);
        }
      })
      .catch((error) => {
        console.log(error);
        logout();
        handleResponse(false);
      });
  }

  function logout() {
    userTokenHelper.removeUserToken();
    setUser(userTokenHelper.getUserFromToken());
  }

  return {
    login,
    logout,
    value: user
  };
}
