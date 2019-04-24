import { isAuthenticated } from "../../../Helpers/authHelper";
import React from "react";
import { Button } from "@material-ui/core";

export function RecipeFormActions(props) {
  const disableActions = !isAuthenticated();

  return (
    <div style={{ marginTop: 10 }}>
      <Button
        variant="contained"
        color="primary"
        disabled={disableActions}
        onClick={props.onSaveClick}>
        Save
      </Button>
      <Button
        variant="contained"
        onClick={props.onCancelClick}
        style={{ marginLeft: 10 }}>
        Cancel
      </Button>
    </div>
  );
}
