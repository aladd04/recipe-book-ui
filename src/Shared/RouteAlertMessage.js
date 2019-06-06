import { SuccessMessage } from "./SuccessMessage";
import React from "react";

export function RouteAlertMessage(props) {
  function clearAlertMessage() {
    let stateCopy = { ...props.location.state };
    delete stateCopy.alertMessage;
    props.history.replace({ state: stateCopy });
  }

  return (
    <React.Fragment>
      {props.location && props.location.state ? (
        <SuccessMessage
          message={props.location.state.alertMessage}
          clearMessage={clearAlertMessage} />
      ) : (null)}
    </React.Fragment>
  );
}
