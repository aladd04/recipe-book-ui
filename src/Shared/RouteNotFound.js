import { RouterLink } from "./RouterLink";

import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button
} from "@material-ui/core";
import indigo from "@material-ui/core/colors/indigo";

export function RouteNotFound() {
  return (
    <div
      className="page-not-found-container"
      style={{ backgroundColor: indigo[900] }}>
      <Card>
        <CardHeader title="Page Not Found" />
        <CardContent>
          <Typography variant="body1">
            The link you have entered or clicked doesn't exist.
          </Typography>
        </CardContent>
        <CardActions>
          <RouterLink to="/">
            <Button size="small" color="primary">
              Back to the site
            </Button>
          </RouterLink>
        </CardActions>
      </Card>
    </div>
  );
}