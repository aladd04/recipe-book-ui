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
import { DateTime } from "luxon";

export function RecipeGridCard({ recipe }) {
  const dateString = DateTime.fromISO(recipe.updateDate).toFormat("fff");

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
