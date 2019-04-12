import { GoogleClientId } from "../../Services/serviceConfig";
import { createUserService } from "../../Services/userService";

import React, {
  useState
} from "react";
import { GoogleLogin } from "react-google-login";

export function Login(props) {
  const [userService] = useState(() => createUserService());

  function handleGoogleSuccessResponse(response) {
    userService.authenticateWithGoogle(response.tokenId, (isSuccess) => {
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