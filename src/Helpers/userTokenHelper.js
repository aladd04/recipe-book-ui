import { AuthTokenKey } from "../config";
import { DateTime } from "luxon";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

function createUserTokenHelper() {
  function setUserToken(token) {
    const decodedToken = jwt.decode(token);
    const expireDate = DateTime.fromMillis(decodedToken.exp * 1000);

    Cookies.set(AuthTokenKey, token, { expires: expireDate.toJSDate() });
  }

  function removeUserToken() {
    Cookies.remove(AuthTokenKey);
  }

  function getUserFromToken() {
    const token = Cookies.get(AuthTokenKey);
    const user = {
      isLoggedIn: !!token,
      info: null
    };

    if (user.isLoggedIn) {
      const decodedToken = jwt.decode(token);
      user.info = {
        id: decodedToken.Id,
        email: decodedToken.EmailAddress,
        firstName: decodedToken.FirstName,
        lastName: decodedToken.LastName,
        isAdmin: decodedToken.IsAdmin,
        authToken: token
      };
    }

    return user;
  }

  return {
    setUserToken,
    removeUserToken,
    getUserFromToken
  };
}

const userTokenHelper = createUserTokenHelper();
export default userTokenHelper;
