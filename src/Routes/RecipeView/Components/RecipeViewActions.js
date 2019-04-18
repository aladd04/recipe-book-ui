import { RouterLink } from "../../../Shared/RouterLink";
import React from "react";
import {
  Button,
  Fab,
  Tooltip
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export function RecipeViewActions(props) {
  return (
    <div className="rb-recipe-view-action-container">
      <div>
        <Tooltip title="Edit" placement="top">
          <RouterLink to={`/recipe/edit/${props.recipeId}`}>
            <Fab color="primary" size="small">
              <EditIcon />
            </Fab>
          </RouterLink>
        </Tooltip>
        <Tooltip title="Delete Recipe" placement="top">
          <Fab
            color="secondary"
            size="small"
            style={{ marginLeft: 10 }}
            onClick={props.deleteRecipe}>
            <DeleteIcon />
          </Fab>
        </Tooltip>
      </div>
      <RouterLink to="/">
        <Button size="small" color="primary">
          To All Recipes
        </Button>
      </RouterLink>
    </div>
  );
}
