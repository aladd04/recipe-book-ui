import { GoogleClientId } from "../../config";
import { useAuthService } from "../../Hooks/useAuthService";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";

export function Login(props) {
  const authService = useAuthService();

  function handleGoogleSuccessResponse(response) {
    authService.login(response.tokenId, (isSuccess) => {
      if (isSuccess) {
        props.history.push("/");
      }
    });
  }

  return (
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
          onSuccess={handleGoogleSuccessResponse}/>
      </CardActions>
    </Card>
  );
}