import { useUserContext } from "../Hooks/useUserContext";
import React from "react";
import {
  Typography,
  Divider,
  Button
} from "@material-ui/core";

export function PageHeader(props) {
  const user = useUserContext();

  return (
    <div className="rb-page-header-container">
      <div className="rb-page-header-primary">
        <Typography variant="h4" color="textSecondary">
          {props.text}
        </Typography>
        {!!props.actionClick ? (
          <Button
            color="primary"
            onClick={props.actionClick}
            disabled={!user.isLoggedIn}>
            {props.actionText}
          </Button>
        ) : (null)}
      </div>
      {!!props.subText ? (
        <Typography variant="subtitle2" color="textSecondary">
          {props.subText}
        </Typography>
      ) : (null)}
      <Divider className="rb-divider" />
    </div>
  );
}
