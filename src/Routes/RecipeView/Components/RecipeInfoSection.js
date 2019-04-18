import React from "react";
import {
  Typography,
  Divider
} from "@material-ui/core";

export function RecipeInfoSection(props) {
  return (
    <div className="rb-recipe-info">
      <Typography variant="h6" color="primary">
        {props.title}
      </Typography>
      <Typography variant="body1" className="rb-recipe-info-body">
        {props.body}
      </Typography>
      <Divider style={{ marginTop: 12, marginBottom: 12 }} />
    </div>
  );
}
