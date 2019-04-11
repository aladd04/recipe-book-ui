import { GoogleClientId } from "../../Services/serviceConfig";
import { authenticateWithGoogle } from "../../Services/userService";

import React from "react";
import { GoogleLogin } from "react-google-login";

export function Login(props) {
  function handleGoogleSuccessResponse(response) {
    authenticateWithGoogle(response.tokenId, (isSuccess) => {
      if (isSuccess) {
        props.history.push("/");
      }
    });
  }

  function handleGoogleFailureResponse(response) {
    console.log(response);
  }

  return (
    <React.Fragment>
      <GoogleLogin
        clientId={GoogleClientId}
        buttonText="Google Login"
        onSuccess={handleGoogleSuccessResponse}
        onFailure={handleGoogleFailureResponse} />
    </React.Fragment>
  );
}