import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography
} from "@material-ui/core";

export function RecipeCardMini(props) {
  const dateString = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: "true"
  }).format(new Date(props.recipe.UpdateDate));

  return (
    <Card>
      <CardHeader
        title={props.recipe.Name}
        subheader={`${props.recipe.OwnerName} - ${dateString}`} />
      <CardContent>
        <Typography variant="body1">
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