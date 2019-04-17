import { getToken } from "./authFactory";
import {
  ApiUrl,
  AuthTokenKey
} from "../config";

import axios from "axios";

export function createApiInstance(resource) {
  const apiInstance = axios.create({
    baseURL: `${ApiUrl}/${resource}`
  });

  const token = getToken(AuthTokenKey);
  if (token) {
    apiInstance.defaults.withCredentials = true;
    apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return apiInstance;
}