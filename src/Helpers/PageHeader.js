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
      <Divider style={{ marginTop: 16, marginBottom: 16 }} />
    </React.Fragment>
  );
}