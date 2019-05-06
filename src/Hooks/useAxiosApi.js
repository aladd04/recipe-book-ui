import { ApiUrl } from "../config";
import { getUserFromToken } from "../Helpers/authHelper";
import {
  useState,
  useEffect
} from "react";
import axios from "axios";

export function useAxiosApi(resource) {
  const [api] = useState(() => {
    return axios.create({
      baseURL: `${ApiUrl}/${resource}`
    });
  });

  useEffect(() => {
    const user = getUserFromToken();

    if (user.isLoggedIn) {
      const bearerAuthToken = `Bearer ${user.info.authToken}`;

      api.defaults.withCredentials = true;
      api.defaults.headers.common["Authorization"] = bearerAuthToken;
    } else {
      api.defaults.withCredentials = false;
      api.defaults.headers.common["Authorization"] = null;
    }
  });

  return api;
}
