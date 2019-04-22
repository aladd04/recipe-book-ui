import React from "react";
import { Link } from "react-router-dom";
import {
  Snackbar,
  SnackbarContent
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import green from "@material-ui/core/colors/green";

export function RecipeCreatedSnackbar(props) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={props.toastOpen}
      autoHideDuration={10000}
      onClose={props.onToastClose}
      style={{ marginTop: 20 }}>
      <SnackbarContent
        style={{ backgroundColor: green[600] }}
        message={
          <RecipeCreatedSnackbarContentMessage
            newRecipeId={props.newRecipeId} />
        }
        action={
          <RecipeCreatedSnackbarContentAction
            onToastClose={props.onToastClose} />
        } />
    </Snackbar>
  );
}

function RecipeCreatedSnackbarContentMessage(props) {
  return (
    <div className="rb-snackbar-message">
      <CheckCircleIcon />
      <span style={{ paddingLeft: 10 }}>Recipe created!</span>
      <Link
        to={`/recipe/${props.newRecipeId}`}
        style={{ padding: "0 4px" }}>
        Click here
      </Link>
      <span>to view it</span>
    </div>
  );
}

function RecipeCreatedSnackbarContentAction(props) {
  return (
    <IconButton onClick={props.onToastClose}>
      <CloseIcon />
    </IconButton>
  );
}
