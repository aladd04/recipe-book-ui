import { getUserFromToken } from "../../../Helpers/authHelper";
import { PaperActions } from "../../../Shared/PaperActions";
import React from "react";
import { Button } from "@material-ui/core";

export function RecipeFormActions(props) {
  const user = getUserFromToken();

  return (
    <PaperActions
      style={{ marginTop: 10 }}
      left={
        <React.Fragment>
          <Button
            variant="contained"
            color="primary"
            disabled={!user.isLoggedIn}
            onClick={props.onSaveClick}>
            Save
          </Button>
          <Button
            variant="contained"
            onClick={props.onCancelClick}
            style={{ marginLeft: 10 }}>
            Cancel
          </Button>
        </React.Fragment>
      }
      right={null} />
  );
}
