import authHelper from "../Helpers/authHelper";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";

export function useUserContext() {
  const [user, setUser] = useContext(UserContext);

  function reset() {
    setUser(authHelper.getCurrentUser());
  }

  return {
    resetFromCache: reset,
    value: user
  };
}
