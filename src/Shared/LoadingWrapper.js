import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";

export function LoadingWrapper(props) {
  return (
    <React.Fragment>
      {props.isLoading ? (
        <div className="loading-wrapper">
          <CircularProgress />
          <Typography variant="h6" style={{ marginTop: 10 }}>
            Loading...
          </Typography>
        </div>
      ) : (
        <React.Fragment>
          {props.children}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
