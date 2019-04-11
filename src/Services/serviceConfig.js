import axios from "axios";
import jwt from "jsonwebtoken";

export const GoogleClientId =
  "869000202821-i2uqggkh71m3h0f230tq4rf31pl8aaj9.apps.googleusercontent.com";

const authTokenKey = "kmk-token";

export function createApiInstance(controller) {
  const apiUrl = "http://localhost:51301/api";
  // const apiUrl =
  //   "https://humjtzo6s3.execute-api.us-east-1.amazonaws.com/Prod/api";

  const apiInstance = axios.create({
    baseURL: `${apiUrl}/${controller}`
  });

  if (userIsAuthenticated()) {
    const token = localStorage.getItem(authTokenKey);
    apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return apiInstance;
}

export function saveAuthToken(token) {
  localStorage.setItem(authTokenKey, token);
}

export function removeAuthToken() {
  localStorage.removeItem(authTokenKey);
}

export function userIsAuthenticated() {
  const token = localStorage.getItem(authTokenKey);
  if (!token) {
    return false;
  }

  const decodedToken = jwt.decode(token);
  const now = new Date();

  if (decodedToken.exp <= (now.getTime() / 1000)) {
    removeAuthToken();
    return false;
  }

  return true;
}