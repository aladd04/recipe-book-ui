import { AuthTokenKey } from "../config";

import jwt from "jsonwebtoken";

export function saveToken(token) {
  localStorage.setItem(AuthTokenKey, token);
}

export function removeToken() {
  localStorage.removeItem(AuthTokenKey);
}

export function getToken() {
  const token = localStorage.getItem(AuthTokenKey);
  if (!token) {
    return null;
  }

  const decodedToken = jwt.decode(token);
  const now = new Date();

  if (decodedToken.exp <= (now.getTime() / 1000)) {
    removeToken();
    return null;
  }

  return token;
}

export function userIsValid() {
  const token = getToken(AuthTokenKey);
  if (token) {
    return true;
  }

  return false;
}