import React from "react";
import { Typography } from "@material-ui/core";

export function RecipeValidationSummary(props) {
  const errorsToShow = Object.keys(props.errors)
    .map(k => props.errors[k])
    .filter(e => !e.isValid);

  return (
    <div
      className="rb-validation-summary"
      style={errorsToShow.length > 0 ? {} : { display: "none" }}>
      <ul>
        {errorsToShow.map(e => {
          return (
            <li key={e.message}>
              <Typography variant="body1">
                {e.message}
              </Typography>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
