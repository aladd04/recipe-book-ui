import { RouterLink } from "../../../Shared/RouterLink";
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography
} from "@material-ui/core";

export function RecipeGridCard({ recipe }) {
  const dateString = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: "true"
  }).format(new Date(recipe.updateDate));

  return (
    <React.Fragment>
      <Card>
        <CardHeader
          title={recipe.name}
          subheader={`${recipe.ownerName} - ${dateString}`} />
        <CardContent>
          <Typography variant="body1">
            {recipe.description}
          </Typography>
        </CardContent>
        <CardActions>
          <RouterLink to={`/recipe/${recipe.id}`}>
            <Button size="small" color="primary">
              See More
            </Button>
          </RouterLink>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}
