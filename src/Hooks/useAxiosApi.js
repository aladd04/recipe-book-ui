import { ApiUrl } from "../config";
import {
  isAuthenticated,
  getToken
} from "../Helpers/authHelper";
import {
  useState,
  useEffect
} from "react";
import axios from "axios";

export function useAxiosApi(resource) {
  const [api] = useState(() => initializeApi());

  useEffect(() => {
    if (isAuthenticated()) {
      api.defaults.withCredentials = true;
      api.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    } else {
      api.defaults.withCredentials = false;
      api.defaults.headers.common["Authorization"] = null;
    }
  });

  function initializeApi() {
    return axios.create({
      baseURL: `${ApiUrl}/${resource}`
    });
  }

  return api;
}
