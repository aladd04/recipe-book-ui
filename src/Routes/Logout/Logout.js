import { useAuthService } from "../../Hooks/useAuthService";
import { LoadingWrapper } from "../../Shared/LoadingWrapper";
import React, {
  useState,
  useEffect
} from "react";
import { Redirect } from "react-router-dom";

export function Logout() {
  const authService = useAuthService();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    authService.logout();
    setIsLoading(false);
  }, []);

  return (
    <LoadingWrapper isLoading={isLoading}>
      <Redirect to="/" />
    </LoadingWrapper>
  );
}
