import React, {
  useState,
  useEffect
} from "react";
import {
  Snackbar,
  SnackbarContent
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import green from "@material-ui/core/colors/green";

export function SuccessMessage(props) {
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    setToastOpen(!!props.message);
  }, [props.message]);

  function onToastClose() {
    props.clearMessage();
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={toastOpen}
      autoHideDuration={8000}
      onClose={onToastClose}
      style={{ marginTop: 20 }}>
      <SnackbarContent
        style={{ backgroundColor: green[600] }}
        message={
          <SnackbarContentMessage message={props.message} />
        }
        action={
          <SnackbarContentActions onToastClose={onToastClose} />
        } />
    </Snackbar>
  );
}

function SnackbarContentMessage(props) {
  return (
    <div className="rb-snackbar-message">
      <CheckCircleIcon />
      <span style={{ paddingLeft: 10 }}>{props.message}</span>
    </div>
  );
}

function SnackbarContentActions(props) {
  return (
    <IconButton onClick={props.onToastClose}>
      <CloseIcon />
    </IconButton>
  );
}
