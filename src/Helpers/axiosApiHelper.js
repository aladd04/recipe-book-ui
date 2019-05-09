import { ApiUrl } from "../config";
import authHelper from "../Helpers/authHelper";
import axios from "axios";

export function createAxiosApi(resource) {
  const user = authHelper.getCurrentUser();
  const api = axios.create({
    baseURL: `${ApiUrl}/${resource}`
  });

  if (user.isLoggedIn) {
    const bearerAuthToken = `Bearer ${user.info.authToken}`;
    api.defaults.withCredentials = true;
    api.defaults.headers.common["Authorization"] = bearerAuthToken;
  } else {
    api.defaults.withCredentials = false;
    api.defaults.headers.common["Authorization"] = null;
  }

  return api;
}
