import { removeToken } from "../../Factories/authFactory";
import { LoadingWrapper } from "../../Shared/LoadingWrapper";

import React, {
  useState,
  useEffect
} from "react";
import { Redirect } from "react-router-dom";

export function Logout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    removeToken();
    setIsLoading(false);
  }, []);

  return (
    <LoadingWrapper isLoading={isLoading}>
      <Redirect to="/" />
    </LoadingWrapper>
  );
}