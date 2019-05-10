import authService from "../../Services/authService";
import { useUserContext } from "../../Hooks/useUserContext";
import { LoadingWrapper } from "../../Shared/LoadingWrapper";
import React, {
  useState,
  useEffect
} from "react";
import { Redirect } from "react-router-dom";

export function Logout() {
  const [isLoading, setIsLoading] = useState(true);
  const userContext = useUserContext();

  useEffect(() => {
    setIsLoading(true);
    authService.logout();
    userContext.resetFromCache();
    setIsLoading(false);
  }, [userContext]);

  return (
    <LoadingWrapper isLoading={isLoading}>
      <Redirect to="/" />
    </LoadingWrapper>
  );
}
