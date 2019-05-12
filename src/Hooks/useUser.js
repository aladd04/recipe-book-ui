import { useUserContext } from "./useUserContext";
import {
  useState,
  useEffect
} from "react";

export function useUser() {
  const userContext = useUserContext();
  const [user, setUser] = useState(() => userContext.value);

  useEffect(() => {
    setUser(userContext.value);
  }, [userContext.value]);

  return user;
}
