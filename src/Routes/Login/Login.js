import { GoogleClientId } from "../../config";
import { useUserContext } from "../../Hooks/useUserContext";
import { LoadingWrapper } from "../../Shared/LoadingWrapper";
import React, {
  useState
} from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";

export function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserContext();
  
  function handleGoogleSuccessResponse(response) {
    setIsLoading(true);
    user.login(response.tokenId, (isSuccess) => {
      setIsLoading(false);
      if (isSuccess) {
        props.history.push("/", { 
          alertMessage: "Logged in!"
        });
      }
    });
  }

  return (
    <React.Fragment>
      <LoadingWrapper isLoading={isLoading}>
        <Card>
          <CardHeader title="Login to create and edit recipes!" />
          <CardContent>
            <Typography variant="body1">
              Click the button below to login using your Google account.
            </Typography>
          </CardContent>
          <CardActions>
            <GoogleLogin
              clientId={GoogleClientId}
              buttonText="Google Login"
              onSuccess={handleGoogleSuccessResponse} />
          </CardActions>
        </Card>
      </LoadingWrapper>
    </React.Fragment>
  );
}
