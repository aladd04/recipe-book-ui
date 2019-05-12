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
    userContext.logout();
    setIsLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <LoadingWrapper isLoading={isLoading}>
      <Redirect to="/" />
    </LoadingWrapper>
  );
}
