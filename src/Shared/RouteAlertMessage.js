import { SuccessMessage } from "./SuccessMessage";
import React from "react";

export function RouteAlertMessage(props) {
  function clearAlertMessage() {
    let stateCopy = { ...props.location.state };
    delete stateCopy.alertMessage;
    props.history.replace({ state: stateCopy });
  }

  return (
    <SuccessMessage
      message={props.location.state.alertMessage}
      clearMessage={clearAlertMessage} />
  );
}
