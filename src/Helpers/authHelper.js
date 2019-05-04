import { AuthTokenKey } from "../config";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { DateTime } from "luxon";

export function getToken() {
  return Cookies.get(AuthTokenKey);
}

export function setToken(token) {
  const decodedToken = jwt.decode(token);
  const expireDate = DateTime.fromMillis(decodedToken.exp * 1000);

  Cookies.set(AuthTokenKey, token, { expires: expireDate.toJSDate() });
}

export function removeToken() {
  Cookies.remove(AuthTokenKey);
}

export function isAuthenticated() {
  return !!getToken();
}

export function getUser() {
  if (!isAuthenticated()) {
    return null;
  }

  const token = getToken();
  const decodedToken = jwt.decode(token);

  return {
    encryptedUserId: decodedToken.Id,
    email: decodedToken.EmailAddress,
    firstName: decodedToken.FirstName,
    lastName: decodedToken.LastName,
    isAdmin: decodedToken.IsAdmin
  };
}
