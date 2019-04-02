import React from "react";

export function LoadingWrapper(props) {
  return (
    <React.Fragment>
      {props.isLoading ? (
        <div>Loading...</div>
      ) : (
        <React.Fragment>
          {props.children}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}