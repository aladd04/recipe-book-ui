import { AuthTokenKey } from "../config";

import {
  useState,
  useEffect
} from "react";
import jwt from "jsonwebtoken";

export function useAuthToken() {
  const [authToken, setAuthToken] = useState(() => getFromStorage());

  useEffect(() => {
    const token = getFromStorage();
    if (token) {
      const decodedToken = jwt.decode(token);
      const now = new Date();

      if (decodedToken.exp <= (now.getTime() / 1000)) {
        localStorage.removeItem(AuthTokenKey);
        setAuthToken(null);
      } else {
        setAuthToken(token);
      }
    } else {
      setAuthToken(null);
    }
  });

  function getFromStorage() {
    return localStorage.getItem(AuthTokenKey);
  }

  return authToken;
}