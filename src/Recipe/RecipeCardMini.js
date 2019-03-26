import React from "react";
import { Card, CardHeader, CardContent, CardActions, Button, Typography } from "@material-ui/core";

export function RecipeCardMini(props) {
  function getSubHeaderText() {
    const dateString = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: "true"
    }).format(new Date(props.recipe.UpdateDate));

    return `${props.recipe.OwnerName} - ${dateString}`;
  }

  return (
    <Card>
      <CardHeader
        title={props.recipe.Name}
        subheader={getSubHeaderText()} />
      <CardContent>
        <Typography>
          {props.recipe.Description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          See More
        </Button>
      </CardActions>
    </Card>
  );
}