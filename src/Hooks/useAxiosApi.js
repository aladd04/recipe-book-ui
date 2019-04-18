import { ApiUrl } from "../config";
import { useAuthToken } from "./useAuthToken";
import {
  useState,
  useEffect
} from "react";
import axios from "axios";

export function useAxiosApi(resource) {
  const token = useAuthToken();
  const [api] = useState(() => initializeApi());

  useEffect(() => {
    if (token) {
      api.defaults.withCredentials = true;
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      api.defaults.withCredentials = false;
      api.defaults.headers.common["Authorization"] = null;
    }
  }, [token]);

  function initializeApi() {
    return axios.create({
      baseURL: `${ApiUrl}/${resource}`
    });
  }

  return api;
}
