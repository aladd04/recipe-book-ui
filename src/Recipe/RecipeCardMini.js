import { RouterLink } from "../Helpers/RouterLink";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography
} from "@material-ui/core";

export function RecipeCardMini({ recipe }) {
  const dateString = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: "true"
  }).format(new Date(recipe.UpdateDate));

  return (
    <Card>
      <CardHeader
        title={recipe.Name}
        subheader={`${recipe.OwnerName} - ${dateString}`} />
      <CardContent>
        <Typography variant="body1">
          {recipe.Description}
        </Typography>
      </CardContent>
      <CardActions>
        <RouterLink to={`/recipe/${recipe.Id}`}>
          <Button size="small" color="primary">
            See More
          </Button>
        </RouterLink>
      </CardActions>
    </Card>
  );
}