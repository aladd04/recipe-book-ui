import React from "react";
import { Typography, Divider } from "@material-ui/core";

export function PageHeader(props) {
  return (
    <React.Fragment>
      <Typography variant="h4" color="textSecondary" style={{ marginBottom: 16 }}>
        {props.text}
      </Typography>
      <Divider style={{ marginBottom: 16 }} />
    </React.Fragment>
  );
}