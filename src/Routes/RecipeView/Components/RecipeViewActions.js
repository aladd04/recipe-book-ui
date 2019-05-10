import { useUserContext } from "../../../Hooks/useUserContext";
import { RouterLink } from "../../../Shared/RouterLink";
import { PaperActions } from "../../../Shared/PaperActions";
import React from "react";
import {
  Button,
  Fab,
  Tooltip
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export function RecipeViewActions(props) {
  const userContext = useUserContext();
  const user = userContext.value;

  return (
    <PaperActions
      left={
        <React.Fragment>
          <Tooltip
            title="Edit"
            placement="bottom"
            disableHoverListener={!user.isLoggedIn}>
            <span style={{ marginRight: 10 }}>
              <Fab
                color="primary"
                size="small"
                onClick={props.editRecipe}
                disabled={!user.isLoggedIn}>
                <EditIcon />
              </Fab>
            </span>
          </Tooltip>
          <Tooltip
            title="Delete"
            placement="bottom"
            disableHoverListener={!user.isLoggedIn}>
            <span>
              <Fab
                color="secondary"
                size="small"
                onClick={props.deleteRecipe}
                disabled={!user.isLoggedIn}>
                <DeleteIcon />
              </Fab>
            </span>
          </Tooltip>
        </React.Fragment>
      }
      right={
        <RouterLink to="/">
          <Button size="small" color="primary">
            To All Recipes
          </Button>
        </RouterLink>
      } />
  );
}
