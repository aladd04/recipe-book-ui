import React from "react";
import {
  Typography,
  Divider
} from "@material-ui/core";

export function PageHeader(props) {
  return (
    <React.Fragment>
      <Typography variant="h4" color="textSecondary">
        {props.text}
      </Typography>
      {props.subText ? (
        <Typography variant="subtitle2" color="textSecondary">
          {props.subText}
        </Typography>
      ) : (
        null
      )}
      <Divider style={{ marginTop: 16, marginBottom: 16 }} />
    </React.Fragment>
  );
}